import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes';
import StateProvider from '../components/context/Context';


function MyApp({ Component, pageProps:{session, ...pageProps}, }) {
  
return <SessionProvider session={session}>
    <StateProvider>
    <ThemeProvider attribute='class'>
   <Component {...pageProps} />
   </ThemeProvider>
    </StateProvider>
  </SessionProvider>
}

export default MyApp
