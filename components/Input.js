import { Avatar } from '@mui/material';
import React from 'react';
import {useSession } from 'next-auth/react';
import {motion} from 'framer-motion';
import { Article, BusinessCenter, PhotoSizeSelectActual, VideoCameraBack } from '@mui/icons-material';
import {useStates} from '../components/context/Context';

const Input = () => {

    const {data:session} = useSession();

    const {setModelType,modelType,posts,setPosts,model,setModel} = useStates();

    return ( 
      
        <div className='bg-white dark:bg-gray-800 rounded-lg p-3 space-y-3 border border-gray-300 dark:border-none'>
          <div className='flex items-center space-x-2'>
               <Avatar src={session?.user?.image} className='h-10 w-10 cursor-pointer'/>
            <motion.button whileHover={{scale:1.01}}
               whileTap={{scale:0.99}}  
               className='rounded-full border border-gray-400 w-full text-left p-2.5 opacity-80 hover:opacity-100 font-medium focus:outline-none' 
               onClick={() => {setModel(true); setModelType("dropIn")}}
               >Add a post
            </motion.button>
       </div>
        <div className='flex items-cenetr flex-wrap justify-center gap-4 md:gap-x-10'>
     <button className='inputButton group'>
      <PhotoSizeSelectActual className='text-blue-400'/>
      <h4 className='o pacity-80 group-hover:opacity-100'>Photo</h4>
      </button>
    <button className='inputButton group'>
      <VideoCameraBack className='text-green-400'/>
      <h4 className='opacity-80 group-hover:opacity-100'>Video</h4>
      </button>
    <button className='inputButton group'>
      <BusinessCenter className='text-blue-300'/>
      <h4 className='opacity-80 group-hover:opacity-100'>Job</h4>
      </button>
    <button className='inputButton group'>
      <Article className='text-red-400'/>
      <h4 className='opacity-80 group-hover:opacity-100'>Write Article</h4>
      </button>
    </div>
</div>
      );
}
 
export default Input;