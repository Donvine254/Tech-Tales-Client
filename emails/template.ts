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
  <div style="width:100%; padding:2px; background-color: #F7F7F7">
  <img src="https://www.touchpoint.com/wp-content/uploads/2023/11/Featured-image-1.png" style="width: 100%; max-height: 360px; margin:auto;"/>
    <h3 style="text-align: center;color: #3B82F6">Welcome to Techtales!</h3>
    <p> Dear ${name} </p>
    <p>Thank you for joining TechTales! We're excited to have you on board.</p>
    <p>We are a community of developers and tech enthusiasts where you can explore, learn, and share your tech stories.</p>
    <p>We encourage you to adhere to our <a href="https://techtales.vercel.app/terms">terms and conditions </a>and follow our <a href="https://techtales.vercel.app/community">community guidelines </a> when engaging with others.</p>
    <footer style="font-size: 10px; color:#06b6d4; background-color: #cffafe; padding: 5px;border-radius: 5px; border: 1px solid #06b6d4;font-style: italic;">
      This is an automated message, please do not reply to this email
    </footer>
    
  </div>
`;

export const adminRegistrationTemplate = (
  name: string,
  email: string,
  password: string
) => `
 <div>
          <h3>Your TechTales Account</h3>
          <p>Hello ${name},</p>
          <p>An account has been created for you by the administrator. Below are your login details:</p>
          <div style="background-color: #f0f0f0; color: #333; padding: 5px; border-radius: 5px;"> <p>Email: <strong>${email}</strong></p>
          <p>Password: <strong>${password}</strong></p></div>
          <p>Please log in and change your password as soon as possible.</p>
          <hr></hr>
          <p>We encourage you to adhere to our <a href="https://techtales.vercel.app/terms">terms and conditions </a>and follow our <a href="https://techtales.vercel.app/community">community guidelines </a> when engaging with others.</p>
          <footer style="
        font-size: 12px; 
        color: #888; 
        padding-top: 10px; 
        font-style: italic;">
      This is an automated message, please do not reply to this email
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
          <p>Below are your login details</p>
          <div style="background-color: #f0f0f0; color: #333; padding: 5px; border-radius: 5px;"> <p>Email: <strong>${email}</strong></p>
          <p>Password: <strong>${password}</strong></p></div>
         <footer style="
        font-size: 12px; 
        color: #888; 
        padding-top: 10px; 
        font-style: italic;">
      This is an automated message, please do not reply to this email
    </footer>
        </div>
`;
