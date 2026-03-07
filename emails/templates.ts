export const EmailVerificationTemplate = (link: string) => `
 <div style="margin:5px auto;max-width:768px;padding:5px 10px"><div style=background-color:#f3f4f5;display:flex;justify-content:center;padding:5px><h1 style=font-size:1.25rem;font-weight:600;cursor:pointer;font-family:Roboto,sans-serif;margin:auto>TECH <span style=color:#fff;background-color:#06b6d4;padding-left:.125rem;padding-right:.125rem;border-radius:.375rem>TALES <span style=color:#dc2626;font-size:1.875rem>.</span></span></h1></div><h2>Verify your email address</h2><p>You're almost set to start enjoying our services. Simply click the link below to verify your email address and get started.</p><p>This link expires in <strong>24 hours</strong>.</p><a href=${link} style="display:block;background-color:#3b82f6;color:#fff;padding:10px 5px;border-radius:5px;text-align:center;width:50%;margin:10px auto;text-decoration:none">Verify Email Address</a><p>Once your email is verified, you can start setting up your account.</p><p>If you are having any issues with your account, please don't hesitate to <a href=https://techtales.vercel.app/contact title=contact>contact us.</a></p><footer style="font-size:12px;background-color:#f3f4f5;padding:5px;margin:10px 0;text-align:center"><p style="text-align:center;width:80%;margin:5px auto">You have received this message because you have created an account with Tech Tales. This is an automated message, please do not reply to this email.</p><table align=center style="margin:10px auto"><tr><td style="padding:0 5px"><a href=https://www.facebook.com/diamond.degesh.3 title=Facebook><img alt=Facebook src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png width=30 height=30></a></td><td style="padding:0 5px"><a href=https://x.com/diamonddegesh title=Twitter><img alt=Twitter src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png width=30></a></td><td style="padding:0 5px"><a href=https://github.com/Donvine254 title=GitHub><img alt=GitHub src=https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png width=20></a></td></tr></table><p><a href=https://techtales.vercel.app/privacy>Privacy Policy</a> | <a href=https://techtales.vercel.app/contact>Contact Details</a></p></footer></div>
`;
export const WelcomeTemplate = (name: string) => `
 <div style="margin:5px auto;max-width:768px;padding:5px 10px"><div style=background-color:#f3f4f5;display:flex;justify-content:center;padding:5px;margin-bottom:10px><h1 style=font-size:1.25rem;font-weight:600;cursor:pointer;font-family:Roboto,sans-serif;margin:auto>TECH <span style=color:#fff;background-color:#06b6d4;padding-left:.125rem;padding-right:.125rem;border-radius:.375rem>TALES <span style=color:#dc2626;font-size:1.875rem>.</span></span></h1></div><img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1754259448/illustrations/gm51mtu4rkurrmlkzjsk.webp" style="display:block;width:100%;max-width:100%;height:auto;max-height:300px;margin:auto;border-radius:5px;" alt="Welcome"/><h3 style=font-weight:600;text-align:center>Welcome to Techtales</h3><div><p>Dear ${name} — I'm Don, founder of Tech Tales.</p><p>Thank you for joining TechTales! We're excited to have you on board.</p><p>We are a community of developers and tech enthusiasts where you can explore, learn, and share your tech stories.</p><p>I am happy to answer any questions that you might have and I can’t wait to see you publish your first blog!🎉</p><p>As you get started, I encourage you to adhere to our <a href=https://techtales.vercel.app/terms style=text-decoration:underline>terms and conditions </a>and follow our <a href=https://techtales.vercel.app/community style=text-decoration:underline>community guidelines </a>when engaging with others to ensure a respectful and thriving community where everyone is welcome.</p><p>Have a good one!</p><p style=font-weight:600;font-style:italic>Don.</p></div><footer style="font-size:12px;background-color:#f3f4f5;padding:5px;margin:10px 0;text-align:center"><p style="text-align:center;width:80%;margin:5px auto">You have received this message because you have created an account with Tech Tales. This is an automated message, please do not reply to this email.</p><table align=center style="margin:10px auto"><tr><td style="padding:0 5px"><a href=https://www.facebook.com/diamond.degesh.3 title=Facebook><img src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png alt=Facebook width=30 height=30></a></td><td style="padding:0 5px"><a href=https://x.com/diamonddegesh title=Twitter><img src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png alt=Twitter width=30></a></td><td style="padding:0 5px"><a href=https://github.com/Donvine254 title=GitHub><img src=https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png alt=GitHub width=20></a></td></tr></table><p><a href=https://techtales.vercel.app/privacy>Privacy Policy</a> | <a href=https://techtales.vercel.app/contact>Contact Details</a></p></footer></div>
`;

