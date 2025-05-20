const { default: mongoose } = require("mongoose");
const CartModel = require("../models/CartModel");
const ProfileModel = require("../models/ProfileModel");
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingModel = require("../models/PaymentSettingModel");
const ObjectId = mongoose.Types.ObjectId;
const axios = require('axios');
var FormData = require('form-data');


const CreateInvoiceService = async (req) => {

    try {

        const user_id = new ObjectId(req.headers.user_id);
        const user_email = req.headers.email;


        // ======== step 01: Calculate Total Payable & Vat ==================

        const MatchStage = { $match: { userID: user_id } }
        const JoinWithProductStage = {
            $lookup: {
                from: 'products',
                localField: 'productID',
                foreignField: '_id',
                as: 'product'
            }
        }
        const UnwindProductStage = {
            $unwind: {
                path: '$product'
            }
        }

        const CartProducts = await CartModel.aggregate([
            MatchStage,
            JoinWithProductStage,
            UnwindProductStage,
        ])


        let Vat = 0.05; // 5% vat
        let TotalAmount = 0;
        CartProducts.forEach((item) => {
            let qty = parseFloat(item.qty)
            let price;
            if (item.product.discount) {
                price = parseFloat(item.product.discountPrice)
            } else {
                price = parseFloat(item.product.price)
            }

            TotalAmount = TotalAmount + (price * qty)

            // console.log('price: ', price, 'qty: ', qty)
            // console.log('TotalAmount: ', TotalAmount)
        })

        let VatAmount = TotalAmount * Vat;

        let PayableAmount = TotalAmount + VatAmount;


        // ======== step 02: Prepare Customer Details & Shipping Details ==================

        const Profile = await ProfileModel.aggregate([MatchStage])
        const cus_details = `Name: ${Profile[0].cus_name}, Phone: ${Profile[0].cus_phone}, Address: ${Profile[0].cus_add}, City: ${Profile[0].cus_city}, Country: ${Profile[0].cus_country}, Fax: ${Profile[0].cus_fax}`
        const ship_details = `Adress: ${Profile[0].ship_add}, City: ${Profile[0].ship_city}, Country: ${Profile[0].ship_country}, Fax: ${Profile[0].ship_fax}, Name: ${Profile[0].ship_name}, Phone: ${Profile[0].ship_phone}, PostCode: ${Profile[0].ship_postCode}, State: ${Profile[0].ship_state}`

        // ======== step 03: Transaction & Other's ID ==================

        const tran_id = Math.floor(10000000 + Math.random() * 90000000)
        const val_id = 0;
        const payment_status = 'pending';
        const delivery_status = 'pending';

        // ======== step 04: Create Invoice ==================

        let createInvoice = await InvoiceModel.create({
            userID: user_id,
            payable: PayableAmount,
            cus_details: cus_details,
            ship_details: ship_details,
            tran_id: tran_id,
            val_id: val_id,
            payment_status: payment_status,
            delivery_status: delivery_status,
            total: TotalAmount,
            vat: VatAmount,
        })


        // ======== step 05: Create Invoice Product ==================
        let invoice_id = createInvoice._id;
        // let invoice_product = [];

        const invoice_product = CartProducts.map((element) => {
            return {
                userID: user_id,
                invoiceID: invoice_id,
                productID: element.productID,
                qty: element.qty,
                price: element.product.discount ? element.product.discountPrice : element.product.price,
                color: element.color,
                size: element.size,
            }
        })

        await InvoiceProductModel.insertMany(invoice_product)


        // CartProducts.forEach(async (element) => {
        //     console.log('element: ', {
        //         userID: user_id,
        //         invoiceID: invoice_id,
        //         productID: element.productID,
        //         qty: element.qty,
        //         price: element.product.discount ? element.product.discountPrice : element.product.price,
        //         color: element.color,
        //         size: element.size,
        //     })

        //     const Query = {
        //         userID: user_id,
        //         invoiceID: invoice_id,
        //         productID: element.productID,
        //         qty: element.qty,
        //         price: element.product.discount ? element.product.discountPrice : element.product.price,
        //         color: element.color,
        //         size: element.size,
        //     }

        //     invoice_product.push(Query)

        //     await InvoiceProductModel.create(Query)
        // })


        // ======== step 06: Remove Carts ==================

        await CartModel.deleteMany({ userID: user_id })


        // ======== step 07: Prepare SSL Payment ==================

        const PaymentSettings = await PaymentSettingModel.find({})

        const formData = new FormData();

        // Payment settings (from PaymentSettings[0])
        formData.append('store_id', PaymentSettings[0].store_id);
        formData.append('store_passwd', PaymentSettings[0].store_passwd); // was `store_password` in your code, corrected
        formData.append('total_amount', PayableAmount); // You must provide actual amount here manually or from some variable
        formData.append('currency', PaymentSettings[0].currency);
        formData.append('tran_id', tran_id); // Ideally generate a unique transaction ID
        formData.append('success_url', `${PaymentSettings[0].success_url}/${tran_id}`);
        formData.append('fail_url', `${PaymentSettings[0].fail_url}/${tran_id}`);
        formData.append('cancel_url', `${PaymentSettings[0].cancel_url}/${tran_id}`);
        formData.append('ipn_url', `${PaymentSettings[0].ipn_url}/${tran_id}`); // Optional but recommended

        // Customer info (from Profile[0])
        formData.append('cus_name', Profile[0].cus_name);
        formData.append('cus_email', user_email); // No email field in Profile, hardcode or get from auth
        formData.append('cus_add1', Profile[0].cus_add);
        formData.append('cus_add2', Profile[0].cus_add);
        formData.append('cus_city', Profile[0].cus_city);
        formData.append('cus_state', Profile[0].cus_state);
        formData.append('cus_postcode', '1000'); // No postcode in data; hardcode or get from user
        formData.append('cus_country', Profile[0].cus_country);
        formData.append('cus_phone', Profile[0].cus_phone);
        formData.append('cus_fax', Profile[0].cus_fax);

        // // Shipping info
        formData.append('ship_name', Profile[0].ship_name);
        formData.append('ship_add1', Profile[0].ship_add);
        formData.append('ship_add2', Profile[0].ship_add);
        formData.append('ship_city', Profile[0].ship_city);
        formData.append('ship_state', Profile[0].ship_state);
        formData.append('ship_postcode', '1000'); // Again, no postcode in data
        formData.append('ship_country', Profile[0].ship_country);

        // // Product info
        formData.append('product_name', 'According to Invoice');
        formData.append('product_category', 'Ecommerce');
        formData.append('product_profile', 'general');
        formData.append('product_amount', '100'); // Optional, for your use


        const ssl_res = await axios.post(PaymentSettings[0].init_url, formData)

        return {
            status: "success",
            data: ssl_res.data
        }

    } catch (error) {
        return {
            status: "error",
            message: "Invoice Creation Failed"
        }

    }



}





