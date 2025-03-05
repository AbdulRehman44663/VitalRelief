import BlogHeader from "@/components/BlogComponent/BlogHeader";
import BlogsList from "@/components/BlogComponent/BlogsList";
import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { withAuth } from "@/HOC";
import React,{useState,useEffect} from "react";
import blogsService from "@/services/blogsService";
import Head from "next/head";

function BlogsPage() {

  
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
  
  const fetchBlogs = async (filter) => {
    try {
     
      var data = null;
      var filter = {status:'Active',limit:10}
      
      data = await blogsService.list(filter);
     
      if(data){
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }

   useEffect(()=>{
      fetchBlogs();
    },[])
  return (
    <>
      <Navbar />
      <Head>
        <title>	Male Massage Blog, massage therapy in London</title>
      </Head>
      <div className="flex justify-center bg-[#fcfcfd]">
        <div className="max-w-[1440px] w-full">
          <div
            className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-[30px] md:gap-[32px]`}
          >
            {blogs && blogs.length>0 ? 
            <>
             <BlogHeader blog={blogs ? blogs[0]:null} />
          
             <BlogsList blog={blogs} />
            </>
            :
            <></>}
           
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(BlogsPage, {
  requireAuth: false,
  publicAccess: true,
});