export const AdminRegistrationTemplate = (
  name: string,
  email: string,
  password: string,
  role: string,
) => `
<div style="margin:5px auto;max-width:768px;padding:5px 10px"><div style=background-color:#f3f4f5;display:flex;justify-content:center;padding:5px;margin-bottom:10px><h1 style=font-size:1.25rem;font-weight:600;cursor:pointer;font-family:Roboto,sans-serif;margin:auto>TECH <span style=color:#fff;background-color:#06b6d4;padding-left:.125rem;padding-right:.125rem;border-radius:.375rem>TALES <span style=color:#dc2626;font-size:1.875rem>.</span></span></h1></div><img src=https://blog-assets.freshworks.com/live-chat-software/wp-content/uploads/2019/01/23194917/Welcome-abroad.jpg style=width:100%;max-height:300px;margin:auto;border-radius:5px><div><p>Dear ${name}, I am Don, founder of Tech Tales.<p>An account has been created for you by the administrator at techtales.vercel.app and you are now registered as a ${role}.<p>Below are your login details:<table style=width:100%;border-collapse:collapse;background-color:#3b82f6;color:#fff;margin-top:5px;border-radius:5px><tr style="border-bottom:1px solid #fff"><td style=padding:10px>Email:<td style=padding:10px;color:#fff!important><strong>${email}</strong><tr><td style=padding:10px>Password:<td style=padding:10px><strong>${password}</strong></table><p>Please <a href=https://techtales.vercel.app/login>log in</a> and change your password as soon as possible.<p>We are a community of developers and tech enthusiasts where you can explore, learn, and share your tech stories.<p>I am happy to answer any questions that you might have and I can’t wait to see you publish your first blog!🎉<p>As you get started, I encourage you to adhere to our <a href=https://techtales.vercel.app/terms>terms and conditions </a>and follow our <a href=https://techtales.vercel.app/community>community guidelines </a>when engaging with others to ensure a respectful and thriving community where everyone is welcome.<p>Have a good one!<p style=font-weight:600;font-style:italic>Don.</div><footer style="font-size:12px;background-color:#f3f4f5;padding:5px;margin:10px 0;text-align:center"><p style="text-align:center;width:80%;margin:5px auto">You have received this message because you have created an account with Tech Tales. This is an automated message, please do not reply to this email.<table style="margin:10px auto"align=center><tr><td style="padding:0 5px"><a href=https://www.facebook.com/diamond.degesh.3 title=Facebook><img src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png alt=Facebook width=30 height=30></a><td style="padding:0 5px"><a href=https://x.com/diamonddegesh title=Twitter><img src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png alt=Twitter width=30></a><td style="padding:0 5px"><a href=https://github.com/Donvine254 title=GitHub><img src=https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png alt=GitHub width=20></a></table><p><a href=https://techtales.vercel.app/privacy>Privacy Policy</a> | <a href=https://techtales.vercel.app/contact>Contact Details</a></footer></div>
`;
export const AdminPasswordResetTemplate = (
  name: string,
  email: string,
  password: string,
) => `
 <div style="margin:5px auto;max-width:768px;padding:5px 10px"><div style=background-color:#f3f4f5;display:flex;justify-content:center;padding:5px;margin-bottom:10px><h1 style=font-size:1.25rem;font-weight:600;cursor:pointer;font-family:Roboto,sans-serif;margin:auto>TECH <span style=color:#fff;background-color:#06b6d4;padding-left:.125rem;padding-right:.125rem;border-radius:.375rem>TALES <span style=color:#dc2626;font-size:1.875rem>.</span></span></h1></div><div><h3 style=font-weight:600;text-align:center>Password Reset Notification</h3><p>Hello ${name},<p>Your password has been reset by the administrator. Please <a href=https://techtales.vercel.app/login>log in</a> and change your password as soon as possible to ensure your account's security.<p>Below are your login details:<table style=width:100%;border-collapse:collapse;background-color:#3b82f6;color:#fff;margin-top:5px;border-radius:5px><tr style="border-bottom:1px solid #fff"><td style=padding:10px>Email:<td style=padding:10px;color:#fff!important><strong>${email}</strong><tr><td style=padding:10px>Password:<td style=padding:10px><strong>${password}</strong></table><p>If you are having any issues with your account, please don't hesitate to <a href=https://techtales.vercel.app/contact title=contact>contact us.</a><p>If you didn't request a password reset, kindly inform us immediately.</div><footer style="font-size:12px;background-color:#f3f4f5;padding:5px;margin:10px 0;text-align:center"><p style="text-align:center;width:80%;margin:5px auto">You have received this message because you are member of the Tech Tales family. This is an automated message, please do not reply to this email.<table style="margin:10px auto"align=center><tr><td style="padding:0 5px"><a href=https://www.facebook.com/diamond.degesh.3 title=Facebook><img alt=Facebook src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png width=30 height=30></a><td style="padding:0 5px"><a href=https://x.com/diamonddegesh title=Twitter><img alt=Twitter src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png width=30></a><td style="padding:0 5px"><a href=https://github.com/Donvine254 title=GitHub><img alt=GitHub src=https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png width=20></a></table><p><a href=https://techtales.vercel.app/privacy>Privacy Policy</a> | <a href=https://techtales.vercel.app/contact>Contact Details</a></footer></div>
`;

