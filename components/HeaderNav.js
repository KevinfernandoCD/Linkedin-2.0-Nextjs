import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HeaderLinks from "./HeaderLinks";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material"
import { useState,useEffect } from 'react';
import { useTheme } from "next-themes";
import {motion} from 'framer-motion';
import {signIn, signOut, useSession} from 'next-auth/react';


const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const HeaderNav = () => {

    const [selectedLink,setSelectedLink] = useState("Home");
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme, theme } = useTheme();
    const [userImage,setUserImage] = useState();
    const [name,setName] = useState();

    const {data:session} = useSession();

    useEffect(() => {

        setMounted(true);

        if(session){

        setName(session?.user.name);

        setUserImage(session?.user.image);

        }

    },[session])


    return ( 

    <header className="sticky top-0 z-40 bg-white  dark:bg-gray-800 flex items-center justify-around py-1.5 px-3 shadow-lg">
        <div className='flex items-center space-x-2 w-full max-w-xs'>
           
           {mounted && (

               <>
               {resolvedTheme === "dark"?(
                            
                <img className='w-11' src="https://www.iconsdb.com/icons/preview/white/linkedin-3-xxl.png" alt='white-img'/>

               ):(
                
                <img className='w-11' src='https://www.iconsdb.com/icons/preview/caribbean-blue/linkedin-3-xxl.png' alt='blue-img'/>

               )}
               </>
           )}
           
    
            <div className='flex items-center space-x-1  py-2.5 px-4  rounded w-full dark:bg-gray-500'>
                <SearchRoundedIcon/>
                <input type="text" placeholder="Search" className=" px-1 rounded hidden md:inline-flex bg-transparent text-base focus:outline-none placeholder-black/70 
                dark:placeholder-white/70 flex-grow-1"/>
            </div>
        </div>

    <div className="flex items-center space-x-6">
        <HeaderLinks setLink={setSelectedLink?setSelectedLink:null} Icon={HomeRoundedIcon} text="Home" feed active={selectedLink === "Home"?true:false} />
        <HeaderLinks setLink={setSelectedLink?setSelectedLink:null}  Icon={GroupIcon} text="My Network" feed active={selectedLink === "My Network"?true:false} />
        <HeaderLinks setLink={setSelectedLink?setSelectedLink:null}  Icon={BusinessCenterIcon} text="Jobs" feed hidden active={selectedLink === "Jobs"?true:false} />
        <HeaderLinks setLink={setSelectedLink?setSelectedLink:null}  Icon={ChatIcon} text="Messaging" feed active={selectedLink === "Messaging"?true:false} />
        <HeaderLinks setLink={setSelectedLink?setSelectedLink:null}  Icon={NotificationsIcon} text="Notifications" feed active={selectedLink === "Notifications"?true:false} />
        <HeaderLinks setLink={setSelectedLink?setSelectedLink:null}  userImage={userImage?userImage:null}  Icon={Avatar} text={"Me"} feed avatar hidden active={selectedLink === "Me"?true:false} />
        <HeaderLinks setLink={setSelectedLink?setSelectedLink:null}  Icon={AppsOutlinedIcon} text="Work" feed hidden active={selectedLink === "Work"?true:false} />
    

    {mounted && (


        <div className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative
        ${
              resolvedTheme === "dark" ? "justify-end" : "justify-start"
            }`} onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }>
         <span className="absolute right-0.5 ">🌞</span>
        {/*motion.div*/}
        <motion.div className='w-5 h-5 bg-white rounded-full z-40' layout transition={spring}/>
           
           <span className="absolute left-0">🌜</span>
        </div>

    )}
   
</div>
</header>

     );
}
 
export default HeaderNav;