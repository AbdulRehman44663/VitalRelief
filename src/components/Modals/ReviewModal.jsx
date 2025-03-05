import reviewsService from "@/services/reviewsService";
import useStore from "@/store";
import { Button, Form, Input, Modal, Rate,message } from "antd";
import React,{useState } from "react";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

function ReviewModal({ listing,isModalOpen, handleOk, handleCancel }) {
  var [content, setContent] = useState("");
  
  const user = useStore((state) => state.user);
  const [form] = Form.useForm();
  const [text, setText] = useState('');
  const maxLength = 400; // Set your max character limit here
  
  const handleChange = (event) => {
    const value = event.target.value;
    if (value.length <= maxLength) {
      setText(value);
    }
  };

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('Text');
    const newText = text + pastedText;
    if (newText.length > maxLength) {
      e.preventDefault(); // Prevent paste
      const truncatedText = newText.slice(0, maxLength);
      setText(truncatedText); 
    } else {
      setText(newText); 
    }
  };
  
  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with leading 0 if necessary
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading 0 if necessary
    return `${year}-${month}-${day}`;
  };
  
  const onFinish = async (values) => {
    let data = values;
   
    data.listing_id = listing?.id;
    if(user?.id){

      data.user_id = user?.id;
    }
    data.message = text;
    const currentDate = new Date();
   
    // Get formatted date
    const formattedDate = formatDate(currentDate);
    data.date = formattedDate;
    try {
      
      const addReview = await reviewsService.submitReview( data);
      message.success('Review submited!');
      form.resetFields();
      handleOk(); // Optionally close the modal
     
   
    } catch (error) {
      message.error('Failed to add review.');
    }
  };

  return (
    <>
      <Modal
        title=""
        className="!w-full md:!w-3/4 lg:!w-4/6 xl:!w-1/2 p-0"
        open={isModalOpen}
        footer={null}
        centered
        onCancel={handleCancel}
      >
        <div className="py-5 md:py-[30px] flex flex-col gap-4">
          <div className="px-4 flex flex-col items-center gap-3">
            <div className="fs-48-400-lato txt-color-gray600">Write a Review</div>
            <div className="flex flex-col gap-3">
              <div className="fs-20-400-lato txt-color-gray700 text-center">
                Review your experience.
              </div>
              <div className="fs-14-400-lato txt-color-gray700 text-center">
                Your email will not be published
              </div>
            </div>
          </div>
          <div className="px-4 flex justify-center">
            <Form
             form={form}
              className="w-full md:w-2/3 myform"
              name="review-modal"
              onFinish={onFinish}
              layout="vertical"
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["name"]}
                label="Your Name"
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
                name={["email"]}
                label="Your Email"
                className="input_label"
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input className="py-3 px-4 rounded-lg myinput" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name={"message"}
                label="Message(Review)"
                className="input_label"
                
              >
                <Input.TextArea
                  onChange={handleChange}
                  value={text}
                  onPaste={handlePaste}
                  style={{
                    height: 127,
                    resize: "none",
                  }}
                  className="py-3 px-4 rounded-lg myinput"
                  placeholder="Describe your experience"
                />
                <div
                  style={{
                    color: text.length === maxLength || text.length > maxLength? 'red' : 'gray',
                    marginTop: '5px',
                    fontSize: '14px',
                  }}
                >
                  {text.length === maxLength || text.length > maxLength ? 'Character limit reached!' : `${text.length} / ${maxLength}`}
                </div>
              </Form.Item>
              <Form.Item
                name={["rating"]}
                label="Rating"
                className="input_label"
              >
                <Rate defaultValue={0} className="txt-color-red" />
              </Form.Item>

              <Form.Item className="mb-0 mt-2">
                <Button
                  type="button"
                  className="btn sec-btn !py-3 px-5 !rounded-lg shadow-[0px_1px_2px_0px_#1018280D] text-white w-full fs-16-700-lato min-h-[48px] border-1px-33443C"
                  htmlType="submit"
                >
                  SUBMIT REVIEW
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ReviewModal;