export const AccountDeactivationTemplate = (
  name: string,
  email: string,
  link: string,
  keepBlogs: boolean,
  keepComments: boolean,
) =>
  `<div style="margin:5px auto;max-width:768px;padding:5px 10px"><div style="background-color:#f3f4f5;display:flex;justify-content:center;padding:5px;margin-bottom:10px"><h1 style="font-size:1.25rem;font-weight:600;cursor:pointer;font-family:Roboto,sans-serif;margin:auto"> TECH <span style="color:#fff;background-color:#06b6d4;padding-left:.125rem;padding-right:.125rem;border-radius:.375rem"> TALES <span style="color:#dc2626;font-size:1.875rem;">.</span></span></h1></div><div><h3 style="font-weight:600;text-align:center">Account Deletion Notification</h3><p>Hello ${name},</p><p> We are writing to inform you that your Tech Tales account associated with the email address ${email} has been marked for deletion. As per your request, your account has been deactivated, and the following actions have been taken: </p><ul><li><strong>Blogs:</strong> ${
    keepBlogs
      ? "As per your choice, all your blogs remain publicly visible. If you fail to recover your account within 30 days, they will be anonymized and assigned to a deleted user."
      : "Your blogs have been archived but remain publicly visible with no engagement. However, they have not been deleted and can be restored if you decide to reactivate your account. If you fail to recover your account within 30 days, they will be permanently deleted."
  } </li><li><strong>Comments:</strong> ${
    keepComments
      ? "As per your choice, all your comments will remain publicly visible. If you fail to recover your account within 30 days, they will be anonymized and assigned to a deleted user. All of your identifiable data will be removed."
      : "Your comments have been hidden but not deleted. They will also be restored if you choose to reactivate your account. If you fail to recover your account within 30 days, they will be permanently deleted."
  } </li><li><strong>Bookmarks and Favorites:</strong> Your bookmarks and favorites remain available and will be recovered if you choose to restore your account. If you fail to recover your account within 30 days, they will be permanently deleted.</li></ul><p> If you deleted your account by mistake or in case you change your mind, you can click the button below to restore your account. You have <strong>30 days</strong> from now to restore your account. </p><div style="display:flex;justify-content:center;align-items:center;margin:auto"><a href="${link}" title="Restore My Account" style="display:block;background-color:#3b82f6;color:#fff;padding:10px 5px;border-radius:5px;text-align:center;width:50%;margin:10px auto;text-decoration:none"> Restore My Account </a></div></div><footer style="font-size:12px;background-color:#f3f4f5;padding:5px;margin:10px 0;text-align:center"><p style="text-align:center;width:80%;margin:5px auto"> You have received this message because you have requested to delete your account. This is an automated message, please do not reply to this email. </p><table align="center" style="margin:10px auto"><tr><td style="padding:0 5px"><a href="https://www.facebook.com/diamond.degesh.3" title="Facebook"><img alt="Facebook" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" width="30" height="30"></a></td><td style="padding:0 5px"><a href="https://x.com/diamonddegesh" title="Twitter"><img alt="Twitter" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" width="30"></a></td><td style="padding:0 5px"><a href="https://github.com/Donvine254" title="GitHub"><img alt="GitHub" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png" width="20"></a></td></tr></table><p><a href="https://techtales.vercel.app/privacy">Privacy Policy</a> | <a href="https://techtales.vercel.app/contact">Contact Details</a></p></footer></div>`;

