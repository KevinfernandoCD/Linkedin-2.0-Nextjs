
import Header from '../components/Header';
import { getSession, signOut, useSession } from "next-auth/react"
import HeaderNav from '../components/HeaderNav';
import SideBar from '../components/SideBar';
import {useRouter} from 'next/router';
import Feed from '../components/Feed';
import { AnimatePresence } from 'framer-motion';
import { useStates } from '../components/context/Context';
import Modal from '../components/Model';
import { ToastContainer } from 'react-toastify';
import {connectToDatabase} from '../utils/mongodb';
import Widgets from '../components/widgets/Widgets';


export default function Home({SSRposts,news}) {

  const ServerPosts =  JSON.parse(SSRposts);

  console.log(news)

  const router = useRouter();

  const {setModelType,modelType,posts,setPosts,model,setModel} = useStates();

  //CLIENT SIDE AUTHENTICATION

  const {data:session,status} = useSession({

    required:true,

    onUnauthenticated() {

      router.push('/home')

    }

  });

  return (
 
    <div className=" bg-white/75 dark:bg-gray-900 dark:text-white overflow-y-scroll  h-screen md:space-y-6">
      <Header title={session?`Linkedin 2.0 - ${session?.user.name} | Feed`:"| Feed"}/>  
      <HeaderNav/> 
      <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
        <div className="flex flex-col md:flex-row gap-5">
          <SideBar />
          <Feed serverPosts={ServerPosts}/>
        </div>

        <Widgets articles={news.articles}/>

         <AnimatePresence>
          {model && (
            <Modal handleClose={() => setModel(false)} type={modelType} />
          )}
        </AnimatePresence>
      </main>
         <ToastContainer
         position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
theme='dark'
pauseOnHover />
    </div> 

  )

}

export async function getServerSideProps(context) {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    }
  }
  //GET GOOGLE NEWS API 

  const {db} = await connectToDatabase();

  const SSRposts = await db.collection("posts").find().sort({timestamp:-1}).toArray();

  const result = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=b1bf8b79666547eca0d71e1857b62be8`).then(res => res.json());

  //WE NEED TO STRINGFY OUR DATA WHEN WE RETURN IT FRO THE SERVER TO CLIENT BECUZ FETCH METHOD DOSENT DO IT  LIKE AXIOS DOES 
    return {
      props: {
      session,
      news : result,
      SSRposts : JSON.stringify(SSRposts), 
    }
  }
}

  