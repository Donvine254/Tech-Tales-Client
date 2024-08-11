export const otpTemplate = (otpCode: string) => `
  <div>
    <h3>Your TechTales OTP Verification  Code</h3>
    <p> Below is your one time passcode that you need to use to complete your authentication. The verification code will be valid for 5 minutes. Please do not share this code with anyone.</p>
    <p style="background-color: #f0f0f0; color: #333; padding: 5px; border-radius: 5px;">Your OTP code is: <strong>${otpCode}</strong></p>
    <p>If you didn't request this code, please ignore this email or contact support.</p>
    <footer style="
        font-size: 12px; 
        color: #888; 
        padding-top: 10px; 
        font-style: italic;">
      This is an automated message, please do not reply to this email
    </footer>
  </div>
`;
export const welcomeTemplate = (name: string) => `
  <div >
    <div style="background-color:#222; display: flex;justify-content: center; width:95%;"> <img style="margin:auto" src="https://techtales.vercel.app/logo.png" width="40" height="40"/></div>
  <img src="https://blog-assets.freshworks.com/live-chat-software/wp-content/uploads/2019/01/23194917/Welcome-abroad.jpg" style="width: 95%; max-height: 300px; margin: 0 auto;"/>
    <p> Dear ${name}, I am Don, founder of Tech Tales. </p>
    <p>Thank you for joining TechTales! We're excited to have you on board.</p>
    <p>We are a community of developers and tech enthusiasts where you can explore, learn, and share your tech stories.</p>
    <p>I am happy to answer any questions that you might have and I can’t wait to see you publish your first blog!🎉</p>
    <p>As you get started, I encourage you to adhere to our <a href="https://techtales.vercel.app/terms">terms and conditions </a>and follow our <a href="https://techtales.vercel.app/community">community guidelines </a> when engaging with others to ensure a respectful and thriving community where everyone is welcome.</p>
    <p>Have a good one!</p>
    <p>Don.</p>
    <footer style="font-size: 12px; color:#fff; background-color: #808080; padding: 5px; border: 1px solid #3B82F6; width:95%; margin: 10px 0px; text-align:center;">
     <p style="color:#fff"> You have received this message because you have created an account at techtales.vercel.app and are part of the Tech Tales family.  </p>   
    <table align="center" style="margin: 10px auto;">
      <tr>
        <td style="padding: 0 5px;">
          <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321841/logos/msdtcjouooehzdrxnhrv.png" alt="Facebook" width="20" height="20" style="border-radius: 50%; background-color: #e5e7eb; padding: 4px;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://x.com/diamonddegesh" title="Twitter">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723323303/logos/mo5pxgo0ewsv07skdlwl.png" alt="Twitter" width="20" height="20" style="border-radius: 50%; background-color: #e5e7eb; padding: 4px;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://github.com/Donvine254" title="GitHub">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png" alt="GitHub" width="20" height="20" style="border-radius: 50%; background-color: #e5e7eb; padding: 4px;">
          </a>
        </td>
      </tr>
    </table>
      <h2 style="font-size:16px; text-align:center; color:#fff;">&copy; 2024 Tech Tales</h2> 
    </footer> 
  </div>
`;

export const adminRegistrationTemplate = (
  name: string,
  email: string,
  password: string,
  role: string
) => `
 <div >
    <div style="background-color:#222; display: flex;justify-content: center; width:95%;"> <img style="margin:auto" src="https://techtales.vercel.app/logo.png" width="40" height="40"/></div>
  <img src="https://blog-assets.freshworks.com/live-chat-software/wp-content/uploads/2019/01/23194917/Welcome-abroad.jpg" style="width: 95%; max-height: 300px; margin: 0 auto;"/>
    <p> Dear ${name}, I am Don, founder of Tech Tales. </p>
    <p>An account has been created for you by the administrator at techtales.vercel.app and you are now registered as a ${role}.</p>
    <p>Below are your login details:</p>
     <table style="width: 100%; border-collapse: collapse; background-color: #808080; color: #fff; border-radius: 5px;">
  <tr style="border-bottom: 1px solid #ccc; ">
    <td style="padding: 10px;">Email:</td>
    <td style="padding: 10px; color:#fff !important"><strong>${email}</strong></td>
  </tr>
  <tr>
    <td style="padding: 10px;">Password:</td>
    <td style="padding: 10px;"><strong>${password}</strong></td>
  </tr>
</table>
          <p>Please log in and change your password as soon as possible.</p>
    <p>We are a community of developers and tech enthusiasts where you can explore, learn, and share your tech stories.</p>
    <p>I am happy to answer any questions that you might have and I can’t wait to see you publish your first blog!🎉</p>
    <p>As you get started, I encourage you to adhere to our <a href="https://techtales.vercel.app/terms">terms and conditions </a>and follow our <a href="https://techtales.vercel.app/community">community guidelines </a> when engaging with others to ensure a respectful and thriving community where everyone is welcome.</p>
    <p>Have a good one!</p>
    <p>Don.</p>
    <footer style="font-size: 12px; color:#fff; background-color: #808080; padding: 5px; width:95%; margin: 10px 0px; text-align:center;">
     <p style="color:#fff"> You have received this message because an account has been created for you at <span style="color: blue; text-decoration-line:underline;">techtales.vercel.app</span> and are part of the Tech Tales family. If you did not request for an account, kindly let us know by responding to this email, or login and delete your account. </p>   
    <table align="center" style="margin: 10px auto;">
      <tr>
        <td style="padding: 0 5px;">
          <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321841/logos/msdtcjouooehzdrxnhrv.png" alt="Facebook" width="20" height="20" style="border-radius: 50%; background-color: #e5e7eb; padding: 4px;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://x.com/diamonddegesh" title="Twitter">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723323303/logos/mo5pxgo0ewsv07skdlwl.png" alt="Twitter" width="20" height="20" style="border-radius: 50%; background-color: #e5e7eb; padding: 4px;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://github.com/Donvine254" title="GitHub">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png" alt="GitHub" width="20" height="20" style="border-radius: 50%; background-color: #e5e7eb; padding: 4px;">
          </a>
        </td>
      </tr>
    </table>
      <h2 style="font-size:16px; text-align:center; color:#fff;">&copy; 2024 Tech Tales</h2> 
    </footer> 
  </div>
`;
export const adminPasswordResetTemplate = (
  name: string,
  email: string,
  password: string
) => `
<div>
          <h3>Password Reset Notification</h3>
          <p>Hello ${name},</p>
          <p>Your password has been reset by the administrator. Please log in and change your password as soon as possible to ensure your account's security.</p>
          <p>Below are your login details:</p>
          <div style="background-color: #f0f0f0; color: #333; padding: 5px; border-radius: 5px;"> <p>Email: <strong>${email}</strong></p>
          <p>Password: <strong>${password}</strong></p></div>
        <footer style="font-size: 12px; color:#fff; background-color: #3B82F6; padding: 5px;border-radius: 5px; border: 1px solid #3B82F6;font-style: italic; width:fit-content;">
     <p> This is an automated message, please do not reply to this email</p>
    </footer> 
        </div>
`;
