import Link from 'next/link';
import { useState } from 'react';
import baseUrl from '../helpers/baseUrl';
import {parseCookies} from 'nookies';


const Create = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [media,setMedia] = useState("");
    const [description,setDescription] = useState("");

const handlaSubmit =async (e) => {
    e.preventDefault();
    try {
        const mediaUrl = await imageUpload();

        const res = await fetch(`${baseUrl}/api/products`,{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name,
                price,
                mediaUrl,
                description
            })
        })
        const res2 =await res.json();
        if(res2.error){
            M.toast({html: res2.error, classes: 'red'})
        }else{
            M.toast({html: "Product Saved", classes: 'green'})
        }
    } catch (err) {
        console.log(err);
    }
  
}

const imageUpload = async () => {
    const data = new FormData()
    data.append('file',media)
    data.append('upload_preset','mystore_cnquit')
    data.append('cloud_name','bdshaown')
 const res = await fetch("	https://api.cloudinary.com/v1_1/bdshaown/image/upload",{
      method: "POST",
      body: data
  })
  const res2 = await res.json();
  return res2.url
}
    return (
      <form onSubmit={(e)=>handlaSubmit(e)}>
          <input type="text" name="name" placeholder="Name..."
           value={name} onChange={(e)=> setName(e.target.value)}
          />
          <input type="text" name="price" placeholder="Price..."
           value={price} onChange={(e)=> setPrice(e.target.value)}
          />
          <div className="file-field input-field">
            <div className="btn">
               <span>File</span>
               <input type="file"
                accept="image/*"
                onChange={(e) => setMedia(e.target.files[0])}
               />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
            </div>
           </div>
           
           <img className="responsive-img" 
            src={media ? URL.createObjectURL(media) : ""}
           />
           
           <textarea className="materialize-textarea"
             name="description"
             placeholder="Description..."
             value={description}
             onChange={(e)=>setDescription(e.target.value)}
           ></textarea>
            <button className="btn waves-effect waves-light" type="submit" >Submit
             <i className="material-icons right">send</i>
            </button>
      
      </form>
    )
}


export async function getServerSideProps(ctx) {
    const cookie = parseCookies(ctx);
    const user = cookie.user ? JSON.parse(cookie.user) : ''
   
    if (user.role != 'admin') {
     return {
       redirect: {
         destination: '/',
         statusCode : 302,
       },
     }
   }
     return {
       props: {}, // will be passed to the page component as props
     }
   }
 

export default Create