import React, { useState,useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from "@headlessui/react";
import dropdownIcon from "../../assets/icons/dropdown-icon.png";
import mobileNavbarIcon from "../../assets/icons/new-menu-mobile-icon.svg";
import userIcon from "../../assets/models/no-profile-icon.jpg";
import logo from "../../assets/images/m-massage-logo.png";
import Image from "next/image";
import { navigation } from "@/utils/navbarData";
import Link from "next/link";
import DeleteAccountConfirmation from "../Modals/DeleteAccountConfirmation";
import useStore from "@/store";
import { Popover } from "antd";
import { useRouter } from 'next/router';
import Head from "next/head";
import settingService from "@/services/settingService";
import { IMAGES_PATH } from "@/config/constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { isAuthenticated, logout } = useStore();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [hasClass, setHasClass] = useState(true);

  const user = useStore((state) => state.user);
  const router = useRouter();
  const isHomepage = router.pathname === '/';

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  var [setting,setSetting] = useState(null);

  const fetchDetail = async () =>{
    
    try {
    
      var data = null;
      
      data = await settingService.getSiteSetting();
      
      if(data){
        setSetting(data.data);
        localStorage.setItem('settings',JSON.stringify(data.data))
        
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      // setLoading(false);
    }
  
  }

  useEffect(() => {

    if(!setting && localStorage.getItem('settings')){
      setSetting(JSON.parse(localStorage.getItem('settings')));

    }
    fetchDetail();
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setHasClass(false);
      }else{
        
        setHasClass(true);
      }
    };

    // Set initial items per page
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
   
    <Head>
    
      {setting?.description &&  setting?.description!='null'? 
        <meta name="description" content={setting?.description} />
      :''}
      {setting?.meta_keywords &&  setting?.meta_keywords!='null'? 
        <meta name="keywords" content={setting?.meta_keywords} />
      :''}
      {setting?.canonical_url &&  setting?.canonical_url!='null'? 
        <link rel="canonical" href={setting?.canonical_url} />
      :''}
      {setting?.country &&  setting?.country!='null'? 
        <meta name="country" content={setting?.country}></meta>
      :''}
      {setting?.geo_country &&  setting?.geo_country!='null'? 
        <meta name="geo.country" content={setting?.geo_country}></meta>
      :''}
       {setting?.author &&  setting?.author!='null'? 
        <meta name="author" content={setting?.author}></meta>
      :''}
     
      <meta http-equiv="content-language" content="en"></meta>
    </Head>
      <div className="flex justify-center border-b border-[#D0D5DD]">
        <div className="max-w-[1440px] w-full">
          <Disclosure
            as="nav"
            className={hasClass && isHomepage  ? 'nav-div px-[20px] pt-[24px] pb-[12px] md:px-[64px] md:py-[5px] border-b border-[#D0D5DD] shadow-[0px_3px_8px_0px_#0000001A] lg:shadow-none fixed-header ':'nav-div px-[20px] pt-[24px] pb-[12px] md:px-[64px] md:py-[5px] shadow-[0px_3px_8px_0px_#0000001A] lg:shadow-none'} 
          >
            <div className="md:mx-auto">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex md:flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {isAuthenticated ? (
                      <>
                        <div className="block md:hidden">
                          <Menu>
                            <MenuButton
                              as="div"
                              className={`hover:!transform-none hover:!shadow-none`}
                            >
                              <Image
                                src={userIcon}
                                className="h-14 w-14 rounded-full"
                                alt="user"
                              />
                            </MenuButton>
                            <MenuItems
                              anchor="bottom"
                              className={`py-[22px] px-3 rounded-md border-2 border-[#97B2A9] bg-white w-[264px]`}
                            >
                              <MenuSection
                                className={`flex flex-col gap-6 py-3 px-2 rounded-lg border border-[#97B2A9]`}
                              >
                                <MenuItem
                                  as={"div"}
                                  className={"flex items-center gap-8"}
                                >
                                  <Image
                                    src={userIcon}
                                    className="h-14 w-14 rounded-full"
                                    alt="user"
                                  />
                                  <div className="fs-16-700-lato txt-color-gray600">
                                    {user.first_name} {user.last_name}
                                  </div>
                                </MenuItem>
                                <MenuSeparator
                                  className={"h-[1px] bg-[#97B2A9]"}
                                />
                                <MenuItem>
                                  <Link
                                    href={"/account/listing/draft"}
                                    className="h-[37px] fs-14-700-lato text-white py-2 px-4 rounded-lg sec-btn border border-[#78B6B6] w-full md:w-auto"
                                  >
                                    CREATE NEW LISTING
                                  </Link>
                                </MenuItem>
                                <MenuSeparator
                                  className={"h-[1px] bg-[#97B2A9]"}
                                />
                                <MenuItem
                                  as={"a"}
                                  className={
                                    "flex items-center gap-[10px] py-2 px-4 txt-color-darkgray"
                                  }
                                  href="/account"
                                >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.99956 22L8.74893 18.4911C8.61418 16.6046 10.1083 15 11.9995 15C13.8908 15 15.3849 16.6046 15.2502 18.4911L14.9995 22" stroke="#2F464B" stroke-width="1.5"/>
                                  <path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.617 2 12 2C13.3831 2 14.5817 2.86667 16.979 4.6L18.4189 5.64106C20.346 7.03443 21.3096 7.73112 21.7439 8.74938C22.1782 9.76763 22.0017 10.9162 21.6486 13.2135L21.3476 15.1724C20.8472 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5537 22 13.1388 22H10.8612C7.44634 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z" stroke="#2F464B" stroke-width="1.5" stroke-linejoin="round"/>
                                  </svg>

                                  <span className="fs-16-500-lato">
                                    {" "}
                                    My Account
                                  </span>
                                </MenuItem>
                                <MenuItem
                                  as={"a"}
                                  className={
                                    "flex items-center gap-[10px] py-2 px-4 txt-color-darkgray"
                                  }
                                  href="/account?tab=listing"
                                >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#33443C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>

                                  <span className="fs-16-500-lato">
                                    {" "}
                                    My Listings{" "}
                                  </span>
                                </MenuItem>
                                <MenuItem
                                  as={"div"}
                                  className={
                                    "flex items-center gap-[10px] py-2 px-4 txt-color-darkgray"
                                  }
                                  onClick={handleOpenDeleteModal}
                                >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                                  <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                                  <path d="M9.5 16.5V10.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                                  <path d="M14.5 16.5V10.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                                  </svg>

                                  <span className="fs-16-500-lato">
                                    {" "}
                                    Delete Account{" "}
                                  </span>
                                </MenuItem>
                                <MenuItem
                                  as={"div"}
                                  className={
                                    "flex items-center gap-[10px] py-2 px-4 txt-color-darkgray"
                                  }
                                  onClick={() => logout()}
                                >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373V11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                                  <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>


                                  <span className="fs-16-500-lato">
                                    {" "}
                                    Logout{" "}
                                  </span>
                                </MenuItem>
                              </MenuSection>
                            </MenuItems>
                          </Menu>
                        </div>
                        <Link href={"/"} className="hidden md:block">
                          <Image
                            alt="VitalRelief"
                            src={logo}
                            className="h-[65px] w-[154px] md:w-[154px]"
                          />
                        </Link>
                      </>
                    ) : (
                      <Link href={"/"}>
                        <Image
                          alt="VitalRelief"
                          src={logo}
                          className=" h-[65px] w-[154px] md:w-[154px]"
                        />
                      </Link>
                    )}
                  </div>
                  <div className="hidden sm:ml-6 lg:flex sm:items-center">
                    <div className="flex  gap-3 sm:gap-2 xs:gap-1 ">
                      {navigation.map((item) => (
                        <>
                          {item?.subMenu?.length > 0 ? (
                            <>
                              { !hasClass ? (
                                <>
                                 
                                    {item?.subMenu?.map((subMenu, idx) => (
                                      <>
                                        <a
                                          key={subMenu.name}
                                          href={subMenu.href}
                                          aria-current={subMenu.current ? "page" : undefined}
                                          className={classNames(
                                            subMenu.current ? "" : "",
                                            "rounded"
                                          )}
                                        >
                                          
                                        <div  key={idx} className="fs-16-500-lato-2 lh-24 txt-color-gray py-2 px-3">
                                          {subMenu.name}
                                        </div>
                                        </a>
                                      </>
                                    ))}
                                </>
                              ):(
                                <>
                                <a
                                  key={item.name}
                                  href={item.href}
                                  aria-current={item.current ? "page" : undefined}
                                  className={classNames(
                                    item.current ? "" : "",
                                    "rounded"
                                  )}
                                >
                                  <div className="text-center flex justify-center items-center ml-4">
                                        <Popover
                                      arrow={false}
                                      placement="bottom"
                                      content={
                                        <div
                                          anchor="bottom center"
                                          transition
                                          className=" right-0 z-10 mt-2 w-60 origin-top-right rounded-lg sub_menu_dropshadow bg-white p-8 gap-8 flex flex-col transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                          {item?.subMenu?.map((subMenu, idx) => (
                                            <div key={idx}>
                                              <Link
                                                href={subMenu?.href}
                                                className="block px-4 py-2 "
                                              >
                                                <div className="fs-16-500-lato lh-24 txt-color-gray">
                                                  {subMenu.name}
                                                </div>
                                              </Link>
                                            </div>
                                          ))}
                                        </div>
                                      }
                                    >
                                      <div className="relative flex items-center gap-1 rounded focus:outline-none hover:!transform-none hover:!shadow-none">
                                        <div
                                          className={`hover:bg-[#F2F4F7] flex items-center gap-1 rounded py-2 px-3`}
                                        >
                                          <span className="absolute -inset-1.5" />
                                          <span className="sr-only">
                                            Open user menu
                                          </span>
                                          <div className="fs-16-500-lato-2 lh-24 txt-color-gray">
                                            {item.name}
                                          </div>
                                          <Image src={dropdownIcon} alt="menu icon" />
                                        </div>
                                      </div>
                                    </Popover>
                                    </div>
                                  </a>
                                </>
                              )}
                            </>
                           
                          ) : (
                            <a
                              key={item.name}
                              href={item.href}
                              aria-current={item.current ? "page" : undefined}
                              className={classNames(
                                item.current ? "" : "",
                                "rounded"
                              )}
                            >
                            <div className="fs-16-500-lato-2 lh-24 txt-color-gray py-2 px-3">
                              {item.name}
                            </div>
                            </a>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute flex-0 inset-y-0 right-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Link href="/login">
                    <button className="btn inline-flex items-center justify-center fs-15-600-lato text-white sec-btn py-2 mr-2 px-2 rounded-sm w-max-content ">
                      <svg width="15" height="16" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4.78906V20.7891" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4 12.7891H20" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Create Ad
                    </button>
                  </Link>
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 ">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Image
                      src={mobileNavbarIcon}
                      className="block group-data-[open]:hidden"
                      alt="open main menu"
                    />
                    {/* <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              /> */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      className="hidden group-data-[open]:block"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.334 1.6665L1.66724 20.3332M1.66724 1.6665L20.334 20.3332"
                        stroke="#1D2939"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </DisclosureButton>
                </div>
                <div className="absolute inset-y-0 right-0 lg:flex items-center pr-2 hidden">
                  {isAuthenticated ? (
                    <Menu>
                      <MenuButton
                        as="div"
                        className={`hover:!transform-none hover:!shadow-none`}
                      >
                        <Image
                          src={user.profile_photo ? IMAGES_PATH+'/'+ user.profile_photo: userIcon}
                          className="h-14 w-14 rounded-full  object-cover"
                          width={100}     
                          height={100}
                          alt="menu icon"
                        />
                      </MenuButton>
                      <MenuItems
                        anchor="bottom"
                        className={`py-[22px] px-3 rounded-md border-2 border-[#97B2A9] bg-white w-[264px]`}
                      >
                        <MenuSection
                          className={`flex flex-col gap-6 py-3 px-2 rounded-lg border border-[#97B2A9]`}
                        >
                          <MenuItem
                            as={"div"}
                            className={"flex items-center gap-8"}
                          >
                            <Image
                              src={user.profile_photo ? IMAGES_PATH+'/'+user.profile_photo: userIcon}
                              className="h-14 w-14 rounded-full  object-cover"
                              width={100}     
                              height={100}
                              alt="user icon"
                            />
                            <div className="fs-16-700-lato txt-color-gray600">
                            {user.first_name} {user.last_name}
                            </div>
                          </MenuItem>
                          <MenuSeparator className={"h-[1px] bg-[#97B2A9]"} />
                          <MenuItem>
                            <Link
                              href={"/account/listing/draft"}
                              className="button h-[37px] fs-14-700-lato text-white py-2 px-4 rounded-lg sec-btn border border-[#78B6B6] w-full md:w-auto"
                            >
                              CREATE NEW LISTING
                            </Link>
                          </MenuItem>
                          <MenuSeparator className={"h-[1px] bg-[#97B2A9]"} />
                          <MenuItem
                            as={"a"}
                            className={
                              "flex items-center gap-[10px] py-2 px-4 txt-color-darkgray"
                            }
                            href="/account"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.99956 22L8.74893 18.4911C8.61418 16.6046 10.1083 15 11.9995 15C13.8908 15 15.3849 16.6046 15.2502 18.4911L14.9995 22" stroke="#2F464B" stroke-width="1.5"/>
                            <path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.617 2 12 2C13.3831 2 14.5817 2.86667 16.979 4.6L18.4189 5.64106C20.346 7.03443 21.3096 7.73112 21.7439 8.74938C22.1782 9.76763 22.0017 10.9162 21.6486 13.2135L21.3476 15.1724C20.8472 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5537 22 13.1388 22H10.8612C7.44634 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z" stroke="#2F464B" stroke-width="1.5" stroke-linejoin="round"/>
                            </svg>

                            <span className="fs-16-500-lato"> My Account</span>
                          </MenuItem>
                          <MenuItem
                            as={"a"}
                            className={
                              "flex items-center gap-[10px] py-2 px-4 txt-color-darkgray"
                            }
                            href="/account?tab=listing"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#33443C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            <span className="fs-16-500-lato">
                              {" "}
                              My Listings{" "}
                            </span>
                          </MenuItem>
                          <MenuItem
                            as={"div"}
                            className={
                              "flex items-center gap-[10px] py-2 px-4 txt-color-darkgray"
                            }
                            onClick={handleOpenDeleteModal}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M9.5 16.5V10.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M14.5 16.5V10.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>

                            <span className="fs-16-500-lato">
                              {" "}
                              Delete Account{" "}
                            </span>
                          </MenuItem>
                          <MenuItem
                            as={"div"}
                            className={
                              "flex items-center gap-[10px] py-2 px-4 txt-color-darkgray"
                            }
                            onClick={() => logout()}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373V11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="#33443C" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="#33443C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>


                            <span className="fs-16-500-lato"> Logout </span>
                          </MenuItem>
                        </MenuSection>
                      </MenuItems>
                    </Menu>
                  ) : (
                <div className="flex items-center justify-between">
                      <Link
                        href={"/login"}
                        className="relative sec-btn flex items-center gap-2 py-2 px-3 rounded-md button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 4V20"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4 12H20"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_267_199"
                              x1="12.9746"
                              y1="12"
                              x2="12"
                              y2="12"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="white" />
                              <stop offset="1" stopColor="#C2A891" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_267_199"
                              x1="19.5932"
                              y1="12.5"
                              x2="4"
                              y2="12.5"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="white" />
                              <stop offset="1" stopColor="#C2A891" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className=" lh-24 fs-16-700-lato text-white">
                          CREATE AD
                        </div>
                    
                    
                  </Link>
                  <Link href="/login">
                    <button className=" flex items-center gap-2 py-2 btn  sec-btn  ml-15 px-4 rounded-md w-full ">
                      
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 11.385C11.1753 11.385 10.469 11.091 9.881 10.503C9.293 9.91501 8.99933 9.20901 9 8.38501C9.00067 7.56101 9.29433 6.85435 9.881 6.26501C10.4677 5.67568 11.174 5.38268 12 5.38601C12.826 5.38935 13.5323 5.68268 14.119 6.26601C14.7057 6.84935 14.9993 7.55601 15 8.38601C15.0007 9.21601 14.707 9.92201 14.119 10.504C13.531 11.086 12.8247 11.379 12 11.385ZM5 18.616V16.97C5 16.5573 5.12 16.1713 5.36 15.812C5.60067 15.452 5.924 15.1727 6.33 14.974C7.274 14.5213 8.21867 14.182 9.164 13.956C10.1087 13.7293 11.054 13.616 12 13.616C12.946 13.616 13.8917 13.7293 14.837 13.956C15.7823 14.1827 16.7263 14.522 17.669 14.974C18.0757 15.1727 18.399 15.452 18.639 15.812C18.8797 16.1713 19 16.5573 19 16.97V18.616H5Z" fill="#F2F4F7"/>
                      </svg>  
                      <div className="fs-16-700-lato text-white">

                      Login
                      </div>

                    </button>
                      </Link>
                </div>
                  )}
                </div>
              </div>
            </div>

            <DisclosurePanel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-8 gap-6">
                {navigation.map((item) => (
                  <>
                    {item?.subMenu?.length > 0 ? (
                        <>
                        { !hasClass ? (
                          <>
                           {item?.subMenu?.map((subMenu, idx) => (
                            <a
                              key={subMenu.name}
                              href={subMenu.href}
                              aria-current={subMenu.current ? "page" : undefined}
                              className={classNames(
                                subMenu.current ? "" : "",
                                "rounded py-2 px-3"
                              )}
                            >
                             <div key={idx} className="py-4 border-b border-[#97B2A9] w-full fs-20-700-lato lh-24 txt-color-darkgray">
                              {subMenu.name}
                            </div>
                            </a>
                           ))}
                          </>
                        ):(
                          <>
                          
                          <Menu as="div" className="relative">
                            <div>
                              <MenuButton
                                as="div"
                                className="relative flex items-center justify-between gap-2 rounded focus:outline-none py-4 border-b border-[#EAECF0] w-full "
                              >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <div className="fs-20-700-lato lh-24 txt-color-red">
                                  {item.name}
                                </div>
                                <Image src={dropdownIcon} alt="menu icon" />
                              </MenuButton>
                            </div>
                            <MenuItems
                              anchor="bottom center"
                              transition
                              className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-lg sub_menu_dropshadow bg-white p-8 gap-8 flex flex-col transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                              {item?.subMenu?.map((subMenu, idx) => (
                                <MenuItem key={idx}>
                                  <a
                                    href={subMenu?.href}
                                    className="block px-4 py-2 "
                                  >
                                    <div className="fs-16-500-lato lh-24 txt-color-gray">
                                      {subMenu.name}
                                    </div>
                                  </a>
                                </MenuItem>
                              ))}
                            </MenuItems>
                          </Menu>
                          </>
                        )}
                      </>
                   
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current ? "" : "",
                          "rounded py-2 px-3"
                        )}
                      >
                        <div className="py-4 border-b border-[#97B2A9] w-full fs-20-700-lato lh-24 txt-color-darkgray">
                          {item.name}
                        </div>
                      </a>
                    )}
                  </>
                ))}
                <div className="flex flex-wrap gap-4">
                  <Link className="w-full" href={"/login"}>
                    <button className="btn sec-outline-2-btn py-2 px-5 rounded-md fs-16-700-lato txt-color-gray700 w-full">
                      Sign In
                    </button>
                  </Link>
                  <Link className="w-full" href={"/login"}>
                    <button className="btn sec-btn py-2 px-5 rounded-md fs-16-700-lato text-white inline-flex items-center justify-center w-full">
                      <svg width="15" height="16" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4.78906V20.7891" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4 12.7891H20" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Create Ad
                    </button>
                  </Link>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
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
    </>
  );
};

export default Navbar;
