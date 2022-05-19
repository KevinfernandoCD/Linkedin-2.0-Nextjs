import React from 'react';
import { useEffect,useState } from 'react';
import { useStates } from './context/Context';
import Input from './Input';
import Post from './Post';

const Feed = ({serverPosts}) => {

    const {post,setPosts,posts,SSR,setSSR,setHandlePost,handlePost} = useStates();

    useEffect(() => { 

    const fetchedposts = fetch('/api/posts',{

        method:"GET"

    }).then(res => res.json()).then(data =>  setPosts(data))

    setSSR(false);

    },[handlePost]); 

return ( 

    <div className='space-y-6 pb-24 max-w-lg'>
        <Input/>
        {!SSR? posts.map(p => <Post key={p._id} post={p}/>): 
        serverPosts.map(p => <Post key={p._id} post={p}/>)}
    </div>
    );
}
 
export default Feed;