export const PasswordResetTemplate = (name: string, link: string) =>
  `<div style="margin:5px auto;max-width:768px;padding:5px 10px"><div style=background-color:#f3f4f5;display:flex;justify-content:center;padding:5px;margin-bottom:10px><h1 style=font-size:1.25rem;font-weight:600;cursor:pointer;font-family:Roboto,sans-serif;margin:auto>TECH <span style=color:#fff;background-color:#06b6d4;padding-left:.125rem;padding-right:.125rem;border-radius:.375rem>TALES <span style=color:#dc2626;font-size:1.875rem>.</span></span></h1></div><div><h3 style=font-weight:600;text-align:center>Reset Your Account Password</h3><p>Hello ${name},</p><p>Someone, (hopefully you) has requested to reset your account password at Tech Tales</p><p>Please click the link below to create a new password. If you did not request to reset your password, please ignore this email</p><p>Kindly note that your password will not change unless you click the link below and create a new one. The link will expire in <strong>15 minutes</strong></p><div style=display:flex;justify-content:center;align-items:center;margin:auto><a href=${link} title="Restore My Account" style="display:block;background-color:#3b82f6;color:#fff;padding:10px 5px;border-radius:5px;text-align:center;width:50%;margin:10px auto;text-decoration:none">Change My Password</a></div></div><footer style="font-size:12px;background-color:#f3f4f5;padding:5px;margin:10px 0;text-align:center"><p style="text-align:center;width:80%;margin:5px auto">You have received this message because you have requested to reset your account password. This is an automated message, please do not reply to this email.</p><table align=center style="margin:10px auto"><tr><td style="padding:0 5px"><a href=https://www.facebook.com/diamond.degesh.3 title=Facebook><img alt=Facebook src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png width=30 height=30></a></td><td style="padding:0 5px"><a href=https://x.com/diamonddegesh title=Twitter><img alt=Twitter src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png width=30></a></td><td style="padding:0 5px"><a href=https://github.com/Donvine254 title=GitHub><img alt=GitHub src=https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png width=20></a></td></tr></table><p><a href=https://techtales.vercel.app/privacy>Privacy Policy</a> | <a href=https://techtales.vercel.app/contact>Contact Details</a></p></footer></div>`;

export const AccountDeletionTemplate = (
  name: string,
  email: string,
  keepBlogs: boolean,
  keepComments: boolean,
) =>
  `<div style="margin:5px auto;max-width:768px;padding:5px 10px"><div style=background-color:#f3f4f5;display:flex;justify-content:center;padding:5px;margin-bottom:10px><h1 style=font-size:1.25rem;font-weight:600;cursor:pointer;font-family:Roboto,sans-serif;margin:auto>TECH <span style=color:#fff;background-color:#06b6d4;padding-left:.125rem;padding-right:.125rem;border-radius:.375rem>TALES <span style=color:#dc2626;font-size:1.875rem>.</span></span></h1></div><div><h3 style=font-weight:600;text-align:center>Account Deletion Notification</h3><p>Hello ${name},</p><p>We are writing to inform you that your Tech Tales account associated with the email address ${email} has been deleted. As per your request, your account has been deleted, and the following actions have been taken: </p><ul><li><strong>Blogs:</strong>${
    keepBlogs
      ? " As per your choice, all your blog posts have been anonymized and assigned to a deleted author although they remain archived and publicly available. All your indentifiable data has been removed."
      : " All of your blog posts have been permanently deleted and removed from our servers. This action cannot be undone."
  } .</li><li><strong>Responses:</strong>${
    keepComments
      ? " As per your choice, all your responses have been anonymized and assigned to a deleted author. They remain publicly visible. All your indentifiable data has been removed."
      : " All of your responses have been permanently deleted and removed from our servers. This action cannot be undone.."
  }</li><li><strong>Bookmarks and Favorites:</strong> Your bookmarks and favorites have been permanently deleted and removed from our servers. </li></ul><p>If you deleted your account by mistake you can always create a new account with this email addres.</p><footer style="font-size:12px;background-color:#f3f4f5;padding:5px;margin:10px 0;text-align:center"><p style="text-align:center;width:80%;margin:5px auto">You have received this message because you have requested to delete your account. This is an automated message, please do not reply to this email.</p><table align=center style="margin:10px auto"><tr><td style="padding:0 5px"><a href=https://www.facebook.com/diamond.degesh.3 title=Facebook><img alt=Facebook src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png width=30 height=30></a></td><td style="padding:0 5px"><a href=https://x.com/diamonddegesh title=Twitter><img alt=Twitter src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png width=30></a></td><td style="padding:0 5px"><a href=https://github.com/Donvine254 title=GitHub><img alt=GitHub src=https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png width=20></a></td></tr></table><p><a href=https://techtales.vercel.app/privacy>Privacy Policy</a> | <a href=https://techtales.vercel.app/contact>Contact Details</a></p></footer></div></div>`;

