import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
    user:{
        type: ObjectId,
        ref: "User"
    },
    products: [
        {
          quantity: {type: Number,default: 1},
          product: {type: ObjectId,ref:'product'}
        }
    ]
})

export default mongoose.models.Cart || mongoose.model("Cart",cartSchema);



// {
//     user:"25486652",
//     products:[
//               {_id:"15235896",quantity:1,product:"3654"},
//               {_id:"156255",quantity:5,product:"36412"},         
//               ]
// },
// {
//     user:"whodsdkfji",
//     products:[
//               {_id:"kdsf",quantity:3,product:"2564"},
//               {_id:"dfg",quantity:5,product:"3698"},         
//               ]
// }