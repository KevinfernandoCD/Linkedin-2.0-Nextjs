
import React from 'react';
import HeaderLink from '../components/HeaderLinks';
import Header from '../components/Header';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExploreIcon from '@mui/icons-material/Explore';
import WorkIcon from '@mui/icons-material/Work';
import { ArrowForwardRounded } from '@mui/icons-material';
import {getProviders,signIn} from 'next-auth/react';
import {useEffect,useState} from 'react';


const Home = ({providers}) => {

    //HOME SIGN UP PAGE
    return ( 
    <>
    <Header title='Linkedin - Home'/>
    <div className='space-y-10 relative'>
        <header className='flex justify-around items-center py-4'>
          <div className='relative w-40 h-10'>
              <img className='absolute mt-[-30px]' src='https://download.logo.wine/logo/LinkedIn/LinkedIn-Logo.wine.png' alt='logo' />
          </div>

          <div className='flex items-center sm:divide-x divide-gray-300'>
              <div className='hidden sm:flex space-x-8 pr-4'>
                <HeaderLink Icon={HomeIcon} text="Home"/>
                <HeaderLink Icon={PeopleAltIcon} text="People"/>
                <HeaderLink Icon={ExploreIcon} text="Explore"/>
                <HeaderLink Icon={WorkIcon} text="People"/>
              </div>
              {Object.values(providers).map(p => (
             <div className='pl-4' key={p.id}>
              <button onClick={() => signIn(p.id,{callbackUrl:"/"})}  className='focus:outline-none cursor-pointer text-blue-700 font-semibold rounded-full border-2 border-blue-700 px-5 py-1.5 transition-all  hover:bg-blue-700 hover:text-white duration-300'>Sign in</button>
            </div>   
            ))}     
          </div>
        </header>
        <main className="flex flex-col xl:flex-row items-center max-w-screen-xl mx-auto">
          <div className='space-y-6 xl:space-y-10'>
            <h1 className= 'text-3xl text md:text-5xl text-amber-900/80 lg:max-w-[700px] md:max-w-[500px] md:text-center sm:text-center sm:max-w-[400px] xs:text-center xs:max-w-[200px] !leading-snug pl-4 xl:pl-0 lg:text-left '>Start Your Professional Career Now, Join The Community</h1>
          </div>

          <div className='space-y-4'>

              <div className="intent">
              <h2 className='text-xl'>Search for a job</h2>
              <ArrowForwardRounded/>
            </div>

            <div className="intent">
              <h2 className='text-xl'>Find a person you know</h2>
              <ArrowForwardRounded/>
            </div>

              <div className="intent">
              <h2 className='text-xl'>Learn a new skill</h2>
              <ArrowForwardRounded/>
            </div>
          </div>

          <div className='relative xl:absolute xl:top-[100%] xl:left-[20%] w-[500px] h-[500px]'>
            <img src="https://rb.gy/vkzpzt" alt="cover_img"/>
          </div>
        </main>
    </div> 
    </>
   );
}
 
export default Home;

export async function getServerSideProps() {

  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}