const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const crypyo = require('crypto')

//create schema
const userSchema = new mongoose.Schema(
    {
        fullName: {
            required: [true, "First name is required"],
            type: String
        },
        profilePhoto: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png'
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone Number is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        role: {
            type: String,
            enum: ['Admin', 'Buyer'],
            default:'Buyer'
        },
        address: {
            type: [
                {
                    addressId: mongoose.Schema.Types.ObjectId,
                    province: String,
                    district: String,
                    ward: String,
                    detail: String,
                    default: Boolean
                }
            ]
        },
        orders: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Order'
                }
            ]
        },
        vouchers: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Voucher'
                }
            ]
        },
        cart: {
            type: [
                {
                    cartItemId: mongoose.Schema.Types.ObjectId,
                    productId: mongoose.Schema.Types.ObjectId,
                    productName: String,
                    productPrice: Number,
                    size: String,
                    color: String,
                    quantity: Number
                }
            ]
        },
        reviews: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Review'
                }
            ]
        },
        feedback: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Feeback'
                }
            ]
        },
        notifications: {
            type: [
                {
                    notificationId: mongoose.Schema.Types.ObjectId,
                    orderId: mongoose.Schema.Types.ObjectId,
                    img: String,
                    content: String,
                    title: String
                }
            ]
        },

        // isAccountVerified: {
        //     type: Boolean,
        //     default: false
        // },
        // accountVerificationToken: String,
        // accountVerificationTokenExpired: Date,
    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true

    }
);
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});
userSchema.methods.checkPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model('User', userSchema);

module.exports = User;