const PaymentSuccessService = async (req) => {
    try {
        const trxID = req.params.trxID;
        const Query = {
            tran_id: trxID
        }
        const data = await InvoiceModel.updateOne(Query, { payment_status: "success" }, { new: true })
        return {
            status: "success",
            data: data
        }
    } catch (error) {
        return {
            status: "error",
            message: "Payment Failed"
        }
    }
}


const PaymentFailService = async (req) => {
    try {
        const trxID = req.params.trxID;
        const Query = {
            tran_id: trxID
        }
        const data = await InvoiceModel.updateOne(Query, { payment_status: "fail" }, { new: true })
        return {
            status: "success",
            data: data
        }
    } catch (error) {
        return {
            status: "error",
            message: "Payment Failed"
        }
    }
}


const PaymentCancelService = async (req) => {
    try {
        const trxID = req.params.trxID;
        const Query = {
            tran_id: trxID
        }
        const data = await InvoiceModel.updateOne(Query, { payment_status: "cancel" }, { new: true })
        return {
            status: "success",
            data: data
        }
    } catch (error) {
        return {
            status: "error",
            message: "Payment Failed"
        }
    }
}


const PaymentIPNService = async (req) => {
    try {
        const trxID = req.params.trxID;
        const status = req.body.status
        const Query = {
            tran_id: trxID
        }
        const data = await InvoiceModel.updateOne(Query, { payment_status: status }, { new: true })
        return {
            status: "success",
            data: data
        }
    } catch (error) {
        return {
            status: "error",
            message: "Payment Failed"
        }
    }
}


const InvoiceListService = async (req) => {
    try {
        const user_id = req.headers.user_id
        const InvoiceList = await InvoiceModel.find({ userID: user_id })
        return {
            status: "success",
            data: InvoiceList
        }
    } catch (error) {
        return {
            status: "error",
            message: "Invoice Find Failed"
        }
    }
}


const InvoiceProductListService = async (req) => {
    try {
        const user_id = new ObjectId(req.headers.user_id)
        const invoice_id = new ObjectId(req.params.invoice_id)

        const MatchStage = { $match: { userID: user_id, invoiceID: invoice_id } }
        const JoinWithProductStage = {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "product"
            }
        }
        const UnwindProductStage = {
            $unwind: {
                path: "$product"
            }
        }

        const data = await InvoiceProductModel.aggregate([
            MatchStage,
            JoinWithProductStage,
            UnwindProductStage
        ])


        return {
            status: "success",
            data: data
        }
    } catch (error) {
        return {
            status: "error",
            message: "Invoice Find Failed"
        }

    }
}

module.exports = {
    CreateInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
}