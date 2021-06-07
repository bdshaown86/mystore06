import baseUrl from '../helpers/baseUrl';
import {parseCookies} from 'nookies';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';


const cart = ({error,products}) => {
    const router = useRouter();
    const {token} = parseCookies();
    const [cProducts,setCartProducts] = useState(products);
    let price = 0;

    if(!token){
        return(
            <div className="center-align">
                <h3>Pleaser login to view your cart</h3>
                <Link href='/login'><a><button className="btn waves-light blue darken-3">Login</button></a></Link>
            </div>
        )
    }

    if(error){
        M.toast({html:error,classes:"red"})
        cookie.remove("user")
        cookie.remove("token")
        router.push('/login')

    }
    const handleRemove = async(pid) => {
        const res = await fetch(`${baseUrl}/api/cart`,{
            method:"DELETE",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": token
            },
            body:JSON.stringify({
                productId:pid
            })
        })
        const res2 = await res.json();
        setCartProducts(res2)
    }



    const CartItems = () => {
       
        return (
        <>
          {
              cProducts.map(item => {
                price = price + item.quantity * item.product.price;

                  return(<div style={{display:'flex',margin:'20px'}} key={item._id}>
                      <img src={item.product.mediaUrl} style={{width:'30%'}}/>
                      <div style={{marginLeft: "20px"}}>
                          <h6>{item.product.name}</h6>
                          <h6>{item.quantity} x {item.product.price}</h6>
                          <button className="btn red" onClick={()=> handleRemove(item.product._id)}>Remove</button>
                      </div>
                  </div>)
              })
          }
        </>
        )
    }

    const handleCheckout =async (paymentInfo) => {
        console.log(paymentInfo)
        const res = await fetch(`${baseUrl}/api/payment`,{
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                paymentInfo
            })
        })
        const res2 = await res.json()
        M.toast({html: res2.message,classes:"green"})
        router.push('/')
    }

    const TotalPrice = () =>{
        return(
            <div className='container' style={{display:'flex',justifyContent:'space-between'}}>
                <h5>Total ৳: {price}</h5>
                {
                  products.length != 0 &&   
                  <StripeCheckout
                  name="Store tut"
                  amount={price * 100} 
                  image={products.length > 0 ? products[0].product.mediaUrl : " " }
                  currency="USD"
                  shippingAddress={true}
                  billingAddress={true}
                  zipCode={true}
                  stripeKey="pk_test_51I201SGF4BIOaDpPWlB7oFryZpuWYdAygWf0T7sTYu8Xd2wcgQJHmVSgFPCKmENOWTxZL3iaC470Wj9PBA0GRJMa00ZcmcJTjK"
                  token={(paymentInfo) => handleCheckout(paymentInfo)}
                 >
                     <button className="btn">Checkout</button>
                 </StripeCheckout>
                }
           
               
            </div>
        )
    }

    return (
        <div className="container">
         <CartItems />
         <TotalPrice />
        </div>
    )
}

export async function getServerSideProps(ctx){
    const {token} = parseCookies(ctx)
    if(!token){
        return {
            props: {products: []}
        }
    }

    const res = await fetch(`${baseUrl}/api/cart`,{
        headers:{
            "Authorization": token
        }
    })

    const products = await res.json();
    console.log("From cart page:",products)
    if(products.error){
        return{
            props: {error: products.error}
        }
    }

 

    return{
        props: {products}
    }
}

export default cart
