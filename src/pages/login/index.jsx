import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { Button, Form, Input, InputNumber, message } from "antd";
import React, { useState } from "react";
import bannerImg from "../../assets/images/login-banner.jpg";
import logo from "../../assets/images/m-massage-logo.png";
import Image from "next/image";
import Link from "next/link";
import useStore from "@/store";
import { useRouter } from "next/router";
import { withAuth } from "@/HOC";
import authService from '../../services/auth';
import ErrorMessage from '../../components/Common/ErrorMessage';
import Head from "next/head";
import { Spin } from "antd";


const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const itemsPerPage = 1;

function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUnverified, setUnverified] = useState(false);
  const [email, setEmail] = useState('')
  const setToken = useStore((state) => state.setToken);
  const setAuth = useStore((state) => state.setAuth);

  const setUser = useStore((state) => state.setUser);
  const login = useStore((state) => state.login);

  const [isSuccess, setSuccess] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([1, 2, 3, 4, 5, 6]);
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const handleBack = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  // Click handler for the forward button
  const handleForward = () => {
    setStartIndex((prevIndex) =>
      Math.min(
        prevIndex + itemsPerPage,
        (carouselItems?.length - 1) * itemsPerPage
      )
    );
  };

  const handleResendVerification = async (values) => {
    setError('');
    setUnverified(false);
    form.resetFields();
    try {
      const response = await authService.resendVerification({ email: email });
      if (response.success) {
        setError('');
        setSuccess(true);
        isUnverified(false);
      } else {
        setError(response.message)
      }
    } catch (err) {
      console.log(err)

    }
  }

  const handleLogin = async (values) => {
    debugger
    setError("");
    setLoading(true);
    setUnverified(false);
    console.log("Received values:", values);
  
    // Restrict login for the specific email
    if (values.email === "ilmsuperadmin@gmail.com") {
      setError(
        <span>
         This account belongs to vitalrelief, {" "}
          <a
            href="https://admin.vitalrelief.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            click here
          </a> {" "}
          to login to admin dashboard.
        </span>
      );
      form.setFieldsValue({ email: "" , password: ""}); // Clear email field
      setLoading(false);
      return;
    }
  
    try {
      const response = await authService.login(values?.email, values?.password);
      if (response.success) {
        if (response.data.user.listing_status === "Active") {
          setAuth(true);
          setUser(response.data.user);
          setToken(response.data.token);
          login();
          router.push("/");
        } else if (response.data.user.listing_status === "Unverified") {
          form.resetFields();
          setUnverified(true);
          setEmail(values.email);
        } else if (response.data.user.listing_status === "Inactive") {
          message.error(
            "Your account is deleted or inactive. Please contact ILM support for further assistance."
          );
        }
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.log(err);
      setError("A problem occurred while performing login.");
    } finally {
      setLoading(false);
    }
  };

  // const handleLogin = async (values) => {
  //   setError('')
  //   setLoading(true);
  //   setUnverified(false);
  //   console.log('Received values:', values);
  //   try {
  //     const response = await authService.login(values?.email, values?.password);
  //     if (response.success) {
  //       if (response.data.user.listing_status == 'Active') {
  //         setAuth(true)
  //         setUser(response.data.user)
  //         setToken(response.data.token)
  //         login();
  //         router.push("/");
  //       } else if (response.data.user.listing_status == 'Unverified') {
  //         form.resetFields();
  //         setUnverified(true);
  //         setEmail(values.email)
  //       } else if (response.data.user.listing_status == 'Inactive') {
  //         message.error('Your account is deleted or inactive. please contact ILM support for further assistant.')
  //       }

  //       // Optionally redirect or do something else
  //     } else {
  //       setError(response.message)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     setError('problem occured while performing login.')
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <>
      <div className="block sm:hidden">
        <Navbar />
      </div>
      <Head><title>

        Sign in to Access Your Account with Vital Relief
      </title></Head>
      <div className="flex justify-center bg-[#FCFCFD] sm:bg-white">
        <div className="max-w-[1440px] w-full">
          <div className="px-6 py-8 md:px-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <div className="px-8 pt-8 hidden md:block">
                  <Link href={"/"}>
                    <Image
                      src={logo}
                      alt="VitalRelief"
                      className="w-[154px] h-[65px] "
                    />
                  </Link>
                </div>
                <div className="flex justify-center items-center py-10 md:py-0">
                  <div className="flex flex-col justify-center gap-8 w-full md:w-1/2 h-auto md:h-[800px]">
                    <div className="fs-32-400-lato txt-color-darkgray">Sign In</div>
                    {isUnverified ?
                      <div>
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                          <strong className="font-bold">Warning!</strong>
                          <span className="block sm:inline ml-1">Your account is not verified. <br /> If you have not received verification email <span className="text-red-500 " style={{ cursor: 'pointer' }} onClick={() => handleResendVerification()}><b >click here</b></span> to get verification email.</span>
                          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => {/* close logic here */ }}>
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <title>Close</title>
                              <path d="M10 9l-5-5m0 0l5 5m-5-5l5 5m5 5l5 5m0 0l-5-5m5 5l-5-5" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      : <></>}
                    {isSuccess ?
                      <div>
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                          <strong className="font-bold">Verification sent!</strong>
                          <span className="block sm:inline ml-1">
                            Verification link has been sent on your email : {email}. Click it to activation your account.
                          </span>
                          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => {/* close logic here */ }}>
                            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <title>Close</title>
                              <path d="M10 9l-5-5m0 0l5 5m-5-5l5 5m5 5l5 5m0 0l-5-5m5 5l-5-5" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      : <></>}
                    <ErrorMessage message={error} />
                    <Form
                      className="myform"
                      form={form}
                      name="review-modal"
                      onFinish={handleLogin}
                      layout="vertical"
                      validateMessages={validateMessages}
                    >
                      <Form.Item
                        name={["email"]}
                        label="Email"
                        className="input_label"
                        rules={[
                          {
                            type: "email",
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          className="py-3 px-4 rounded-lg"
                          placeholder="Email"
                          onBlur={(e) => {
                            if (e.target.value === "ilmsuperadmin@gmail.com") {
                              form.setFieldsValue({ email: ""});
                              setError(
                                <span>
                                  This account belongs to vitalrelief,{" "}
                                  <a
                                    href="https://admin.vitalrelief.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                  >
                                    click here 
                                  </a> {" "}
                                  to login to admin dashboard.
                                </span>
                              );
                            }
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name={["password"]}
                        label="Password"
                        className="input_label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input.Password
                          name={["password"]}
                          label="Password"
                          className="py-3 px-4 rounded-lg"
                          placeholder="password"
                        />
                      </Form.Item>
                      <div className="fs-14-400-lato txt-color-gray1000 mb-8 text-center">
                        FORGOT PASSWORD?{" "}
                        <Link href="/reset-password">
                          <span className="txt-color-darkgray fs-14-700-lato cursor-pointer">
                            CLICK HERE
                          </span>{" "}
                        </Link>
                      </div>
                      <Form.Item className="mb-0">
                        <Button
                          type="button"
                          className="btn sec-btn !py-3 px-5 !rounded-lg shadow-[0px_1px_2px_0px_#1018280D] text-white w-full fs-16-700-lato min-h-[48px]"
                          htmlType="submit"
                          disabled={loading}
                        >
                          {loading ? "Processing.." : "SIGN IN"}
                        </Button>
                      </Form.Item>
                    </Form>
                    <div className="fs-14-400-lato txt-color-gray1000 text-center">
                      {`Don't have an account?`}{" "}
                      <Link
                        href={"/register"}
                        className="fs-14-700-lato txt-color-darkgray"
                      >
                        Sign up
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <Image
                    src={bannerImg}
                    alt="register banner"
                    className="rounded-[24px] h-[896px]"
                  />
                  {/* <div className="absolute inset-0 bg-[#00000073] rounded-xl"></div> */}
                  <div className="absolute inset-x-0 bottom-14 flex flex-col px-14 gap-6">
                    <div className="fs-36-500-lato text-white">
                      {`"Getting a massage with Christie is totally worth it and she’s
                  extremely professional. Loved it and highly recommend her
                  services. I’ll be back as soon as possible."`}
                    </div>
                    <div className="flex justify-between gap-3">
                      <div className="fs-30-600-lato text-white">
                        Amélie Laurent
                      </div>
                      <div className="flex items-center gap-8">
                        <button
                          className="border border-[#FFFFFF80] rounded-full h-14 w-14 flex justify-center items-center"
                          onClick={() => handleBack()}
                          disabled={startIndex === 0}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 12H5M5 12L12 19M5 12L12 5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          className="border border-[#FFFFFF80] rounded-full h-14 w-14 flex justify-center items-center"
                          onClick={() => handleForward()}
                          disabled={
                            startIndex >= carouselItems?.length - itemsPerPage
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(LoginPage, {
  requireAuth: false,
  publicAccess: false,
});
