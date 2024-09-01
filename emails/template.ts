export const otpTemplate = (otpCode: string) => `
  <div style="margin: 5px auto; max-width: 768px; padding: 5px 10px">
      <div
        style="
          background-color: #f3f4f5;
          display: flex;
          justify-content: center;
          padding: 5px;
        ">
        <h1
          style="
            font-size: 1.25rem;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
            margin: auto;
          ">
          TECH
          <span
            style="
              color: white;
              background-color: #06b6d4;
              padding-left: 0.125rem;
              padding-right: 0.125rem;
              border-radius: 0.375rem;
            ">
            TALES
            <span style="color: #dc2626; font-size: 1.875rem"> . </span>
          </span>
        </h1>
      </div>
      <h3>Your Tech Tales OTP Verification Code</h3>
      <p>
        Below is your one time passcode that you need to use to complete your
        authentication. The verification code will be valid for 5 minutes.
        Please do not share this code with anyone.
      </p>
      <h3
        style="
          background-color: #3b82f6;
          color: #fff;
          padding: 10px 5px;
          border-radius: 5px;
          text-align: center;
        ">
        ${otpCode}
      </h3>
      <p>
        If you are having any issues with your account, please don't hesitate to
        <a title="contact" href="https://techtales.vercel.app/contact"
          >contact us.</a
        >
      </p>
      <p>
        If you didn't request this code, please ignore this email or contact
        support.
      </p>
      <footer
        style="
          font-size: 12px;
          color: #fff;
          background-color: #3b82f6;
          padding: 5px;
          margin: 10px 0px;
          text-align: center;
        ">
        <p
          style="color: #fff; text-align: center; width: 80%; margin: 5px auto">
          You have received this message because you have requested to reset
          your password. This is an automated message, please do not reply to
          this email.
        </p>
        <table align="center" style="margin: 10px auto">
          <tr>
            <td style="padding: 0 5px">
              <a
                href="https://www.facebook.com/diamond.degesh.3"
                title="Facebook">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321841/logos/msdtcjouooehzdrxnhrv.png"
                  alt="Facebook"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://x.com/diamonddegesh" title="Twitter">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723323303/logos/mo5pxgo0ewsv07skdlwl.png"
                  alt="Twitter"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://github.com/Donvine254" title="GitHub">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png"
                  alt="GitHub"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
          </tr>
        </table>
        <h2 style="font-size: 16px; text-align: center; color: #fff">
          &copy; 2024 Tech Tales
        </h2>
      </footer>
    </div>
`;
export const welcomeTemplate = (name: string) => `
  <div style="margin: 5px auto; max-width: 768px; padding: 5px 10px">
      <div
        style="
          background-color: #f3f4f5;
          display: flex;
          justify-content: center;
          padding: 5px;
          margin-bottom: 10px;
        ">
        <h1
          style="
            font-size: 1.25rem;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
            margin: auto;
          ">
          TECH
          <span
            style="
              color: white;
              background-color: #06b6d4;
              padding-left: 0.125rem;
              padding-right: 0.125rem;
              border-radius: 0.375rem;
            ">
            TALES
            <span style="color: #dc2626; font-size: 1.875rem"> . </span>
          </span>
        </h1>
      </div>
      <img
        src="https://blog-assets.freshworks.com/live-chat-software/wp-content/uploads/2019/01/23194917/Welcome-abroad.jpg"
        style="
          width: 100%;
          max-height: 300px;
          margin: auto;
          border-radius: 5px;
        " />
      <div>
        <p>Dear ${name} — I'm Don, founder of Tech Tales.</p>
        <p>
          Thank you for joining TechTales! We're excited to have you on board.
        </p>
        <p>
          We are a community of developers and tech enthusiasts where you can
          explore, learn, and share your tech stories.
        </p>
        <p>
          I am happy to answer any questions that you might have and I can’t
          wait to see you publish your first blog!🎉
        </p>
        <p>
          As you get started, I encourage you to adhere to our
          <a
            href="https://techtales.vercel.app/terms"
            style="text-decoration: underline"
            >terms and conditions </a
          >and follow our
          <a
            style="text-decoration: underline"
            href="https://techtales.vercel.app/community"
            >community guidelines
          </a>
          when engaging with others to ensure a respectful and thriving
          community where everyone is welcome.
        </p>
        <p>Have a good one!</p>
        <p style="font-weight: 600; font-style: italic">Don.</p>
      </div>
      <footer
        style="
          font-size: 12px;
          color: #fff;
          background-color: #3b82f6;
          padding: 5px;
          margin: 10px 0px;
          text-align: center;
        ">
        <p
          style="color: #fff; text-align: center; width: 80%; margin: 5px auto">
          You have received this message because you have created an account and
          you are now part of the Tech Tales family.
        </p>
        <table align="center" style="margin: 10px auto">
          <tr>
            <td style="padding: 0 5px">
              <a
                href="https://www.facebook.com/diamond.degesh.3"
                title="Facebook">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321841/logos/msdtcjouooehzdrxnhrv.png"
                  alt="Facebook"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://x.com/diamonddegesh" title="Twitter">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723323303/logos/mo5pxgo0ewsv07skdlwl.png"
                  alt="Twitter"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://github.com/Donvine254" title="GitHub">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png"
                  alt="GitHub"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
          </tr>
        </table>
        <h2 style="font-size: 16px; text-align: center; color: #fff">
          &copy; 2024 Tech Tales
        </h2>
      </footer>
    </div>
`;

