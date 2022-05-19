import React from 'react';
import { createContext,useState } from 'react';
import { useContext } from 'react';


const state = createContext();


const StateProvider = ({children}) => {

    const [posts,setPosts] = useState([]);

    const [model,setModel] = useState(false);

    const [modelType,setModelType] = useState("dropIn");

    const [post,setPost] = useState();

    const [SSR,setSSR] = useState(true);

    const[selectedPost,setSelectedPost] = useState();

    const[handlePost,setHandlePost] = useState(false);

    return (
        
        <state.Provider value={{setModelType,modelType,posts,setPosts,model,setModel,post,setPost,SSR,setSSR,selectedPost,setSelectedPost,handlePost,setHandlePost}}>
            {children}
        </state.Provider>


     );
}
 
export default StateProvider;

export const useStates = () => {

    return useContext(state)
}