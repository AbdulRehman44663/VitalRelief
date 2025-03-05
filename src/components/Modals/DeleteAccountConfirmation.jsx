import accountService from "@/services/accountService";
import { Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import useStore from "@/store";

function DeleteAccountConfirmation({ user,isModalOpen, handleOk, handleCancel }) {

  const { logout } = useStore();
  const [code, setCode] = useState(null)
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  const sendDeleteVerificationCode = async ()=>{

    try {
      let data = {user_id:user?.id}
      setLoadingResend(true);
      const response = await accountService.sendAccountDeletionCode( data);
      setLoadingResend(false)
    
      if(!response.success){
        message.error(response.message);
      }else{

        message.success(response.message);
        
      }
         
    } catch (error) {
      
      setLoadingResend(false)
      message.error('Failed to send delete verification mail.');
    }
  }



  const handleDeleteAccount = async (values) =>{

    if(!code){
      message.error('Please enter code to proceed!')
      return;
    }
    try {
      let data = {user_id:user?.id,code:code}
      setLoading(true);
        const response = await accountService.deleteAccount( data);
        setLoading(false);
        if(!response.success){
          message.error(response.message);
        }else{
          
          message.success('Account deleted!');
          logout();
          window.location.reload();
        }
          
      } catch (error) {
        setLoading(false);
        message.error('Failed to delete account.');
      }
  }
  
  
  useEffect(()=>{
    sendDeleteVerificationCode()
  },[])
  return (
    <Modal
      title=""
      className="p-0 bg-[#FCFCFD] rounded-lg !w-full sm:!w-[70%] md:!w-[50%] lg:!w-[40%] xl:!w-[30%]"
      open={isModalOpen}
      footer={null}
      centered
      onCancel={handleCancel}
    >
      <div className="flex flex-col gap-6 p-7 sm:p-8">
        <div className="flex flex-col gap-3">
          <div className="fs-20-700-lato txt-color-darkgray">
            Are you sure, you want to delete your account?
          </div>
          <div className="fs-16-400-lato txt-color-gray1000">
            This action can’t be undone. We’ve send you a code at{" "}
            <span className="fs-16-500-lato">{user?.email}</span>
          </div>
        </div>
        <div className="border border-[#EAECF0]"></div>
        <div className="flex flex-col gap-3">
          <div className="fs-16-400-lato txt-color-gray1000">
            Type the code <span className="txt-color-darkgray"></span>{" "}
            below
          </div>
          <div className="flex flex-col gap-2">
            <Input
              onInput={(event)=>{setCode(event.target.value); console.log(event.target.value)}}
              onChange={(event)=>{setCode(event.target.value); console.log(event.target.value)}}
              className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#97B2A9]"
              placeholder="Enter the code here"
            />
            {loadingResend ? 
            
            <div className="fs-12-400-lato txt-color-darkgray self-end cursor-pointer">
              Resending code...
            </div>
            :
            
            <div className="fs-12-400-lato txt-color-darkgray self-end cursor-pointer" onClick={()=>sendDeleteVerificationCode()}>
             <u>Resend Code</u> 
            </div>
            }
          </div>
        </div>
        <div className="flex gap-4">
          {
            loading ? 
            <button
              className="min-h-[41px] w-full fs-14-700-lato text-white py-2.5 px-4 rounded-lg sec-btn border border-[#78B6B6] shadow-[0px_1px_2px_0px_#1018280D]"
         
              >
              Deleting...
            </button>
            :
            <button
              className="min-h-[41px] w-full fs-14-700-lato text-white py-2.5 px-4 rounded-lg sec-btn border border-[#78B6B6] shadow-[0px_1px_2px_0px_#1018280D]"
            onClick={()=>handleDeleteAccount()}
            >
              DELETE ACCOUNT
            </button>
          }
         
          <button

            className="min-h-[41px] w-full fs-14-700-lato txt-color-gray700 py-2.5 px-4 rounded-lg bg-[#F2F4F7] shadow-[0px_1px_2px_0px_#1018280D]"
            onClick={handleCancel}
          >
            CANCEL
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteAccountConfirmation;
