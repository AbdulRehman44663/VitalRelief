import React , { useState,useEffect } from "react";
import heroImg from "../../assets/images/hero-img.jpg";
import Image from "next/image";
import { Input, Select } from "antd";
import settingService from "@/services/settingService";
import { IMAGES_PATH, SITE_URL } from "@/config/constants";
import listingService from "@/services/listingService";
import { Router, useRouter } from "next/router";
import Head from "next/head";

function HeroSection() {
  
  const [hasClass, setHasClass] = useState(true);
  var [backgroundImageStyle, setbackgroundImageStyle]= useState(null);
  
  const [setting, setSetting] = useState(null);
  const radiusOptions = [
    {label:'1KM',value:'1KM'},
    {label:'2KM',value:'2KM'},
    {label:'3KM',value:'3KM'},
    {label:'4KM',value:'4KM'},
    {label:'5KM',value:'5KM'},
    {label:'6KM',value:'6KM'},
    {label:'7KM',value:'7KM'},
  ]

  const [querySlug, setQuerySlug] = useState('');
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  
  const [queryLocation, setQueryLocation] = useState('');
  const [queryLocationSlug, setQueryLocationSlug] = useState('');
  const [selectedOptionLocation, setSelectedOptionLocation] = useState(null);
  const [suggestionsLocation, setSuggestionsLocation] = useState([]);

  const [filters , setFilters] = useState(null);
  var [serviceOptions,setServiceOptions] = useState([]);
  var [locationOptions,setLocationOptions]= useState([]);

  const [selectedRadius , setSelectedRadius] = useState(null);
  const [searchType, setSearchType] = useState('Location');
  
  // Filter suggestions based on user input
  const handleInputChange = (e,type) => {
   
    if(type =='Radius'){
     
    }
    if(type=='Service'){
      const value = e.target.value;
      setQuery(value);
      filters?.services?.map((item)=>{
        if(value == item.name){
          setQuerySlug(item.slug);
        }
      })
      if (value) {
        setSuggestions(
          serviceOptions.filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
        setSuggestions([]);
      }
    }
    if(type=='Location'){
      const value = e.target.value;
      setQueryLocation(value);
      filters?.locations?.map((item)=>{
        if(value ==  item.name){
          setQueryLocationSlug(item.slug);
        }
      })
      if (value) {
        setSuggestionsLocation(
          locationOptions.filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
        setSuggestionsLocation([]);
      }
    }
  };

  // Handle option selection
  const handleSelect = (option,type) => {
    if(type=='Service'){
      setQuery(option);
      filters?.services?.map((item)=>{
        if(option ==  item.name){
          setQuerySlug(item.slug);
        }
      })
      setSelectedOption(option);
      setSuggestions([]); // Close suggestions after selecting
    }
    if(type=='Location'){
      setQueryLocation(option);
      filters?.locations?.map((item)=>{
        if(option ==  item.name){
          setQueryLocationSlug(item.slug);
        }
      })
      setSelectedOptionLocation(option);
      setSuggestionsLocation([]); // Close suggestions after selecting
    }
  };

  const fetchFilters = async () =>{
    try{
      
      let data = await listingService.getListingFilters();
      if(data){
        setFilters(data.data);
        let options = []
        data?.data?.services?.map((item)=>{
      
          options.push(item?.name)
        })
        setServiceOptions(options);

        let locations = []
        data?.data?.locations?.map((item)=>{
      
          locations.push(item?.name)
        })
        setLocationOptions(locations);
      }
    }catch (error) {
      console.error('Error fetching filters:', error);
    } finally {
      // setLoading(false);
    }
  }
   const fetchDetail = async () =>{
    
    try {
    
      var data = null;
      
      data = await settingService.getSiteSetting();
      
      if(data){
        setSetting(data.data);
        
        if(data.data?.files && data.data?.files[0]){
          let bgImageStyle = {
            backgroundImage: "url('"+IMAGES_PATH+'/'+data.data?.files[0]?.file+"')"
          };
           localStorage.setItem('HomeBg',data.data?.files[0]?.file);
          setbackgroundImageStyle(bgImageStyle)
        }
       
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      // setLoading(false);
    }
   
  }

  const moveToSearch = () =>{
    let uri = '';
    if(searchType=='Location'){
      let locations = [];
      filters.locations?.map((item)=>{
          locations.push(item?.slug);
      })
      localStorage.setItem('locations',locations);
      let services = [];
      filters.services?.map((item)=>{
          services.push(item?.slug);
      })
      localStorage.setItem('services',services);
      if(queryLocationSlug){
        if(uri !=''){

          uri +='/'+ queryLocationSlug;

        }else{
          
          uri += queryLocationSlug;
        }

      }
      if(querySlug){
        
        if(uri !=''){
        
          uri +='/'+ querySlug;

        }else{
          
          uri += querySlug;
        }

      }
      
    }else if(searchType =='Radius'){
      if(selectedRadius){
        if(uri !=''){
        
          uri +='/'+ selectedRadius.replace(' ','-').toLowerCase();

        }else{
          
          uri += selectedRadius.replace(' ','-').toLowerCase();
        }
      }
      if(querySlug){
        
        if(uri !=''){
        
          uri +='/'+ querySlug;

        }else{
          
          uri += querySlug;
        }

      }
   
    }
    if(uri!=''){
      router.push('/search/'+uri)
    }
  }

  useEffect(() => {

    fetchFilters();
    let bgimage = localStorage.getItem('HomeBg');
    if(bgimage){
      let bgImageStyle = {
        backgroundImage: "url('"+IMAGES_PATH+'/'+bgimage+"')"
      };
      
      setbackgroundImageStyle(bgImageStyle)
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHasClass(false);
      }else{
        
        setHasClass(true);
      }

      fetchDetail();
    };

    // Set initial items per page
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const setSearch = (type)=>{
    if(searchType == 'Location'){
      setSearchType('Radius');
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
     
      } else {
       
          getLocation();
               
      }
    }else if(searchType == 'Radius'){
     
      setSearchType('Location');
    }
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
        },
        (err) => {
          // alert(4)
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="relative hero-bg h-[578px] md:h-[800px]" 
    style={backgroundImageStyle}>
      <Head>
      <title> {setting ? setting?.page_title:( setting?.meta_title ?setting?.meta_title:'')}</title>
      </Head>
      <div className=" overlay">
        <div className="content">
          <div className="flex items-center justify-start px-6 md:px-16 z-50">
            <div className="flex flex-col gap-6 w-full md:w-full lg:w-[77%]">
              <div className="fs-64-400-qualo text-white text-center md:text-left">
              {setting?.main_title ? setting?.main_title: '  Book Local Beauty & Wellness Services'}
              </div>
              <div className="fs-18-500-lato text-white w-full md:w-[55%] text-center md:text-left">
                {setting?.subtitle? setting?.subtitle:'Describe exactly what the company does and what a customer can expect when working with the company. Avoid using verbose words or phrases.'}
              </div>
              <div className="bg-white p-4 md:py-3 md:px-8 rounded-xl shadow-[0px_8px_18px_0px_#0000001A] flex flex-col md:flex-row items-center gap-6">
              
                <div className="relative w-full">
                  <Input
                    className="bg-[#F2F4F7] gap-3 p-3 border  border-[#EAECF0] rounded-md focus:bg-[#F2F4F7] hover:bg-[#F2F4F7]  focus-within:bg-[#F2F4F7] "
                    placeholder="What Services"
                    value={query}
                    onChange={(event)=>{handleInputChange(event,'Service'); }}
                    prefix={
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 18L22 22.5"
                          stroke="#5B8581"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 11.5C20 6.52944 15.9706 2.5 11 2.5C6.02944 2.5 2 6.52944 2 11.5C2 16.4706 6.02944 20.5 11 20.5C15.9706 20.5 20 16.4706 20 11.5Z"
                          stroke="#5B8581"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                    {/* Suggestions List */}
                    {suggestions.length > 0 && (
                      <ul
                        className="text-left bg-[#F2F4F7] absolute fs-16-500-lato text-red w-full mt-1 border border-[#EAECF0] text-[#000000e0]  rounded-md max-h-60 overflow-y-auto z-10"
                        style={{ top: 'calc(100% + 5px)' }}
                      >
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="p-3 hover:bg-[#F2F4F7] cursor-pointer"
                            onClick={() => handleSelect(suggestion,'Service')}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>

                {
                  searchType == 'Location' ?
                  <>
                    <div className="relative w-full">
                
                      <Input
                        value={queryLocation}
                        onChange={(event)=>handleInputChange(event,'Location')}
                        className="bg-[#F2F4F7] gap-3 p-3 border border-[#EAECF0] rounded-md focus:bg-[#F2F4F7] hover:bg-[#F2F4F7]  focus-within:bg-[#F2F4F7] "
                        placeholder="Where"
                        prefix={
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.6177 21.867C13.1841 22.273 12.6044 22.5 12.0011 22.5C11.3978 22.5 10.8182 22.273 10.3845 21.867C6.41302 18.126 1.09076 13.9469 3.68627 7.87966C5.08963 4.59916 8.45834 2.5 12.0011 2.5C15.5439 2.5 18.9126 4.59916 20.316 7.87966C22.9082 13.9393 17.599 18.1389 13.6177 21.867Z"
                              stroke="#5B8581"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M15.5 11.5C15.5 13.433 13.933 15 12 15C10.067 15 8.5 13.433 8.5 11.5C8.5 9.567 10.067 8 12 8C13.933 8 15.5 9.567 15.5 11.5Z"
                              stroke="#5B8581"
                              strokeWidth="1.5"
                            />
                          </svg>
                        }
                      />
                      {/* Suggestions Location List */}
                      {suggestionsLocation.length > 0 && (
                          <ul
                            className="text-left bg-[#F2F4F7] absolute fs-16-500-lato text-red w-full mt-1 border border-[#EAECF0] text-[#000000e0]  rounded-md max-h-60 overflow-y-auto z-10"
                            style={{ top: 'calc(100% + 5px)' }}
                          >
                            {suggestionsLocation.map((suggestion, index) => (
                              <li
                                key={index}
                                className="p-3 hover:bg-[#F2F4F7] cursor-pointer"
                                onClick={() => handleSelect(suggestion,'Location')}
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </>
                  :
                  <>
                    <div className="searchBar  w-full">
                      <Select
                    options={radiusOptions}
                      onChange={(e)=>setSelectedRadius(e)}
                      className="bg-[#F2F4F7] w-full h-[50px] p-3 border border-[#EAECF0] rounded-md focus:bg-[#F2F4F7] hover:bg-[#F2F4F7] focus-within:bg-[#F2F4F7] text-sm"
                      placeholder="Radius"
                      prefix={
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.6177 21.867C13.1841 22.273 12.6044 22.5 12.0011 22.5C11.3978 22.5 10.8182 22.273 10.3845 21.867C6.41302 18.126 1.09076 13.9469 3.68627 7.87966C5.08963 4.59916 8.45834 2.5 12.0011 2.5C15.5439 2.5 18.9126 4.59916 20.316 7.87966C22.9082 13.9393 17.599 18.1389 13.6177 21.867Z"
                            stroke="#5B8581"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M15.5 11.5C15.5 13.433 13.933 15 12 15C10.067 15 8.5 13.433 8.5 11.5C8.5 9.567 10.067 8 12 8C13.933 8 15.5 9.567 15.5 11.5Z"
                            stroke="#5B8581"
                            strokeWidth="1.5"
                          />
                        </svg>
                      }
                    >
                      
                      </Select>
                    </div>                      
                  </>
                }
               
                <div className="flex gap-6 w-full md:w-auto">
                  {!hasClass ? 
                    <>
                   
                   
                      <button className="btn fs-16-700-lato text-white sec-btn py-3 px-6 rounded-md w-full " onClick={moveToSearch}>
                        Search
                      </button>
                  
                    </>
                  :(
                    <>
                    
                    {searchType == 'Radius' ? 
                      <button className="btn fs-16-700-lato text-white sec-btn py-3 px-6 rounded-md w-full md:w-[109px] " onClick={moveToSearch}>
                        Near me
                      </button>
                    :
                      <button className="btn fs-16-700-lato text-white sec-btn py-3 px-6 rounded-md w-full md:w-[102px] "  onClick={moveToSearch}>
                        Search
                      </button>
                    }
                    <button className="btn sec-outline-btn p-3  rounded-md md:w-[48px] md:h-12 flex items-center justify-center " onClick={()=>setSearch('Radius')}>
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.1677 7.5C22.2774 10.0442 22.2774 12.9558 21.1677 15.5M2.83226 15.5C1.72258 12.9558 1.72258 10.0442 2.83226 7.5"
                          stroke="#5B8581"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 11.5C15 13.1569 13.6569 14.5 12 14.5C10.3431 14.5 9 13.1569 9 11.5C9 9.84315 10.3431 8.5 12 8.5C13.6569 8.5 15 9.84315 15 11.5Z"
                          stroke="#5B8581"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M12 4C16.0588 4 19.5 7.42803 19.5 11.5869C19.5 15.812 16.0028 18.777 12.7725 20.7932C12.5371 20.9287 12.2709 21 12 21C11.7291 21 11.4629 20.9287 11.2275 20.7932C8.00325 18.7573 4.5 15.8266 4.5 11.5869C4.5 7.42803 7.9412 4 12 4Z"
                          stroke="#5B8581"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                    </>
                  )}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
