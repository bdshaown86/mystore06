import {parseCookies} from 'nookies';
import baseUrl from '../helpers/baseUrl';
import {useEffect,useRef} from 'react';
import UserRoles from '../components/UserRoles';

const Account = ({orders}) => {
  const orderCard = useRef(null)
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : ""

  // if(orders.length == 0){
  //   return(
     
  //   )
  // }

  useEffect(() => {
    M.Collapsible.init(orderCard.current)
  },[])

const OrdrHistory = () => {
  return(
    <ul className="collapsible" ref={orderCard}>
    {
        orders.map (item => {
          return(
            <li key={item._id }>
            <div className="collapsible-header"><i className="material-icons">folder</i>{item.createdAt}</div>
            <div className="collapsible-body">
            <h5>Total  ₹ {item.total}</h5>
                            {
                                item.products.map(pitem=>{
                                  return <h6 key={pitem._id}>{pitem.product.name} X {pitem.quantity}</h6>  
                                })
                            }
            </div>
          </li>
          )
        })
    }  
   
  </ul>
  )

}
    return (
        <div className="container" >
          <div className="center-align white-text" style={{backgroundColor:"#1565c0",padding:"3px"}}>
            <h4>{user.name}</h4>
            <h4>{user.email}</h4>
          </div>
          <h3>Order history</h3>
          {
            orders.length == 0 ? 
            <div className="container center-align">
            <h2>You have no order history</h2>
          </div>
          :
          <OrdrHistory />
          }
         
          {user.role == "root"
           && <UserRoles />
          }
        </div>
    )
}


export async function getServerSideProps(ctx) {
   const {token} = parseCookies(ctx);
   if (!token) {
    return {
      redirect: {
        destination: '/login',
        statusCode : 302,
      },
    }
  }

 const res = await fetch(`${baseUrl}/api/Orders`,{
    headers:{
      "Authorization": token
    }
  })
  const res2 = await res.json()
  console.log("Accounts: ",res2)


    return {
      props: {orders: res2}, // will be passed to the page component as props
    }
  }

export default Account
