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


    // ======== step 01: Calculate Total Payable & Vat ==================


    // ======== step 02: Prepare Customer Details 7 Shipping Details ==================


    // ======== step 03: Transaction & Other's ID ==================


    // ======== step 04: Create Invoice ==================


    // ======== step 05: Create Invoice Product ==================


    // ======== step 06: Remove Carts ==================


    // ======== step 07: Prepare SSL Payment ==================


}


const PaymentFailService = async (req) => {}


const PaymentCancelService = async (req) => {}


const PaymentIPNService = async (req) => {}


const PaymentSuccessService = async (req) => {}


const InvoiceListService = async (req) => {}


const InvoiceProductListService = async (req) => {}

module.exports = {
    CreateInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
}