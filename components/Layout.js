import Navbar from "./Navbar";
import Head from 'next/head';


const Layout = ({children}) => {
    return (
        <>
          <Head>
            <title>mystore</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></link>            
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            
          </Head>
         <Navbar />
           {children}
           <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </>
      
    )
}

export default Layout
