
import { Avatar } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useState,useEffect } from 'react';
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";


const SideBar = () => {

    const {data:session}  = useSession();

    const [userObject,setUserObject] = useState();

    useEffect(() => {

        if(session){

            setUserObject(session);
           
        }

    },[session])

    return ( 

     <div className='space-y-2 min-w-max max-w-lg'>
        <div className="bg-white dark:bg-gray-800 
        rounded-lg overflow-hidden relative flex 
        flex-col items-center text-center border 
        border-gray-300 dark:border-none">
            <div className='relative w-full h-14'>
                <img className="absolute w-full h-14" src="https://rb.gy/i26zak" alt="user_img" />
            </div>
        <Avatar 
             onClick={signOut}
             className='h-14 w-14 border-2 cursor-pointer absolute top-6 shadow-lg dark:shadow-none'
             src={userObject?.user.image}/>
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer">
            {userObject?.user.name}
          </h4>
          <p className="text-black/60 dark:text-white/75 text-sm">
            {userObject?.user.email}
          </p>
          </div>
          <div className='hidden md:inline text-left dark:text-white/75 text-sm'>
           <div className="font-medium sidebarButton space-y-0.5">
               <div className='flex justify-between space-x-2'>
                   <h4>Who viewed your profile</h4>
                   <span className='text-blue-500'>32</span>
            </div>
               <div className='flex justify-between space-x-2'>
                   <h4>Views of your posts</h4>
                   <span className='text-blue-500'>310</span>
               </div>
           </div>
           <div className='sidebarButton'>

                <h4 className="leading-4 text-xs">
              Access exclusive tools & insights
            </h4>
            <h4 className="dark:text-white font-medium">
              <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />{" "}
              Try Premium for free
            </h4>
           </div>
           <div className='sidebarButton flex items-center space-x-1.5'>
            <BookmarkOutlinedIcon className="!-ml-1" />
            <h4 className="dark:text-white font-medium">My items</h4>
           </div>
        </div>      
    </div>

    <div className='hidden md:flex bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg overflow-hidden flex-col space-y-2 top-20 border border-gray-300 dark:border-none'>

        <p className='sidebarLink'>Groups</p>
         <div className="flex items-center justify-between">
          <p className="sidebarLink">Events</p>
          <AddRoundedIcon className="!h-5" />
        </div>
        <p className="sidebarLink">Followed Hashtags</p>
      <div className="sidebarButton text-center">
          <h4 className="dark:text-white font-medium text-sm">Discover More</h4>
        </div>
    </div>
   </div> 
    
    );
}
 
export default SideBar;
