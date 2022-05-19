import React from 'react';
import Head from 'next/head'


const Header = ({title}) => {
    return ( 

    <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/174/174857.png" />
    </Head> 
     );
}
 
export default Header;