export const adminRegistrationTemplate = (
  name: string,
  email: string,
  password: string,
  role: string
) => `
 <div style="margin: 5px auto; max-width: 768px; padding: 5px 10px">
      <div
        style="
          background-color: #f3f4f5;
          display: flex;
          justify-content: center;
          padding: 5px;
          margin-bottom: 10px;
        ">
        <h1
          style="
            font-size: 1.25rem;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
            margin: auto;
          ">
          TECH
          <span
            style="
              color: white;
              background-color: #06b6d4;
              padding-left: 0.125rem;
              padding-right: 0.125rem;
              border-radius: 0.375rem;
            ">
            TALES
            <span style="color: #dc2626; font-size: 1.875rem"> . </span>
          </span>
        </h1>
      </div>
      <img
        src="https://blog-assets.freshworks.com/live-chat-software/wp-content/uploads/2019/01/23194917/Welcome-abroad.jpg"
        style="
          width: 100%;
          max-height: 300px;
          margin: auto;
          border-radius: 5px;
        " />
      <div>
        <p>Dear ${name}, I am Don, founder of Tech Tales.</p>
        <p>
          An account has been created for you by the administrator at
          techtales.vercel.app and you are now registered as a ${role}.
        </p>
        <p>Below are your login details:</p>
        <table
          style="
            width: 100%;
            border-collapse: collapse;
            background-color: #3b82f6;
            color: #fff;
            margin-top: 5px;
            border-radius: 5px;
          ">
          <tr style="border-bottom: 1px solid #fff">
            <td style="padding: 10px">Email:</td>
            <td style="padding: 10px; color: #fff !important">
              <strong>${email}</strong>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px">Password:</td>
            <td style="padding: 10px"><strong>${password}</strong></td>
          </tr>
        </table>
        <p>
          Please <a href="https://techtales.vercel.app/login">log in</a> and
          change your password as soon as possible.
        </p>
        <p>
          We are a community of developers and tech enthusiasts where you can
          explore, learn, and share your tech stories.
        </p>
        <p>
          I am happy to answer any questions that you might have and I can’t
          wait to see you publish your first blog!🎉
        </p>
        <p>
          As you get started, I encourage you to adhere to our
          <a href="https://techtales.vercel.app/terms">terms and conditions </a
          >and follow our
          <a href="https://techtales.vercel.app/community"
            >community guidelines
          </a>
          when engaging with others to ensure a respectful and thriving
          community where everyone is welcome.
        </p>
        <p>Have a good one!</p>
        <p style="font-weight: 600; font-style: italic">Don.</p>
      </div>
      <footer
        style="
          font-size: 12px;
          color: #fff;
          background-color: #3b82f6;
          padding: 5px;
          margin: 10px 0px;
          text-align: center;
        ">
        <p
          style="color: #fff; text-align: center; width: 80%; margin: 5px auto">
          You have received this message because you have created an account and
          you are now part of the Tech Tales family.
        </p>
        <table align="center" style="margin: 10px auto">
          <tr>
            <td style="padding: 0 5px">
              <a
                href="https://www.facebook.com/diamond.degesh.3"
                title="Facebook">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321841/logos/msdtcjouooehzdrxnhrv.png"
                  alt="Facebook"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://x.com/diamonddegesh" title="Twitter">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723323303/logos/mo5pxgo0ewsv07skdlwl.png"
                  alt="Twitter"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://github.com/Donvine254" title="GitHub">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png"
                  alt="GitHub"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
          </tr>
        </table>
        <h2 style="font-size: 16px; text-align: center; color: #fff">
          &copy; 2024 Tech Tales
        </h2>
      </footer>
    </div>
`;
export const adminPasswordResetTemplate = (
  name: string,
  email: string,
  password: string
) => `
 <div style="margin: 5px auto; max-width: 768px; padding: 5px 10px">
      <div
        style="
          background-color: #f3f4f5;
          display: flex;
          justify-content: center;
          padding: 5px;
          margin-bottom: 10px;
        ">
        <h1
          style="
            font-size: 1.25rem;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
            margin: auto;
          ">
          TECH
          <span
            style="
              color: white;
              background-color: #06b6d4;
              padding-left: 0.125rem;
              padding-right: 0.125rem;
              border-radius: 0.375rem;
            ">
            TALES
            <span style="color: #dc2626; font-size: 1.875rem"> . </span>
          </span>
        </h1>
      </div>
      <div>
       <h3 style="font-weight: 600; text-align: center">
          Password Reset Notification
        </h3>
        <p>Hello ${name},</p>
        <p>
          Your password has been reset by the administrator. Please
          <a href="https://techtales.vercel.app/login">log in</a> and change
          your password as soon as possible to ensure your account's security.
        </p>
        <p>Below are your login details:</p>
        <table
          style="
            width: 100%;
            border-collapse: collapse;
            background-color: #3b82f6;
            color: #fff;
            margin-top: 5px;
            border-radius: 5px;
          ">
          <tr style="border-bottom: 1px solid #fff">
            <td style="padding: 10px">Email:</td>
            <td style="padding: 10px; color: #fff !important">
              <strong>${email}</strong>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px">Password:</td>
            <td style="padding: 10px"><strong>${password}</strong></td>
          </tr>
        </table>
        <p>
          If you are having any issues with your account, please don't hesitate
          to
          <a title="contact" href="https://techtales.vercel.app/contact"
            >contact us.</a
          >
        </p>
        <p>
          If you didn't request a password reset, kindly inform us immediately.
        </p>
      </div>
      <footer
        style="
          font-size: 12px;
          color: #fff;
          background-color: #3b82f6;
          padding: 5px;
          margin: 10px 0px;
          text-align: center;
        ">
        <p
          style="color: #fff; text-align: center; width: 80%; margin: 5px auto">
          You have received this message because you have requested to reset
          your password.
        </p>
        <table align="center" style="margin: 10px auto">
          <tr>
            <td style="padding: 0 5px">
              <a
                href="https://www.facebook.com/diamond.degesh.3"
                title="Facebook">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321841/logos/msdtcjouooehzdrxnhrv.png"
                  alt="Facebook"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://x.com/diamonddegesh" title="Twitter">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723323303/logos/mo5pxgo0ewsv07skdlwl.png"
                  alt="Twitter"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://github.com/Donvine254" title="GitHub">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png"
                  alt="GitHub"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
          </tr>
        </table>
        <h2 style="font-size: 16px; text-align: center; color: #fff">
          &copy; 2024 Tech Tales
        </h2>
      </footer>
    </div>
`;

