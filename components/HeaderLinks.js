import React from 'react';
import {signOut} from 'next-auth/react';

const HeaderLinks = ({Icon,text,avatar,feed,active,hidden,setLink,name,userImage}) => {

    //USE ! MARK TO MAKE THE CLASS STYLE TO OVERIDE ANY BUILT IN CSS
    return ( 

        <div onClick={() => setLink(text)} className={`${hidden && "hidden md:inline-flex"} cursor-pointer flex flex-col items-center transition all 

        hover:text-black  pr-4 pl-4 pt-2 pb-2 rounded-md ease-out duration-300 
        ${feed? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1":
        "text-gray-500 hover:text-gray-700"} ${active && "text-black dark:!text-white"}`}>

            {avatar ? (

                 <Icon src={userImage?userImage:null} onClick={signOut} className={`!h-7 !w-7 lg:!-mb-1 transition-all duration-300 bg-black/60 dark:bg-white/75 ${active && ' dark:bg-white/75'}`}/>

            ): (

                 <Icon/>

            )}

            <h4 className={`text-sm ${feed && "hidden lg:flex justify-center w-full mx-auto"}`}>{text}</h4>
             {active && (
        <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full transition-all duration-300" />
      )}
       
        </div>
     );
}
 
export default HeaderLinks;