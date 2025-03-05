import React, { useEffect, useState } from "react";
import locatioNService from "../../services/locationService";
import locationService from "../../services/locationService";
import { useRouter } from "next/router";
function NearLocations() {
  const [isMobileView, setIsMobileView] = useState(false);

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const router = useRouter();
  const fetchLocations = async (filter) => {
    try {
     
      var data = null;
      var filter = {status:'Visible'}
      
      data = await locationService.listRegions(filter);
     
      if(data){
        setItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleNearMe = ()=>{
      getLocation();
  }
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          localStorage.setItem('userLocation', JSON.stringify(userLocation)); // Save location to localStorage
          router.push('/search/7km');
        },
   
        (err) => {
          console.log('Failed to get location: ' + err.message);
        }
      );
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileView(false); // Show 3 items for large screens
      } else {
        setIsMobileView(true); // Show 1 item for mobile
      }
    };

    // Set initial items per page
    handleResize();

    fetchLocations();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-[30px] md:gap-10`}
        >
          <div className="w-full flex flex-col gap-3 md:gap-6">
            <div className="fs-48-400-lato lh-57 txt-color-red text-left md:text-center">
              Search By Your Location Near You
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {items.map((item, index) => (
                <div
                  onClick={()=>{router.push('/search/7km/'+item.slug)}}
                  key={index}
                  className="cursor-pointer flex justify-center text-center py-3 px-6 rounded-md border-2 border-[#97B2A9] fs-18-500-lato w-full md:w-[236px] lg:w-[100%] h-[51px] truncate txt-color-gray700"
                >
                  {item.name}
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <button
              onClick={handleNearMe}
                className={`btn ${
                  setIsMobileView
                    ? "sec-outline-btn txt-color-gray700"
                    : "sec-btn text-white  "
                } py-3 px-6 fs-16-700-lato w-full md:w-auto`}
              >
                {isMobileView ? "THERAPISTS NEAR ME" : "THERAPISTS NEAR YOU"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NearLocations;
