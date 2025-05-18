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
        const email = req.headers.email;


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
            console.log('price: ', price, 'qty: ', qty)
            console.log('TotalAmount: ', TotalAmount)
        })

        let VatAmount = TotalAmount * Vat;

        let PayableAmount = TotalAmount + VatAmount;


        // ======== step 02: Prepare Customer Details & Shipping Details ==================

        const Profile = await ProfileModel.aggregate([MatchStage])
        const cus_details = `Name: ${Profile[0].cus_name}, Phone: ${Profile[0].cus_phone}, Address: ${Profile[0].cus_add}, City: ${Profile[0].cus_city}, Country: ${Profile[0].cus_country}, Fax: ${Profile[0].cus_fax}`
        const ship_details = `Adress: ${Profile[0].ship_add}, City: ${Profile[0].ship_city}, Country: ${Profile[0].ship_country}, Fax: ${Profile[0].ship_fax}, Name: ${Profile[0].ship_name}, Phone: ${Profile[0].ship_phone}, PostCode: ${Profile[0].ship_postCode}, State: ${Profile[0].ship_state}`

        // ======== step 03: Transaction & Other's ID ==================

        const trans_id = Math.floor(10000000 + Math.random() * 90000000)
        const val_id = 0;
        const payment_status = 'pending';
        const delivery_status = 'pending';

        // ======== step 04: Create Invoice ==================

        let createInvoice = await InvoiceModel.create({
            userId: user_id,
            payable: PayableAmount,
            cus_details: cus_details,
            ship_details: ship_details,
            tran_id: trans_id,
            val_id: val_id,
            payment_status: payment_status,
            delivery_status: delivery_status,
            total: TotalAmount,
            vat: VatAmount,
        })


        // ======== step 05: Create Invoice Product ==================
        let invoice_id = createInvoice._id;
        CartProducts.forEach(async (element) => {
            console.log('element: ', element)

            await InvoiceProductModel.create({
                userID: user_id,
                invoiceID: invoice_id,
                productID: element.productID,
                qty: element.qty,
                price: element.product.discount ? element.product.discountPrice : element.product.price,
                color: element.color,
                size: element.size,
            })
        })


        // ======== step 06: Remove Carts ==================

        await CartModel.deleteMany({ userID: user_id })


        // ======== step 07: Prepare SSL Payment ==================

        return {
            status: "success",
            data: invoice_id
        }

    } catch (error) {
        return {
            status: "error",
            message: "Invoice Created Failed"
        }

    }



}


const PaymentFailService = async (req) => { }


const PaymentCancelService = async (req) => { }


const PaymentIPNService = async (req) => { }


const PaymentSuccessService = async (req) => { }


const InvoiceListService = async (req) => { }


const InvoiceProductListService = async (req) => { }

module.exports = {
    CreateInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
}