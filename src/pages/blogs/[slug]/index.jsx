import BlogDetail from "@/components/BlogDetailComponent/BlogDetail";
import BlogDetailHeader from "@/components/BlogDetailComponent/BlogDetailHeader";
import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { withAuth } from "@/HOC";
import blogsService from "@/services/blogsService";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect ,useState} from "react";

function BlogDetailPage() {
  const router = useRouter();
  const {slug} = router.query;

  const [blogData, setBlogData] = useState(null);

   const fetchDetail = async () =>{
    if(slug){
      try {
     
        var data = null;
        
        data = await blogsService.getBySlug(slug);
       
        if(data){
          setBlogData(data.data);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        // setLoading(false);
      }
    }
  }
  
  useEffect(() => {
    fetchDetail();
  },[]);

  return (
    <>
      <Navbar />
      <Head>
        <title>	{blogData?.title}</title>
      </Head>
      <BlogDetailHeader blog={blogData}/>
      <BlogDetail blog={blogData} />
      <Footer />
    </>
  );
}

export default withAuth(BlogDetailPage, {
  requireAuth: false,
  publicAccess: true,
});
