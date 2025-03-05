import Link from "next/link";
import React, { useEffect, useState ,useRef } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Button, Form, Input, InputNumber, message } from "antd";
import BreadcrumbComp from "../Breadcrumb";
import DeleteAccountConfirmation from "../Modals/DeleteAccountConfirmation";
import AccountListing from "./AccountListing";
import useStore from "@/store";
import accountService from "@/services/accountService";
import { useRouter } from "next/router";
import listingService from "@/services/listingService";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

function AccountContent() {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const phoneRegex = /^\+?\d{1,3}?[-. ]?\(?\d{1,4}\)?[-. ]?\d{1,4}[-. ]?\d{1,9}$/
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const { logout } = useStore();
  const formRef = useRef(null); 
  const router = useRouter();
  const { tab } = router.query;
  const  setToken  = useStore((state) => state.setToken);
  const  setUser  = useStore((state) => state.setUser);
  var user = useStore((state) => state.user);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };


  const [selectedTab, setSelectedTab] = useState(tab === 'listing' ? 1 : 0); // Default to "My Listings" tab if tab is "listing"

  // Function to handle tab change
  const handleTabChange = (index) => {
    setSelectedTab(index);
  };
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Account",
    },
  ];

  const checkStatus = async() =>{
    try{
      const response  = await accountService.checkUserStatus({user_id:user.id});
      if(response){
        if(!response.success){
          logout();
      
        }
      }
    } catch (error) {

    }
  }
  useEffect(()=>{
    if(!user){
      logout();
    }
    checkStatus()
    setInterval(() => {
      
      checkStatus();

    }, 10000);
  
    getMyListings();
    form.setFieldsValue({
      first_name: user.first_name,
      last_name:user.last_name,
      email:user.email,
      phone:user.phone
    })
  },[])

  const triggerFormSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Programmatically submit the form
    }
  };

  const getMyListings = async (filters=null) =>{
    try {
      setLoading(true);
      const response = await listingService.myListings({user_id:user.id});
      if(response.success && response.data){
        console.log(response.data)
        setMyListings(response.data);
      } 
    } catch (error) {
      // message.error('Failed to save changes.');
    }finally{
      setLoading(false)
    }
  }

  const onFinishProfile = async (values) => {
    let data = values;
   
    if(user?.id){
      data.user_id = user?.id;
    }else{
      logout()
    }
    
    try {
      setLoadingProfile(true)
      const response = await accountService.updateProfile( data);
      setLoadingProfile(false)
      if(!response.success){
        message.error(response.message);
      }else{
        user = response.data.user;
        setUser(response.data.user)
        setToken(response.data.token)
        message.success('Profile changes saved!');
        
      }
         
    } catch (error) {
      setLoadingProfile(false)
      message.error('Failed to save changes.');
    }
  };

  
  const onFinishPassword = async (values) => {
    let data = values;
   
    if(user?.id){
      data.user_id = user?.id;
    }else{
      logout()
    }
    
    if(values.new_password != values.confirm_password){
      message.error('Password and confirm password must match!');
      return;
    }
    try {
      setLoadingPassword(true)
      const response = await accountService.updatePassword( data);
      setLoadingPassword(false)
      if(!response.success){
        message.error(response.message);
      }else{

        message.success('Password changed!');
        form2.resetFields();
      }
         
    } catch (error) {
      setLoadingPassword(false)
      message.error('Failed to change password.');
    }
  };

  return (
    <div className="flex justify-center bg-[#FCFCFD] sm:bg-white shadow-[2px_4px_8px_0px_#0000001A]">
      <div className="max-w-[1440px] w-full">
        <div className="px-6 py-8 md:p-16">
          <div className="flex flex-col gap-6 pt-10 md:pt-0 mb-[60px] md:mb-0">
            <div className="block md:hidden">
              <BreadcrumbComp items={breadcrumb} />
            </div>
          </div>
          <div className="hidden md:flex gap-6 items-center justify-between mb-6 pt-[60px] md:pt-0">
            <div className="fs-40-700-cabinet txt-color-darkgray">My Account</div>
            <Link
              href={"/account/listing/draft"}
              className="min-h-[40px] flex items-center justify-center fs-16-700-lato text-white py-2 px-4 rounded-lg sec-btn "
            >
              CREATE NEW LISTING
            </Link>
          </div>

          <TabGroup selectedIndex={selectedTab} onChange={handleTabChange}>
            <TabList
              className={`hidden md:flex gap-6 py-3 px-2 border border-[#97B2A9] rounded-lg bg-white mb-10 overflow-x-auto xl:overflow-x-hidden`}
            >
              <Tab className="flex items-center gap-2.5 py-3 px-4 rounded-md min-w-fit md:min-w-[306px] txt-color-darkgray data-[selected]:bg-[#F2F4F7] data-[selected]:border data-[selected]:border-[#97B2A9] focus-visible:outline-0 hover:!transform-none hover:!shadow-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00127 22L8.75064 18.4911C8.61589 16.6046 10.11 15 12.0012 15C13.8925 15 15.3866 16.6046 15.2519 18.4911L15.0012 22" stroke="#2F464B" stroke-width="1.5"/>
                <path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.617 2 12 2C13.3831 2 14.5817 2.86667 16.979 4.6L18.4189 5.64106C20.346 7.03443 21.3096 7.73112 21.7439 8.74938C22.1782 9.76763 22.0017 10.9162 21.6486 13.2135L21.3476 15.1724C20.8472 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5537 22 13.1388 22H10.8612C7.44634 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z" stroke="#2F464B" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>

                <span className="fs-16-500-lato"> My Account</span>
              </Tab>
              <Tab className="flex items-center gap-2.5 py-3 px-4 rounded-md min-w-fit md:min-w-[306px] txt-color-darkgray data-[selected]:bg-[#F2F4F7] data-[selected]:border data-[selected]:border-[#97B2A9] focus-visible:outline-0 hover:!transform-none hover:!shadow-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#2F464B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <span className="fs-16-500-lato"> My Listings </span>
              </Tab>
              <Tab
                onClick={handleOpenDeleteModal}
                className="flex items-center gap-2.5 py-3 px-4 rounded-md min-w-fit md:min-w-[306px] txt-color-darkgray data-[selected]:bg-[#F2F4F7] data-[selected]:border data-[selected]:border-[#97B2A9] focus-visible:outline-0 hover:!transform-none hover:!shadow-none"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.25 4.58325L15.7336 12.9375C15.6016 15.0719 15.5357 16.1392 15.0007 16.9065C14.7361 17.2858 14.3956 17.606 14.0006 17.8466C13.2017 18.3333 12.1325 18.3333 9.99392 18.3333C7.8526 18.3333 6.78192 18.3333 5.98254 17.8457C5.58733 17.6047 5.24667 17.2839 4.98223 16.9039C4.4474 16.1354 4.38287 15.0667 4.25384 12.9293L3.75 4.58325" stroke="#2F464B" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M2.5 4.58341H17.5M13.3797 4.58341L12.8109 3.40986C12.433 2.6303 12.244 2.24051 11.9181 1.99742C11.8458 1.9435 11.7693 1.89553 11.6892 1.854C11.3283 1.66675 10.8951 1.66675 10.0287 1.66675C9.14067 1.66675 8.69667 1.66675 8.32973 1.86185C8.24842 1.90509 8.17082 1.955 8.09774 2.01106C7.76803 2.264 7.58386 2.66804 7.21551 3.47613L6.71077 4.58341" stroke="#2F464B" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M7.91797 13.75V8.75" stroke="#2F464B" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M12.082 13.75V8.75" stroke="#2F464B" stroke-width="1.5" stroke-linecap="round"/>
                </svg>

                <span className="fs-16-500-lato"> Delete Account </span>
              </Tab>
              <Tab
                className="flex items-center gap-2.5 py-3 px-4 rounded-md min-w-fit md:min-w-[306px] txt-color-darkgray data-[selected]:bg-[#F2F4F7] data-[selected]:border data-[selected]:border-[#97B2A9] focus-visible:outline-0 hover:!transform-none hover:!shadow-none"
                onClick={() => logout()}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 25.5H12.1667C11.7246 25.5 11.3007 25.3244 10.9882 25.0118C10.6756 24.6993 10.5 24.2754 10.5 23.8333V12.1667C10.5 11.7246 10.6756 11.3007 10.9882 10.9882C11.3007 10.6756 11.7246 10.5 12.1667 10.5H15.5M21.3333 22.1667L25.5 18M25.5 18L21.3333 13.8333M25.5 18H15.5" stroke="#2F464B" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>


                <span className="fs-16-500-lato"> Logout </span>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
            
                <div className="flex flex-col gap-10 md:gap-6 px-0 md:px-8">
                  <Form
                    form={form}
                    ref={formRef}
                    className="myform"
                    name="myaccount-form"
                    onFinish={onFinishProfile}
                    layout="horizontal"
                    validateMessages={validateMessages}
                  >
                    <div className="flex justify-between gap-4 pb-5 border-b border-[#F2F4F7]">
                    
                      <div className="flex flex-col gap-1">
                        <div className="fs-20-700-lato txt-color-darkgray">
                          Personal info
                        </div>
                        <div className="fs-16-400-lato txt-color-gray1000">
                          Update your photo and personal details here.
                        </div>
                      </div>
                      <div className="hidden md:flex gap-3 ">
                        <Form.Item className="mb-0">
                          <Link href={'/'}>
                            <Button
                              type="button"
                            className="h-[41px] fs-14-700-lato txt-color-gray700 py-2.5 px-4 rounded-lg bg-white border border-[#97B2A9] shadow-[0px_1px_2px_0px_#1018280D]"
                              htmlType="button"
                            >
                              CANCEL
                            </Button>
                          </Link>
                        </Form.Item>
                        <Form.Item className="mb-0">
                          <Button
                          disabled={loadingProfile}
                            type="button"
                          className="h-[41px] fs-14-700-lato text-white py-2.5 px-4 rounded-lg bg-[#2F464B] border border-[#2F464B]"
                            htmlType="submit"
                          >
                            {loadingProfile ? 'Saving...':'SAVE'}
                          </Button>
                        </Form.Item>
                        
                      </div>
                        
                    </div>
                    <div className="flex flex-col pt-5 gap-5">
                    
                      <div className="grid grid-cols-1 gap-5">
                        <Form.Item
                          name={["first_name"]}
                          label="First Name"
                          className="myaccount-form-item mb-0"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          colon={false}
                        >
                            <Input
                              className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9] md:w-2/5  txt-color-darkgray"
                              placeholder="James"
                            />
                        </Form.Item>
                        <Form.Item
                          name={["last_name"]}
                          label="Last Name"
                          className="myaccount-form-item mb-0"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          colon={false}
                        >
                            <Input
                              className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9] md:w-2/5   txt-color-darkgray"
                              placeholder="Bond"
                            />
                        </Form.Item>
                        <Form.Item
                          name={["email"]}
                          label="Email address"
                        
                          className="myaccount-form-item mb-0"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          colon={false}
                        >
                          <Input
                            type="email"
                            readOnly={true}
                            className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9] md:w-2/5   txt-color-darkgray"
                            placeholder="company@example.com"
                            prefix={
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2"
                              >
                                <path
                                  d="M18.3346 4.99992C18.3346 4.08325 17.5846 3.33325 16.668 3.33325H3.33464C2.41797 3.33325 1.66797 4.08325 1.66797 4.99992M18.3346 4.99992V14.9999C18.3346 15.9166 17.5846 16.6666 16.668 16.6666H3.33464C2.41797 16.6666 1.66797 15.9166 1.66797 14.9999V4.99992M18.3346 4.99992L10.0013 10.8333L1.66797 4.99992"
                                  stroke="#98A2B3"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            }
                          />
                        </Form.Item>

                        <Form.Item
                          name={["phone"]}
                          label="Phone Number"
                          className="myaccount-form-item mb-0"
                          rules={[
                            {
                              required: true,
                            },
                            {
                              pattern: phoneRegex,
                              message:'Enter a valid phone number'
                            }
                          ]}
                          colon={false}
                        >
                          <Input
                            className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] txt-color-darkgray border border-[#97B2A9] md:w-2/5   txt-color-darkgray"
                            placeholder="+1 301 456 789"
                          />
                        </Form.Item>
                      </div>
                    </div>
                      
                  </Form>
                  <div className="border border-[#F2F4F7]"></div>
                    
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between gap-4 pb-5 border-b border-[#F2F4F7]">
                        <div className="flex flex-col gap-1">
                          <div className="fs-20-700-lato txt-color-darkgray">
                            Password Details
                          </div>
                          <div className="fs-16-400-lato txt-color-gray1000">
                            Change your password here
                          </div>
                        </div>
                      </div>
                      <Form
                        form={form2}
                        ref={formRef}
                        className="myform"
                        name="myaccount-form"
                        onFinish={onFinishPassword}
                        layout="horizontal"
                        validateMessages={validateMessages}
                      >
                        <div className="grid grid-cols-1 gap-5 mb-5">
                          <Form.Item
                            name={["current_password"]}
                            label="Current Password"
                            className="myaccount-form-item mb-0"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            colon={false}
                          >
                            <Input.Password
                              className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9] md:w-2/5"
                              placeholder="Enter your password"
                            />
                          </Form.Item>
                          <Form.Item
                            name={["new_password"]}
                            label="New Password"
                            className="myaccount-form-item mb-0"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            colon={false}
                          >
                            <Input.Password
                              className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9] md:w-2/5"
                              placeholder="Enter new password"
                            />
                          </Form.Item>
                          <Form.Item
                            name={["confirm_password"]}
                            label="Confirm Password"
                            className="myaccount-form-item mb-0"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            colon={false}
                          >
                            <Input.Password
                              className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9] md:w-2/5"
                              placeholder="Confirm new password"
                            />
                          </Form.Item>
                        </div>
                    
                        <Form.Item className="mb-0">
                          <Button
                            type="button"
                            disabled={loadingPassword}
                            className=" fs-14-700-lato text-white flex items-center justify-center py-[10px] h-[41px] px-4 rounded-md sec-btn border border-[#78B6B6] shadow-[0px_1px_2px_0px_#1018280D]"
                            htmlType="submit"
                          >
                            {loadingPassword ? 'Saving...':'CHANGE PASSWORD'}
                          </Button>
                        </Form.Item>
                      </Form>

                      <div className="border border-[#F2F4F7]"></div>
                      <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <div className="fs-20-700-lato txt-color-darkgray">
                            Account Deletion
                          </div>
                          <div className="fs-16-400-lato txt-color-gray1000">
                            I want to delete my account.
                          </div>
                        </div>
                      </div>
                      <button    onClick={handleOpenDeleteModal} className="fs-14-700-lato txt-color-gray700 flex items-center justify-center py-[10px] px-4 rounded-md bg-white border border-[#78B6B6] shadow-[0px_1px_2px_0px_#1018280D] w-[160px]">
                        DELETE ACCOUNT
                      </button>

                      <div className="border border-[#F2F4F7]"></div>
                    </div>
                  
                  {/* <div className=" pt-4 flex justify-end gap-3 mb-10 md:mb-0">
                    <Link href={'/'}>
                      <Button
                        type="button"
                        className="h-[41px] fs-14-700-lato txt-color-gray700 py-2.5 px-4 rounded-lg bg-white border border-[#97B2A9] shadow-[0px_1px_2px_0px_#1018280D] w-full md:w-auto"
                        htmlType="button"
                      >
                        CANCEL
                      </Button>
                    </Link>
                    <Button
                      onClick={triggerFormSubmit} 
                      type="button"
                      className="h-[41px] fs-14-700-lato text-white py-2.5 px-4 rounded-lg sec-btn border border-[#78B6B6] w-full md:w-auto"
                      htmlType="button"
                    >
                      SAVE CHANGES
                    </Button>
                    
                  </div> */}
                  
                </div>
                
              </TabPanel>
              <TabPanel>
                <AccountListing loading={loading} myListings={myListings} setSelectedTab={setSelectedTab} />
              </TabPanel>
              {/* <TabPanel>Content 3</TabPanel> */}
              {/* <TabPanel>Content 4</TabPanel> */}
            </TabPanels>
          </TabGroup>
          {openDeleteModal && (
            <DeleteAccountConfirmation
              user={user}
              isModalOpen={openDeleteModal}
              handleOk={() => {}}
              handleCancel={handleCloseDeleteModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountContent;
