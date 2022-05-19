import React from 'react';
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import TimeAgo from "timeago-react";

const Widgets = ({articles}) => {
    return ( <div className='hidden xl:inline space-y-2'>

        <div className='bg-white dark:bg-gray-800 py-2.5 rounded-lg space-y-w w-11/52 overflow-hidden border border-gray-300 dark:border-none'>

            <div className='flex items-center font-bold px-2.5 space-x-2 py-2.5 justify-center'>
                <h4>LinkedIn News</h4>
                <InfoRoundedIcon className="h-5 w-5" />
            </div>
            <div className='space-y-1'>
                {articles.slice(0,5).map((article) => (

                    <div  key={article.url} className="flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 px-2.5 py-1">

                    <FiberManualRecordRoundedIcon className="!h-2 !w-2" />
                    <div>
                <h5 className="max-w-xs font-medium text-sm truncate pr-10">
                  {article.title}
                </h5>
                <TimeAgo
                  datetime={article.publishedAt}
                  className="text-xs mt-0.5 dark:text-white/75 opacity-80"
                />
              </div>
         </div>
                ))}
            </div>
        </div>
 <div className="bg-white dark:bg-[#1D2226] rounded-lg sticky top-20  dark:border-none ">
        <div className="relative w-full h-full rounded-lg">
          <img

          className='object-cover w-full cursor-pointer rounded-lg'
            src="https://rb.gy/kbfeaa"
          />
        </div>
      </div>

    </div> );
}
 
export default Widgets;