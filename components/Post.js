import {Avatar,IconButton} from '@mui/material';
import React from 'react';
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useStates } from './context/Context';
import { useState } from 'react';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import RecommendIcon from '@mui/icons-material/Recommend';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import {useSession} from 'next-auth/react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TimeAgo from 'timeago-react';
import {toast } from 'react-toastify';


const Post = ({post,modalPost}) => {

    const {setModel,setModelType,setSelectedPost,setPosts,posts,setHandlePost,handlePost} = useStates();

    const [showInput,setShowInput] = useState(false);

    const [liked,setLiked] = useState(false);

    const {data:session} = useSession();

     const notify = () => toast.error("Failed To Delete Post",{ 
   position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
  });

    const truncate = (string,n) => {

        return string?.length > n ? showInput?<div>{string}<p className='cursor-pointer hover:underline font-medium' onClick={() => setShowInput(false)}> <KeyboardDoubleArrowLeftIcon/> see less</p></div>:
        <div >{string.substr(0, n - 1)}<label className='cursor-pointer hover:underline font-medium' onClick={() => setShowInput(true)}>...see more</label></div>   : string;
     
    }

    const deletePost = async (postId) => {

    const response = await fetch(`/api/posts/${postId}`, {

    method: "DELETE",
    headers: { "Content-Type": "application/json" },

    });

    const postDeleted = await response.json();

   if(postDeleted.message == 'The post has been deleted!!'){

    setPosts(posts.filter(p => p._id !== postId));
    
    setHandlePost(!handlePost)

   }else {

    notify();

   }

    setModel(false);
}
    return ( 
        <div className={`bg-white dark:bg-gray-800 ${modalPost? "rounded-none":"rounded-lg"} space-y-2 py-2.5 border border-gray-300 dark:border-none`}>
            <div className='flex items-center px-2.5 cursor-pointer'>
                <Avatar src={post.userImg} className='!h-10 !w-10 cursor-pointer'/>
                <div className='mr-auto ml-2 leading-none'>
                    <h6 className='font-medium hover:text-blue-500 hover:underline'>{post.username}</h6>
                    <p className='text-xs dark:text-white/75 opcaity-80'>{post.email}</p>
                    <TimeAgo
            datetime={post.createdAt}
            className="text-xs dark:text-white/75 opacity-80"
          />
                </div>
                 {modalPost ? (
          <IconButton onClick={() => setModel(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
            </div>
            {post.input && (

                <div className='px-2.5 break-all md:break-normal'>
                    
                    {modalPost? (

                        <p>{post.input}</p>

                    ):(

                        <p>{truncate(post.input,150)}</p>

                    )}
                </div>
            )} 

            {post.photoUrl && !modalPost && (

             <img src={post.photoUrl} alt='post_image' className='w-full cursor-pointer' onClick={() => {setModel(true); setModelType('gifYouUp'); setSelectedPost(post)}}/>

            )}     
            <div className='flex justify-evenly items-center'>
             {modalPost?(
                 <button className='postButton'>  
                 <CommentOutlinedIcon/>
                 <h4>Comment</h4>
                 </button>           
             ):(
                 <button className='postButton focus:outline-none' onClick={() => setLiked(!liked)}>
                     {liked?
                    <><RecommendOutlinedIcon className='text-blue-500'/><h4 className='text-blue-500'>Liked</h4></> :<><RecommendIcon /><h4>Like</h4></>}
               </button>
             )}  
             {post.email === session?.user.email? (

                <button className='postButton focus:outline-none' onClick={() => deletePost(post._id)}>
                    <DeleteRoundedIcon/>
                    <h4>Delete post</h4>
                 </button>
             ):
             (
                <button className='postButton focus:outline-none'>
                   <ReplyRoundedIcon/>
                    <h4>Share</h4>
                 </button>
             )}       
            </div>      
       </div>
     );
}
 
export default Post;