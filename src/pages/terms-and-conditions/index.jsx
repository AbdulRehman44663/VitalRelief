import BreadcrumbComp from "@/components/Breadcrumb";
import FAQHeader from "@/components/FAQComponent/FAQHeader";
import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { withAuth } from "@/HOC";
import Head from "next/head";
import React from "react";

function TermsAndConditionsPage() {
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Terms of Service",
    },
  ];
  return (
    <>
      <Navbar />
      <Head><title>
        
	     Terms and Conditions
        </title></Head>
      <div className="flex justify-center bg-[#FCFCFD]">
        <div className="max-w-[1440px] w-full">
          <div
            className={`py-[36px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col items-start md:items-center gap-[30px] md:gap-[40px]`}
          >
            <BreadcrumbComp items={breadcrumb} />
            <div className="flex flex-col items-start md:items-center gap-3 md:gap-6 w-full ">
              <div className="fs-48-400-lato txt-color-darkgray text-left md:text-center">
                Terms of Service
              </div>
              <div className="fs-16-400-lato txt-color-gray700 text-justify md:text-justify">
             
              Vital Relief is an online platform for advertising legitimate massage services in compliance with UK law. We act solely as an intermediary, providing a directory and communication service for massage therapists and potential clients.
              <br></br>
              These are our general Terms and Conditions regarding the use of this website.

              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Acceptance of our Terms and Conditions</div>
              
              The service may be used only for lawful purposes and in a lawful manner. You agree to comply with all applicable laws and regulations.
              <br></br>
              By using Vital Relief, you accept and agree to these Terms and Conditions as they apply to your use of the Site. If you do not agree to these Terms and Conditions, you may not access or otherwise use the Site. You also agree to Vital Relief&apos;s Privacy Policy and accept cookies from this Site.
              <br></br>
              If you object to any term or condition or are not satisfied with any future changes, we recommend not using Vital Relief.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Using Vital Relief </div>

              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Platform Function</div>
              Our service is limited to providing an advertising, search, and contact platform for massage services. We are not party to any contracts between users and service providers.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Information Accuracy</div>
              Vital Relief does not verify or guarantee the authenticity, accuracy, or completeness of advertisements. Advertisers are solely responsible for the validity and legality of their content and services offered.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">User Responsibility</div>
              We strongly advise users to exercise due diligence when engaging with advertisers. Please report any suspicious or potentially unlawful content to us immediately.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Service Quality</div>
              Vital Relief is not responsible for the quality, safety, or legality of services provided. All agreements are strictly between users and service providers.
              <br></br>
              All information that you submit to Vital Relief  and any consequences that may result from the content that you post on Vital Relief  are solely your responsibility. In addition, we reserve the right to refuse or delete any content that we believe violates our terms or that we deem inappropriate or offensive.
              <br></br>
              As a condition of your use of Vital Relief  you agree that you will not:


              <ol className="list-decimal pl-8 pt-2 ">
                <li>
                violate any laws
                </li>
             
                <li> violate the Posting Rules.</li>
                <li> post or otherwise communicate any false or misleading material or message of any kind</li>
                <li> infringe any third-party right</li>
                <li>  distribute spam, chain letters, or promote pyramid schemes</li>
                <li> distribute viruses or any other technologies that may harm Vital Relief  or the interests or property of Vital Relief  users</li>
                <li> copy, modify, or distribute any other person&apos;s content without their consent</li>
                <li> harvest or otherwise collect information about others, including email addresses, without their consent</li>
              </ol>

              You may use our site only for lawful purposes. You may not use our site:
              <br></br>

              <ol className="list-decimal pl-8 pt-2">
                <li>in any way that breaches any applicable local, national or international law or regulation</li>
                <li> for the purpose of harming or attempting to harm minors in any way</li>
                <li> to send, knowingly receive, upload, download, use or re-use any material which does not comply with our content standards.</li>
                <li> To transmit, or procure the sending of, any unsolicited or unauthorised advertising or promotional material or any other form of similar solicitation (spam)</li>
              </ol>
              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Prohibited Content</div> 
              The following are strictly prohibited and may result in immediate removal of advertisements and potential legal action:


              <ol className="list-decimal pl-8 pt-2">
                <li>Any services of a sexual or adult nature</li>
                <li> Unlicensed or unqualified massage services</li>
                <li> Any content that may promote or facilitate illegal activities</li>
                <li> Personal Information</li>
                <li> By using Vital Relief, you agree to the collection, transfer, storage, and use of your personal information by Vital Relief located on UK servers as further described in our Privacy policy. You also agree to receive marketing communications from us unless you inform us that you prefer not to receive such communications.</li>
              </ol>

              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Deletion of Advertisements</div>
              You acknowledge that your advertisement may be deleted from the Vital Relief Site if we believe these Terms and Conditions, including our Posting Rules, are breached, either directly or indirectly.
              <br></br>
              You would have already paid a fee for the display of such an ad, so you may be entitled to a refund of such fee. However, we reserve the right not to refund Vital Relief users for any fees paid through the use of our Site if you breach, in our opinion, these Terms and Conditions, which include, without limitation, the Posting Rules.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Amending Your Advertisement</div>
              You can update or amend your contact details at any time by using your My Account page, which can be located on Vital Relief. (Please note: You must be logged in to change your details).
              <br></br>
              If, while verifying your ad, we find a minor infringement of the Terms or Posting Rules, we reserve the right to amend your ad so it meets all Rules and Terms.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1"> Posting rules</div>
              Your Massage Services ad must not offer sensual, tantra, erotic, or sexual services.
              <br></br>
              If you choose to include an image in your ad, it must be of you, your staff, or your spa, not an image of someone else. All photos must be decent. Ads that contain images of full nudity and sexual or suggestive positions will not be posted, and no refund will be given.
              <br></br>
              You must not use the details (name, phone number, mailing address, email, photos, etc.) of someone else without their permission or provide false contact details.
              <br></br>
              You are solely responsible for all information that you submit to Vital Relief and any consequences that may result from your post. We reserve the right, at our discretion, to refuse or delete content that we believe is inappropriate or breaches the above terms. We also reserve the right, at our discretion, to restrict a user&apos;s usage of Vital Relief either temporarily or permanently, or refuse a user&apos;s registration.

              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">   Refund Policy</div>
              Please note that all payments made are final and non refundable. Once a payment has been processed, we are unable to provide refunds under any circumtances.

              <br></br>
              We strongly encourage everyone to carefully review their purchase and ensure all details are accurate before completing the transaction.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">  Advertising Guidelines</div>
              Ads must not discriminate based on protected characteristics as defined by the Equality Act 2010:
              <br></br>
              <ol className="list-decimal pl-8 pt-2">
                <li>Only qualified, professional massage services may be advertised.</li>

                <li>All claims in advertisements must be truthful and verifiable.</li>
                <li>Imagery must be decent and non-suggestive, in compliance with UK advertising standards.</li>

              </ol>
            
              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1"> Review Guidelines and Submission Policy</div>
              We encourage all reviews to be detailed and respectful. A simple statement like &quot;waste of time&quot; is not enough. Please include specific feedback about your experience, as it helps others make informed decisions. We do not tolerate any rudeness or disrespect in reviews, and all submissions must follow our community guidelines. Reviews that fail to meet these standards may be removed.

              <br></br>
              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1"> Enforcement and Liability</div>
              We reserve the right to remove any advertisement that, in our reasonable opinion, violates our policies or UK law. Vital Relief does not accept liability for user-generated content or any loss or damage arising from the use of our platform, to the fullest extent permitted by UK law.
              <br></br>
              Nothing in these terms shall limit our liability for fraudulent misrepresentation, or for death or personal injury resulting from our negligence or the negligence of our agents or employees. You agree not to hold us responsible for things other users post or do.
              <br></br>
              As most of the content on Vital Relief comes from other users, we do not guarantee the accuracy of postings or user communications or the quality, safety, or legality of what&apos;s offered.
              <br></br>
              In no event do we accept liability of any description for the posting of any unlawful, threatening, abusive, defamatory, obscene, or indecent information, or material of any kind which violates or infringes upon the rights of any other person, including, without limitation, any transmissions constituting or encouraging conduct that would constitute a criminal offense, give rise to civil liability or otherwise violate any applicable law.
              <br></br>
              Vital Relief is not responsible for what happens between the Site users (therapist, SPA, and Salon) and the service consumer. Whatever is agreed between both parties is strictly between them, and Vital Relief will not be responsible for any damages, claims, or liabilities.
              <br></br>
              Nothing in these terms shall limit our liability for fraudulent misrepresentation, or for death or personal injury resulting from our negligence or the negligence of our agents or employees. You agree not to hold us responsible for things other users post or do.
              <br></br>
              As most of the content on Vital Relief  comes from other users, we do not guarantee the accuracy of postings or user communications or the quality, safety, or legality of what&apos;s offered.
              <br></br>
              In no event do we accept liability of any description for the posting of any unlawful, threatening, abusive, defamatory, obscene or indecent information, or material of any kind which violates or infringes upon the rights of any other person, including without limitation any transmissions constituting or encouraging conduct that would constitute a criminal offence, give rise to civil liability or otherwise violate any applicable law.
              <br></br>
              Vital Relief  is not responsible what happens between the site users (therapist, SPA and Salon) and the service consumer. Whatever is agreed between both parties is strictly between them and Vital Relief  will not be responsible for any damages, claims or liabilities.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1"> Release</div>
              The Site assumes no responsibility for the accuracy, currency, completeness, or usefulness of information, views, opinions, or advice in any material contained on the Site. In addition, it does not endorse any opinions or recommendations posted by others. Any information posted on the Site is the responsibility of the person or persons posting the message. Any user who violates the Terms may be permanently banned from posting ads or using the Site. You understand that all postings, ads, messages, advertisements, photos, sounds, images, text, files, video, or other materials (collectively &quot;Content&quot;) posted on, transmitted through, or linked from the Site, are solely the responsibility of the person from whom such Content originated. You agree that the Site does pre-screen, monitor, and approve Content; therefore, the Site shall have the right to remove, move (including moving an ad or posting to another section or category within the classifieds), refuse, edit, or delete any Content for any reason whatsoever. The Site shall not be responsible for any interaction between you and other users of the Site. Your dealings with others through the Site are solely between you and such other parties. Under no circumstances will the Site be liable for any goods, services, resources or content available through such third-party dealings or communications, or for any harm related thereto. The Site is under no obligation to become involved in any disputes between you and other users of the Site or between you and any other third parties.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1"> Dispute Resolution</div>
              Any disputes shall be governed by the laws of England and Wales. We encourage users to contact us first with any concerns, but you may also have the right to refer certain complaints to alternative dispute resolution providers.
              <br></br>
              You agree that our service is a venue for posters and users of the Site. In the event that you have a dispute with any user of the Site, you agree that the Site is under no obligation to become involved. You further agree to release the Site from any and all claims, demands, and damages arising out of or in connection with such dispute. You are entirely responsible and liable for any ad content you post or any ad that is posted through your Account. The Site does not offer any refunds for the early cancellation of paid sponsor ads or paid print ads. We do not issue credits or refunds due to our extremely low rates and minimal administrative staff.
              <br></br>

              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1"> Disclaimer of Warranties for Site</div>
              You expressly agree that use of the Site is at your own risk. The Site shall not be responsible for any content found on these classifieds. The Site expressly disclaims all warranties of any kind, whether implied warranties of merchantability, fitness for a particular purpose, or non-infringement. The Site makes no warranty that the service will be uninterrupted, timely, secure, or error-free. The Site makes no warranty as to the results that may be obtained from the use of the service or as to the accuracy or reliability of any information obtained from the service. The user understands and agrees that any material and/or data downloaded or otherwise obtained through the use of the service is done at the user&apos;s own discretion and risk and that the user will be solely responsible for any damage to their computer system or loss of data that results from the download of such material and/or data. The Site shall not be liable for any damages, direct, indirect, incidental, special, or consequential resulting from the use or the inability to use the service, or for the cost of procurement of substitute goods and services, or resulting from any goods or services purchased or obtained or messages received or transactions entered into through the service, or resulting from unauthorized access to or alteration of user&apos;s transmissions or data, including but not limited to damages for loss of profits, use, data, or other intangible, even if the Site has been advised of the possibility of such damages.


              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Intellectual Property</div>
              By submitting content to Vital Relief, you grant us a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sub-licensable (through multiple tiers) right to exercise any and all copyright, publicity, trademarks, database rights, and any other rights you have in the content, in any media known now or in the future.
              <br></br>
              We do not claim ownership of the content you provide; you retain ownership of your content. However, by submitting content, you grant us a license to use, modify, publicly perform, publicly display, reproduce, and distribute such content.

              <br></br>
              <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Contact</div>
              For any questions or concerns about these Terms and Conditions, please contact us via our provided channels on the website.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(TermsAndConditionsPage, {
  requireAuth: false,
  publicAccess: true,
});