export const MagicLinkEmailTemplate = (link: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Updated title for magic link login -->
    <title>Login to your Techtales Account</title>
   <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            padding: 20px;
            text-align: center;
            justify-content:center;
    display: flex;
    align-items: center;
    gap: 12px;
            
        }
        .heading {
  font-weight: bold;
  background: linear-gradient(to right, #06b6d4, #2563eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.heading:focus {
  outline: none;
}
        .logo {
            max-width: 30px;
            height: auto;
            border-radius: 10px
        }
        .header-text {
            display: none;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        /* Updated button class name and styling for magic link */
        .magic-link-button {
            display: inline-block;
            background-color: oklch(62.3% 0.214 259.815); !important;
            color: #ffffff !important;
            text-decoration: none !important;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            margin: 20px 0;
            transition: transform 0.2s ease;
        }
        .magic-link-button:hover {
            background-color: #155dfc !important;
            transform: translateY(-1px);
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .alternative-link {
            background-color: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 20px;
            margin: 30px 0;
        }
        .alternative-link p {
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #718096;
        }
        /* Added !important to override browser default blue links */
        .alternative-link a {
            color: oklch(62.3% 0.214 259.815) !important;
            word-break: break-all;
            font-size: 14px;
            text-decoration: none !important;
        }
        .security-note {
            background-color: #fef5e7;
            border-left: 4px solid #f6ad55;
            padding: 15px 20px;
            margin: 30px 0;
            border-radius: 0 6px 6px 0;
        }
        .security-note p {
            margin: 0;
            font-size: 14px;
            color: #744210;
        }
        .footer {
            background-color: #f7fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            margin: 5px 0;
            font-size: 14px;
            color: #718096;
        }
        /* Added !important to footer links to override browser defaults */
        .footer a {
            color: oklch(62.3% 0.214 259.815) !important;
            text-decoration: none !important;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #718096;
            text-decoration: none;
            font-size: 14px;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            .content {
                padding: 30px 20px;
            }
            .header {
                padding: 30px 20px;
            }
            .magic-link-button {
                display: block;
                width: 100%;
                box-sizing: border-box;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header with Logo -->
        <div class="header">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1753723016/tech-tales/profile-pictures/akaochvmlgkm24dvc0lf.png" alt="Kitchenly Logo" class="logo">
            <h2 class="heading">Techtales.</h2>
        </div>
        <!-- Main Content -->
        <div class="content">
            <div class="greeting">Hello there,</div> 
            <!-- Updated message for magic link login -->
            <div class="message">
                Click the button below to securely log in to your Techtales account.
            </div>
            <!-- Updated button text and link for magic link -->
            <div class="button-container">
                <a href=${link} class="magic-link-button">Log In to Techtales</a>
            </div>
            <!-- Updated alternative link section for magic link -->
            <div class="alternative-link">
                <p><strong>Button not working?</strong> Copy and paste this link to yout browser:</p>
                <a href=${link}>${link}</a>
            </div>
            <!-- Updated security note with 5-minute expiration -->
            <div class="security-note">
                <p><strong>Note:</strong> This magic link expires in 5 minutes for your security. This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
        <!-- Footer -->
        <div class="footer">
           <footer>
            <h2 class="heading">Techtales.</h2>
            <p>A Community Code Tutorials, AI Guides & Dev Tips</p>
            <table align=center style="margin:10px auto"><tr><td style="padding:0 5px"><a href=https://www.facebook.com/diamond.degesh.3 title=Facebook><img alt=Facebook src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png width=30 height=30></a></td><td style="padding:0 5px"><a href=https://x.com/diamonddegesh title=Twitter><img alt=Twitter src=https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png width=30></a></td><td style="padding:0 5px"><a href=https://github.com/Donvine254 title=GitHub><img alt=GitHub src=https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png width=20></a></td></tr></table><p><a href=https://techtales.vercel.app/privacy>Privacy Policy</a> | <a href=https://techtales.vercel.app/contact>Contact Details</a></p></footer>
        </div>
    </div>
</body>
</html>
`;
