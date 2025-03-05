
import Link from "next/link";
import cameraIcon from "../../../../../assets/icons/camera-icon.png";
import uploadIcon from "../../../../../assets/icons/upload-cloud.png";
import BreadcrumbComp from "@/components/Breadcrumb";
import dynamic from "next/dynamic";
import useStore from "@/store";
import React, { useState,useEffect,useRef  } from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  InputNumber,
  Checkbox,
  Select ,message, Space 
} from "antd";
import {  DeleteOutlined } from '@ant-design/icons';
import Image from "next/image";
import listingService from "../../../../../services/listingService";
import fileService  from "../../../../../services/fileService";
import { useRouter } from "next/router";
import { IMAGES_PATH, LISTING_IMAGES_PATH ,IMAGES} from "../../../../../config/constants";

import subscriptionService from "@/services/subscriptionService";

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function QuillNoSSRWrapper({ ...props }) {
      return <RQ {...props} />;
    };
  },
  { ssr: false }
);

const modules = {
  toolbar: [
    ["bold", "italic"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const formats = ["bold", "italic", "list", "bullet", "link"];

const { Dragger } = Upload;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function FirstListingStepper({ moveForward}) {
  // UK phone number validation regex (starts with +44 or 0 followed by 10 digits)
  const ukPhoneRegex =/^\+44\d{9,10}$/;

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [serviceType, setServiceType] = useState("OUT CALL");
  const [recommended, setRecommended] = useState("No");
  const [activationEmail, setActivationEmail] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const formRef = useRef(null);
  const [content, setContent] = useState("");
  
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const { ss } = router.query;
  var [details, setDetails] = useState(null);
  var [toMove, setToMove] = useState(false);
  var [listingId, setListingId] = useState(id);
  var [filters, setFilters] = useState([]);

  const [stepperCount, setStepperCount] = useState(1);
  var [selectedSubscription, setSelectedSubscription] = useState([]);
  var [selectedRegion, setSelectedRegion] = useState([]);
  var [selectedOutCallLocations, setSelectedOutCallLocations] = useState([]);
  var [selectedTags, setSelectedTags] = useState([]);
  var [selectedServices, setSelectServices] = useState([]);

  
  var user = useStore((state) => state.user);
  var [categories, setCategories] = useState([]);
  var [notificationText, setNotificationText] = useState('');
  var [regions, setRegions] = useState([]);
  var [locations, setLocations] = useState([]);
  var [tags, setTags] = useState([]);
  var [services, setServices] = useState([]);
  var [subscriptionLevels, setSubscriptionLevels] = useState([]);
  
  const [uploadProfileFiles, setUploadProfileFiles] = useState([]);
  const [alreadyUploadProfileFiles, setAlreadyUploadProfileFiles] = useState([]);

  
  const [uploadListingFiles, setUploadListingFiles] = useState([]);
  const [alreadyUploadListingFiles, setAlreadyUploadListingFiles] = useState([]);


  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [text, setText] = useState('');
  const maxLength = 1000; // Set your max character limit here
    
  const handleChange = (event) => {
    if(event){
   
    
         const value = event;
   
      if (cleanHTML(value).length <= maxLength) {
        setText(value);
      }else{
        const truncatedText = value.slice(0, maxLength);
        setText(truncatedText); 
      }
    }
   
  };

  const cleanHTML = (input) =>{
    var doc = new DOMParser().parseFromString(input, 'text/html');
    return  doc.body.textContent || doc.body.innerText || '';
  }

  const handlePaste = (e) => {
    console.log(e)
    alert(e)
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('Text');
    const newText = text + pastedText;

    if (cleanHTML(newText.length) > maxLength) {
      e.preventDefault(); // Prevent paste
      const truncatedText = newText.slice(0, maxLength);
      setText(truncatedText); 
    } else {
      setText(newText); 
    }
  };


  const handleChangeRecommended = (recommed) => {
    setRecommended(recommed);
    
    form.setFieldsValue({recommended:recommed});
  };

  const handleChangeServiceType = (service) => {
    setServiceType(service);
    
    form.setFieldsValue({service_type:service});
  };

  
  const handleRemoveProfile = async (file) => {
   
    try{
      const deletedBlog = await fileService.delete(file.id,'LISTINGPROFILEIMAGE');
      setAlreadyUploadProfileFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
      message.success(`File ${file.name} removed.`);
    } catch (error) {

    }
  };

  const handleRemoveListing = async (file) => {
   
    try{
      const deletedBlog = await fileService.delete(file.id,'LISTINGIMAGE');
      setAlreadyUploadListingFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
      message.success(`File ${file.name} removed.`);
    } catch (error) {

    }
  };

  const saveDraft = (move=false)=>{
    setIsDraft(true);
    if(!id){

      if (formRef.current) {
        formRef.current.submit(); // Manually trigger form submission
      }
    }else if(id){
      saveListing();
    }

    if(move){
      setToMove(move)
    }
  }
  
  const saveListing = ()=>{
    if (formRef.current) {
      formRef.current.submit(); // Manually trigger form submission
    }
  }

  
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  
    const setInitialValues = (listing) => {
      setServiceType(listing?.service_type);
      setRecommended(listing.recommended);
      setActivationEmail(listing?.activation == 'Yes'? true: false);
      
      let tagsKey = [];
     listing?.tags?.map((item)=>{
        
          tagsKey.push(item?.tag_id);
      })
      
      if(tagsKey.length>0){

        setSelectedTags(tagsKey);
      }

      let serviceKeys = [];
      
      console.log(listing?.services)
     listing?.services?.map((item)=>{
      
        serviceKeys.push(item?.service_id);
       
      })
      
      if(serviceKeys.length>0){
      
        setSelectServices(serviceKeys);
      }
      

      let locationkeys = [];
      listing?.locations?.map((item)=>{
          locationkeys.push(item?.location_detail_id);
      })
      
      if(locationkeys.length>0){

        setSelectedOutCallLocations(locationkeys);
      }
      form.setFieldsValue({
        title: listing?.title, 
        first_name: listing?.user?.first_name, 
        last_name: listing?.user?.last_name, 
        phone: listing?.user?.phone, 
        email: listing?.user?.email, 
        listing_url: listing?.listing_url,  
        admin_notes: listing?.admin_notes,
        tags:listing?.tags,
        services:serviceKeys,
        service_type:listing.service_type,
        tags:tagsKey,
        description:listing?.description,
        post_code:listing?.post_code,
        listing_website:listing?.listing_website,
        listing_email:listing?.listing_email,
        listing_phone:listing?.listing_phone,
        subscription_level:listing.subscription?.id,
        listing_region_id:listing.listing_region_id,
        category:listing.category,
        image_alt_text:listing?.image_alt_text,
        canonical_url:listing?.canonical_url,
        video_url:listing?.video_url,
        meta_title:listing?.meta_title,
        meta_keywords:listing?.meta_keywords,
        meta_description:listing?.meta_description,
        activation:listing?.activation == 'Yes'? true: false,
        outcall_locations:locationkeys,
        recommended:listing.recommended

      });
    };

    const getListingDetails = async () => {
      setLoadingDetail(true);
      try {
        const details2 = await listingService.getSingle(id);
     
        if (details2?.data?.profile_image) {
          const uploadedFiles =details2?.data?.profile_image; // Assuming images are stored as JSON in backend
         
          if(uploadedFiles){
            const filesList = uploadedFiles.map((fileObj) => ({
              url: `${IMAGES_PATH}/${fileObj.file}`, // Adjust path as needed
              name: fileObj.file,
              id: fileObj.id,
              status: 'done',
            }));
            setAlreadyUploadProfileFiles(filesList);
          }
       
        }

        if (details2?.data?.listing_images) {
          const uploadedFilesImages =details2?.data?.listing_images; // Assuming images are stored as JSON in backend
          if(uploadedFilesImages){
            
            const filesListImages = uploadedFilesImages.map((fileObj) => ({
              url: `${LISTING_IMAGES_PATH}/${fileObj.file}`, // Adjust path as needed
              name: fileObj.file,
              id: fileObj.id,
              status: 'done',
            }));
            setAlreadyUploadListingFiles(filesListImages);
          }
          
        }

        if(details2?.data?.listing_region_id){
          setSelectedRegion(details2?.data?.listing_region_id)
        }
        
        setDetails(details2.data);
        setInitialValues(details2.data);
       

        fetchFilters();
        setLoadingDetail(false);
      } catch (error) {
        
        setLoadingDetail(false);
        if(error){
          message.error('Listing not found.');
          router.push('/account?tab=listing');
  
        }
      }
       
     
    };

    const checkSubscriptionStatus =async ()=> {
      try{

        const data = await subscriptionService.checkSubscriptionStatus({user_id:user?.id,listing_id:id});
        if(data && data.success){
          setSubscriptionStatus(true);
        }else{
          setSubscriptionStatus(false)
        }
      }catch (error) {
        console.error('Error fetching filters:', error);
      } finally {
      }
    }

    //Fetch Filters
    const fetchFilters = async () => {
     
      try{
        const data = await listingService.getListingFilters();
        if(data){
          setFilters(data.data);
          let categories = [];
          data?.data?.categories.map((item)=>{
            categories.push(
              {
                key: item,
                value:item
              }
            )
          })
          setCategories(categories);

          let services = [];
          data?.data?.services.map((item)=>{
            services.push(
              {
                key: item.id,
                value:item.name
              }
            )
          })
          setServices(services);

          let regions = [];
          data?.data?.locations.map((item)=>{
            regions.push(
              {
                key: item.id,
                value:item.name
              }
            )
          })
          setRegions(regions);

          let subscriptionLevels = [];
          data?.data?.subscriptions.map((item)=>{
            subscriptionLevels.push(
              {
                key: item.id,
                value:item.title
              }
            )
          })
          setSubscriptionLevels(subscriptionLevels);
          let locations = [];
          data?.data?.location_details.map((item)=>{
            locations.push(
              {
                key: item.id,
                value:item.name
              }
            )
          })
          setLocations(locations)

          let tags = [];
          data?.data?.tags.map((item)=>{
            tags.push(
              {
                key: item.id,
                value:item.name
              }
            )
          })
          
          setTags(tags)
          
        
          if(id) {
           subscriptionLevels.map((item)=>{
              if(item.key == details?.subscription_level){
                setSelectedSubscription({label:item.value, value:item.key}) ;
                
              }
            })
        
           
          }
    
        
        }
      }catch (error) {
        console.error('Error fetching filters:', error);
      } finally {
      }
    }

    useEffect(() => {
      if(ss){
        if(ss=='Canceled'){
          setNotificationText("Your payment was cancelled!");
        }else if(ss && ss=='Success'){
          setNotificationText("Your payment was successfull. Your liting is now pending for activation!");
        }
        setTimeout(() => {
          setNotificationText('')
          const { ss, ...restQuery } = router.query; // Destructure to remove "ss"
    
          // Update the URL without the "ss" query parameter
          router.push({
            pathname: router.pathname,
            query: restQuery, // Pass the updated query without "ss"
          }, undefined, { shallow: true }); // shallow ensures no page reload
        }, 120000);
      } 
     
      
     
      fetchFilters();
      checkSubscriptionStatus();
      if (id && id!='draft') {
        setListingId(id);
        getListingDetails();
      }else{
        fetchFilters();
      }
    }, [id]);

  const ProfilePhotoProps = {
    name: "file",
    multiple: false,
    action: "",
    listType: "picture",
    onChange(info) {
      setUploadProfileFiles(info.fileList);
    },
    onDrop(e) {
      setUploadProfileFiles(e.dataTransfer.files);
    },
  };
  const listingProps = {
    name: "file",
    multiple: true,
    listType: "picture",
    action: "",
    onChange(info) {
      setUploadListingFiles(info.fileList);
    },
    onDrop(e) {
      setUploadListingFiles(e.dataTransfer.files);
    },

  };

  
  
  const onFinish = async (values) => {
    let data = values;
    data.recommended = recommended;
    data.service_type = serviceType;
    data.activation = 'No';
    data.isDraft = isDraft;
    data.userCall = 'YES';
    data.user_id = user?.id;
    let formData = new FormData();

    // Append all form data (values)
    for (let key in data) {
      if(data !== 'undefined' && data !== undefined){

        formData.append(key, values[key]);
      }else{
        
        formData.append(key, '');
      }
    }

    // Check if we have files and append them to FormData
    if (uploadProfileFiles.length > 0) {
      uploadProfileFiles.forEach(file => {
        formData.append("profile_image[]", file.originFileObj); // 'images[]' for multiple files
      });
    }

    
    // Check if we have files and append them to FormData
    if (uploadListingFiles.length > 0) {
      uploadListingFiles.forEach(file => {
        formData.append("listing_images[]", file.originFileObj); // 'images[]' for multiple files
      });
    }
    try {
      
    setLoading(true);
      if(!details){
        const addListing = await listingService.create( formData);
        setLoading(false);
        message.success('Listing added '+( isDraft ? ' as draft ':'')+' successfully!');
        if(toMove){
          if(!id || id=='draft'){
            
              router.push('/account/listing/'+addListing?.data?.id)
            
          }
          moveForward(2)
          localStorage.setItem('toPayId',addListing?.data?.id);
        }else{
          
        router.push("/account/listing/"+addListing?.data?.id);
        }
        
        // router.push("/account?tab=listing");
        
      }else{
        const updateListing = await listingService.update(details?.id, formData);
        setLoading(false);
        message.success('Listing updated successfully!');
        if(toMove){
          if(!id || id=='draft'){
            
            router.push('/account/listing/'+updateListing?.data?.id)
          
        }
          moveForward(2)
          localStorage.setItem('toPayId',updateListing?.data?.id);
        }else{
          
        router.push("/account/listing/"+updateListing?.data?.id);
        }
      }
   
    } catch (error) {
      setLoading(false);
      if(error){
        message.error('Failed to save listing.');
        console.error('Update Error:', error);

      }
    }
  };

  const moveToPayment =() =>{
    moveForward(2)
    localStorage.setItem('toPayId',id ? id: setListingId);
  }

  
  const handleDelete = async (id) => {
    try {
      if(id){
        // Replace this with your delete logic, e.g., an API call
        const deletedListing = await listingService.delete(id);
        // Simulate a successful delete
        message.success('Listing deleted successfully!');
        router.push('/listings');
      }
  
    } catch (error) {
      message.error('Failed to delete the item.');
    }
  };

  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Account",
      href: "/",
    },
    {
      title: "Create Listing",
    },
  ];

  return (
    <div className="flex justify-center bg-[#FCFCFD] sm:bg-white shadow-[2px_4px_8px_0px_#0000001A]">
      <div className="max-w-[1440px] w-full">
        <div className="px-6 py-8 md:p-16">
          <div className="flex flex-col gap-[60px] md:gap-10">
            <div className="flex flex-col gap-6 pt-10 md:pt-0">
              <div className="block md:hidden">
                <BreadcrumbComp items={breadcrumb} />
              </div>
              <Link
                href={"/account"}
                className="py-[10px] px-4 rounded-lg gap-2 bg-white flex items-center border border-[#97B2A9] shadow-[0px_1px_2px_0px_#1018280D] w-[102px]"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20"
                    stroke="#33443C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7"
                    stroke="#33443C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="fs-14-700-lato txt-color-gray700">BACK</div>
              </Link>
            </div>
            {notificationText ? 
              <div>
                <div className={ss=='Canceled' ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative': "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"} role="alert">
                  <strong className="font-bold">{ss=='Canceled' ? 'Notification!':'Success!'}</strong>
                  <span className="block sm:inline ml-1">
                    {notificationText}
                  </span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => {setNotificationText('')}}>
                    <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <title>Close</title>
                      <path d="M10 9l-5-5m0 0l5 5m-5-5l5 5m5 5l5 5m0 0l-5-5m5 5l-5-5"/>
                    </svg>
                  </span>
                </div>
              </div>
                    :<></>}
            <div className="px-0 md:px-8 flex flex-col gap-6">
              <div className="pb-5 flex justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="fs-20-700-lato txt-color-darkgray">
                    Add Listing
                  </div>
                  <div className="fs-16-400-lato txt-color-gray1000">
                    Update your photo and personal details here.
                  </div>
                </div>
                <div className="hidden md:flex gap-3">
                {/* {!subscriptionStatus ? 
                  
                    <button className="h-[41px] fs-14-700-lato txt-color-gray700 py-[10px] px-4 rounded-lg border border-[#97B2A9] shadow-[0px_1px_2px_0px_#1018280D]"
                     htmlType="button"
                     type="button"
                     onClick={()=>saveDraft(false)}
                    >
                      SAVE AS A DRAFT
                    </button>
                :''} */}
                {subscriptionStatus ?
                    <button
                      className="h-[41px] fs-14-700-lato text-white py-[10px] px-4 rounded-lg sec-btn  border border-[#78B6B6] shadow-[0px_1px_2px_0px_#1018280D]"
                       htmlType="button"
                       type="button"
                       disabled={loading}
                       onClick={()=>saveListing()}
                    >
                      {loading? 'Saving...':'PREVIEW & SUBMIT LISTING'}
                    </button>
                :''}
               
                  </div>
                
               
              </div>
              <Form
                className="myform"
                name="listing-form"
                onFinish={onFinish}
                form={form}
                ref={formRef} 
                layout="horizontal"
                validateMessages={validateMessages}
                encType="multipart/form-data"
              >
                <Form.Item
                  name={["title"]}
                  label="Listing Title"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  colon={false}
                >
                  <Input
                    className="py-[10px] px-[14px] rounded-lg shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9] w-full md:w-1/2"
                    placeholder="Listing Title"
                  />
                </Form.Item>
                <Form.Item
                  name={["category"]}
                  label="Category"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  colon={false}
                >
                  <Select
                    options={[
                      {title:"Therapists",value:"Therapists"},
                      {title:"Agencies",value:"Agencies"},
                    ]}
                    className=" rounded-lg w-full md:!w-1/2 h-[44px] shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9] listing-select-box"
                    placeholder="Select a Category"
                  />
                </Form.Item>
                <Form.Item
                  name={["service_type"]}
                  label="Service Type"
                  className="listing_form_item pb-1"
                  rules={[
                    // {
                    //   required: true,
                    // },
                  ]}
                  colon={false}
                >
                  <div className="flex gap-1.5">
                    <div
                      className={`flex items-center justify-between py-[10px] px-[14px] w-[187px] md:w-[250px] rounded-lg shadow-[0px_1px_2px_0px_#1018280D] border ${
                        serviceType === "IN CALL"
                          ? "border-[#2F464B]"
                          : "border-[#97B2A9]"
                      }`}
                      onClick={() => handleChangeServiceType("IN CALL")}
                    >
                      <div className="fs-16-400-lato txt-color-gray500">
                        IN CALL
                      </div>
                      <Checkbox
                        checked={serviceType === "IN CALL"}
                        className="listing-service-type-checkbox"
                        
                      ></Checkbox>
                    </div>
                    <div
                      className={`flex items-center justify-between py-[10px] px-[14px] w-[187px] md:w-[250px] rounded-lg shadow-[0px_1px_2px_0px_#1018280D] border ${
                        serviceType === "OUT CALL"
                          ? "border-[#2F464B]"
                          : "border-[#97B2A9]"
                      }`}
                      onClick={() => handleChangeServiceType("OUT CALL")}
                    >
                      <div className="fs-16-400-lato txt-color-gray500">
                        OUT CALL 
                      </div>
                      <Checkbox
                        className="listing-service-type-checkbox"
                        checked={serviceType === "OUT CALL"}
                        
                      ></Checkbox>
                    </div>
                  </div>
                </Form.Item>
                {serviceType == 'OUT CALL' ?
                <Form.Item
                  name={["outcall_locations"]}
                  label="Outcall Locations"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  colon={false}
                >
                  <Select
                    mode="multiple"
                    options={locations.map(sub => ({
                      label: sub.value,
                      value: sub.key
                    }))}
                    defaultValue={selectedOutCallLocations}
                    className=" rounded-lg w-full md:!w-1/2 min-h-[44px] listing-select-box shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
                    placeholder="Select locations"
                    onChange={(newSelectedValues) => {
                      console.log(newSelectedValues)
                      setSelectedOutCallLocations(newSelectedValues);
                    }}
                  />
                </Form.Item>   :<></>}
              
                <Form.Item
                  name={["description"]}
                  colon={false}
                  label="Description"
                  extra="Write a short introduction."
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <QuillNoSSRWrapper
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    // onChange={handleChange}
                    // value={text}
                    // onPaste={handlePaste}
                    placeholder="Write your description here..."
                  />
                  {/* <Input.TextArea
                style={{
                  height: 127,
                  resize: "none",
                }}
                className="rounded-lg w-full md:!w-1/2 h-[44px] listing-select-box shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
                placeholder="Write your description here..."
                maxLength={277}
              /> */}
                {/* <div
                  style={{
                    color: cleanHTML(text).length === maxLength || cleanHTML(text).length > maxLength ? 'red' : '#667085',
                    marginTop: '5px',
                    fontSize: '14px',
                  }}
                >
                  {cleanHTML(text).length === maxLength || cleanHTML(text).length > maxLength  ? '0 characters left' : `${maxLength - cleanHTML(text).length} characters left`}
                </div> */}
                </Form.Item>
                
                <Form.Item
                  name={["services"]}
                  label="Services"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  colon={false}
                >
                  <Select
                    mode="multiple"
                    options={services.map(sub => ({
                      label: sub.value,
                      value: sub.key
                    }))}
                    defaultValue={selectedServices}
                    onChange={(newSelectedValues) => {
                      console.log(newSelectedValues)
                      setSelectServices(newSelectedValues);
                    }}
                    className=" rounded-lg w-full md:!w-1/2 min-h-[44px] listing-select-box shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
                    placeholder="Select services"
                  />
                </Form.Item>

                <div className="border border-[#F2F4F7] mb-7"></div>
                <div className="flex flex-col gap-1">
                  <div className="fs-20-700-lato txt-color-gray">
                    Contact Details
                  </div>
                  <div className="fs-16-400-lato txt-color-gray600 mb-5">
                    Add your contact Details
                  </div>
                </div>

                <div className="border border-[#F2F4F7] mb-7"></div>

                <Form.Item
                  name={["post_code"]}
                  label="Post Code"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  colon={false}
                >
                  <Input
                    className="py-[10px] px-[14px] rounded-lg w-full md:w-1/2 shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
                    placeholder="Address"
                  />
                </Form.Item>
                <Form.Item
                  name={["listing_region_id"]}
                  label="Listing Region"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  colon={false}
                >
                  <Select
                    options={regions.map(sub => ({
                      label: sub.value,
                      value: sub.key
                    }))}
                    defaultValue={selectedRegion}
                  
                    onChange={(value) => {
                      setSelectedRegion(value); // Update selected key in state
                    }}
                    className=" rounded-lg w-full md:!w-1/2 h-[44px] listing-select-box shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
                    placeholder="Select a region"
                  />
                </Form.Item>
                <Form.Item
                  name={["listing_phone"]}
                  label="Listing Phone"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern: ukPhoneRegex,
                      message: "Please enter a valid UK phone number i.e. +447123456789",
                    },
                  ]}
                  colon={false}
                >
                  <Input
                    className="py-[10px] px-[14px] rounded-lg w-full md:w-1/2 shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
                    placeholder="Phone Number"
                  />
                </Form.Item>
                <Form.Item
                  name={["listing_email"]}
                  label="Listing Email"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern: emailRegex,
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input
                    className="py-[10px] px-[14px] rounded-lg w-full md:w-1/2 shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name={["listing_website"]}
                  label="Listing Website Link"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  colon={false}
                >
                  <Input
                    className="py-[10px] px-[14px] rounded-lg w-full md:w-1/2 shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
                    placeholder="https://"
                  />
                </Form.Item>
                <Form.Item
                  name={["video_url"]}
                  label="Video URL"
                  className="listing_form_item pb-1"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  colon={false}
                >
                  <Input
                    className="py-[10px] px-[14px] rounded-lg w-full md:w-1/2 shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
                    placeholder="https://"
                  />
                </Form.Item>

                <div className="border border-[#F2F4F7] mb-7"></div>

                <div className="mb-7 flex flex-col md:flex-row">
                  <label className="flex flex-col gap-1 mb-8 md:mb-0">
                    <span className="fs-14-600-lato txt-color-gray700">
                      Profile photo
                    </span>
                    <span className="fs-14-400-lato txt-color-gray1000">
                      This will be displayed on your profile.
                    </span>
                  </label>
                  <Dragger
                    {...ProfilePhotoProps}
                    className="w-full md:w-[246px] border-0 bg-white rounded-lg listing-upload-photo"
                  >
                    <div className="ant-upload-drag-icon w-10 h-10 md:w-[80px] md:h-[72px] p-0 md:py-4 md:px-6 border-0 md:border md:border-[#97B2A9] rounded-full md:rounded-lg flex justify-center items-center bg-[#F9FAFB] md:bg-transparent">
                      <Image
                        src={cameraIcon}
                        alt="upload profile photo"
                        className="hidden md:block"
                      />
                      <Image
                        src={uploadIcon}
                        alt="upload profile photo"
                        className="block md:hidden"
                      />
                    </div>
                    <div className="ant-upload-text flex flex-col gap-1">
                      <div className="fs-14-400-lato txt-color-gray1000">
                        <span className="fs-14-600-lato txt-color-darkgray">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </div>
                      <div className="fs-12-400-lato txt-color-gray1000">
                        SVG, PNG, JPG (max. 800x400px)
                      </div>
                    </div>
                  </Dragger>
                  <Space>
                    {alreadyUploadProfileFiles.map((file) => (
                      <div key={file.name} >
                        <img src={file.url} alt={file.name} style={{ width: 100, height: 100, borderRadius: '5px', objectFit: 'cover' }} />
                        <div className="flex justify-center mt-1"   >
                          <Button
                          type="button"
                          htmlType="button"
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={() => handleRemoveProfile(file)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Space>
                </div>

                <div className="border border-[#F2F4F7] mb-7"></div>

                <div className="mb-7 flex flex-col md:flex-row">
                  <label className="flex flex-col gap-1 mb-8 md:mb-0">
                    <span className="fs-14-600-lato txt-color-gray700">
                      Listing Images
                    </span>
                    <span className="fs-14-400-lato txt-color-gray1000">
                      Share a few images.
                    </span>
                  </label>
                  <Dragger
                    {...listingProps}
                    className="w-full md:w-[246px] border-0 bg-white rounded-lg listing-upload-photo"
                  >
                    <div className="ant-upload-drag-icon w-10 h-10 md:w-[80px] md:h-[72px] p-0 md:py-4 md:px-6 border-0 md:border md:border-[#97B2A9] rounded-full md:rounded-lg flex justify-center items-center bg-[#F9FAFB] md:bg-transparent">
                      <Image
                        src={cameraIcon}
                        alt="upload profile photo"
                        className="hidden md:block"
                      />
                      <Image
                        src={uploadIcon}
                        alt="upload profile photo"
                        className="block md:hidden"
                      />
                    </div>
                    <div className="ant-upload-text flex flex-col gap-1">
                      <div className="fs-14-400-lato txt-color-gray1000">
                        <span className="fs-14-600-lato txt-color-darkgray">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </div>
                      <div className="fs-12-400-lato txt-color-gray1000">
                        SVG, PNG, JPG (max. 800x400px)
                      </div>
                    </div>
                  </Dragger>
                  
                  <Space>
                    {alreadyUploadListingFiles.map((file) => (
                      <div key={file.name} >
                        <img src={file.url} alt={file.name} style={{ width: 100, height: 100, borderRadius: '5px', objectFit: 'cover' }} />
                        <div className="flex justify-center mt-1"   >
                          <Button
                        type="button"
                        htmlType="button"
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={() => handleRemoveListing(file)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Space>
                </div>

                <div className="border border-[#F2F4F7] mb-4"></div>
                {!subscriptionStatus ? 
                  <div className="flex justify-center md:justify-end gap-3 mb-10 md:mb-0">
                    <button
                    onClick={()=>{saveDraft(false)}}
                     htmlType="button"
                     disabled={loading}
                     type="button"
                    className="w-full md:w-auto min-h-[40px] fs-14-700-lato txt-color-gray700 py-[10px] px-4 rounded-lg border border-[#97B2A9] shadow-[0px_1px_2px_0px_#1018280D]">
                     {loading? 'Saving...':'SAVE AS A DRAFT'} 
                    </button>
                  
                    {(listingId !='draft' && listingId) || (id && id !='draft') ? 
                      <button
                      type="button"
                      disabled={listingId || id ? false:true}
                      onClick={()=>{ moveForward(2);}}
                        className="w-full md:w-auto min-h-[40px] fs-14-700-lato text-white py-[10px] px-4 rounded-lg sec-btn border border-[#78B6B6] shadow-[0px_1px_2px_0px_#1018280D]"
                        htmlType="button"
                      >
                        NEXT
                      </button>
                    :<></>}
                   
                  </div>
                  :<></>}
               
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstListingStepper;