export const accountDeletionTemplate = (
  name: string,
  email: string,
  link: string
) =>
  `<div style="margin: 5px auto; max-width: 768px; padding: 5px 10px">
      <div
        style="
          background-color: #f3f4f5;
          display: flex;
          justify-content: center;
          padding: 5px;
          margin-bottom: 10px;
        ">
        <h1
          style="
            font-size: 1.25rem;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
            margin: auto;
          ">
          TECH
          <span
            style="
              color: white;
              background-color: #06b6d4;
              padding-left: 0.125rem;
              padding-right: 0.125rem;
              border-radius: 0.375rem;
            ">
            TALES
            <span style="color: #dc2626; font-size: 1.875rem"> . </span>
          </span>
        </h1>
      </div>
      <div>
       <h3 style="font-weight: 600; text-align: center">
          Account Deletion Notification
        </h3>
        <p>Hello ${name},</p>
      <p> We are writing to inform you that your Tech Tales account associated with the email address ${email} has been marked for deletion. As per your request, your account has been deactivated, and the following actions have been taken: </p>
      <ul>
        <li> <strong>Blogs:</strong> Your blogs have been archived and are no longer publicly visible. However, they have not been deleted and can be restored if you decide to reactivate your account.</li>
         <li> <strong>Comments:</strong> Your comments have been hidden but not deleted. They will also be restored if you choose to reactivate your account.</li>
         <li> <strong>Bookmarks and Reactions:</strong> All your bookmarks and reactions have been permanently deleted.</li>
      </ul>
        <p>
          If you deleted your account by mistake or Incase you change your mind, you can click the button below to restore your account.
         
        </p>
        <div style="display:flex; justify-content:center; align-items:center; margin:auto">
             <a title="Restore My  Account" href=${link} style="padding:10px; background-color:#f3f4f5; border-radius:8px; text-align:center; margin:auto;"
            >Restore My  Account</a>
        </div>
          
      </div>
      <footer
        style="
          font-size: 12px;
          color: #fff;
          background-color: #3b82f6;
          padding: 5px;
          margin: 10px 0px;
          text-align: center;
        ">
        <p
          style="color: #fff; text-align: center; width: 80%; margin: 5px auto">
          You have received this message because you have requested to delete
          your Account.
        </p>
        <table align="center" style="margin: 10px auto">
          <tr>
            <td style="padding: 0 5px">
              <a
                href="https://www.facebook.com/diamond.degesh.3"
                title="Facebook">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321841/logos/msdtcjouooehzdrxnhrv.png"
                  alt="Facebook"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://x.com/diamonddegesh" title="Twitter">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723323303/logos/mo5pxgo0ewsv07skdlwl.png"
                  alt="Twitter"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
            <td style="padding: 0 5px">
              <a href="https://github.com/Donvine254" title="GitHub">
                <img
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png"
                  alt="GitHub"
                  width="20"
                  height="20"
                  style="
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    padding: 4px;
                  " />
              </a>
            </td>
          </tr>
        </table>
        <h2 style="font-size: 16px; text-align: center; color: #fff">
          &copy; 2024 Tech Tales
        </h2>
      </footer>
    </div>`;
