import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { Button, Form, Input, InputNumber } from "antd";
import React, { useState } from "react";
import bannerImg from "../../assets/images/login-banner.jpg";
import logo from "../../assets/images/m-massage-logo.png";
import Image from "next/image";
import Link from "next/link";
import { withAuth } from "@/HOC";
import ErrorMessage from '../../components/Common/ErrorMessage';
import authService from '../../services/auth';
import Head from "next/head";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const itemsPerPage = 1;

function RegisterPage() {
    const phoneRegex = /^\+?\d{1,3}?[-. ]?\(?\d{1,4}\)?[-. ]?\d{1,4}[-. ]?\d{1,9}$/
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([1, 2, 3, 4, 5, 6]);
  const [isSuccess, setSuccess] = useState(false);  
  const [error, setError] = useState('');
  const handleBack = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };
  const [form] = Form.useForm();
  // Click handler for the forward button
  const handleForward = () => {
    setStartIndex((prevIndex) =>
      Math.min(
        prevIndex + itemsPerPage,
        (carouselItems?.length - 1) * itemsPerPage
      )
    );
  };
  
  const handleRegister = async (values) => {
    setLoading(true);
    setError('')
    setSuccess(false)
    if(values.password != values.retype_password){
      setError('Password and Retype Password must match!');
      return;
    }
    try {
        const response = await authService.register(values);
        setLoading(false)
        if (response.success) {
          setSuccess(true);
          form.resetFields();
        }else{
          if (response.errors) {
            const fieldErrors = Object.entries(response.errors).map(([field, messages]) => ({
              name: field.split("."),
              errors: messages,
            }));
            form.setFields(fieldErrors);
          }else{
            setError(response.message)
          }
        }
    }catch (err) {
        console.log(err)
        setError('problem occured while performing registeration.')
    }
  }
  
  return (
    <div>
      <div className="block sm:hidden">
        <Navbar />
      </div>
      <Head><title>
        
	     Register Therapist
        </title></Head>
      <div className="flex justify-center bg-[#FCFCFD] sm:bg-white">
        <div className="max-w-[1440px] w-full">
          <div className="px-6 py-8 md:px-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <div className="px-8 pt-8 hidden md:block">
                  <Image
                    src={logo}
                    alt="VitalRelief"
                     className="w-[154px] h-[65px] "
                  />
                </div>
                <div className="flex justify-center py-10 md:py-[62px]">
                  <div className="flex flex-col gap-8 w-full md:w-1/2">
                    <div className="fs-32-400-lato txt-color-darkgray">
                      Register
                    </div>
                    {isSuccess ? 
                    <div>
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Account created!</strong>
                        <span className="block sm:inline ml-1">
                          An email with a verification link has been sent on your email. <br/>
                          Please verify your account to get started.
                        </span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => {/* close logic here */}}>
                          <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path d="M10 9l-5-5m0 0l5 5m-5-5l5 5m5 5l5 5m0 0l-5-5m5 5l-5-5"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                    :<></>}
                    <ErrorMessage message={error} />
                    <Form
                      className=" myform"
                      form={form}
                      name="review-modal"
                      onFinish={handleRegister }
                      layout="vertical"
                      validateMessages={validateMessages}
                    >
                      <Form.Item
                        name={"first_name"}
                        label="Name"
                        className="w-full input_label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          className="py-3 px-4 rounded-lg myinput"
                          placeholder="John Doe"
                        />
                      </Form.Item>
                      <Form.Item
                        name={"email"}
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
                          className="py-3 px-4 rounded-lg myinput"
                          placeholder="Email"
                        />
                      </Form.Item>
                      <Form.Item
                        name={"phone"}
                        label="Phone"
                        className="input_label"
                        rules={[
                          {
                            required: true,
                          },
                          {
                            pattern: phoneRegex,
                            message:'Enter a valid phone number'
                          }
                        ]}
                      >
                        <Input
                          className="py-3 px-4 rounded-lg w-full myinput"
                          placeholder="+4425356323"
                        />
                      </Form.Item>
                      <Form.Item
                        name={"password"}
                        label="Password"
                        className="input_label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input.Password
                          name={"password"}
                          label="Password"
                          className="py-3 px-4 rounded-lg myinput"
                        />
                      </Form.Item>
                      <Form.Item
                        name={"retype_password"}
                        label="Retype password"
                        className="input_label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input.Password
                          name={"retype_password"}
                          label="Retype password"
                          className="py-3 px-4 rounded-lg myinput"
                        />
                      </Form.Item>
                      <Form.Item className="mb-0 mt-2">
                        <Button
                          disabled={loading}
                          type="button"
                          className="btn sec-btn !py-3 px-5 !rounded-lg shadow-[0px_1px_2px_0px_#1018280D] text-white w-full fs-16-700-lato min-h-[48px]"
                          htmlType="submit"
                        >
                           {loading? 'Processing..':'REGISTER NOW'}
                        </Button>
                      </Form.Item>
                    </Form>
                    <div className="fs-14-400-lato txt-color-gray1000 text-center">
                      Already have an account?{" "}
                      <Link
                        href={"/login"}
                        className="fs-14-700-lato txt-color-darkgray"
                      >
                        Log in
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
    </div>
  );
}

export default withAuth(RegisterPage, {
  requireAuth: false,
  publicAccess: false,
});
