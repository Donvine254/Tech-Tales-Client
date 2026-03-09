/*Email template for verifying user email address*/
export const EmailVerificationTemplate = (link: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email Address</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;line-height:1.6;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fa;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:24px 20px;background-color:#ffffff;border-bottom:1px solid #e2e8f0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1753723016/tech-tales/profile-pictures/akaochvmlgkm24dvc0lf.png" alt="Techtales Logo" width="30" height="30" style="display:block;border-radius:10px;">
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:20px;font-weight:bold;color:#2563eb;">Techtales.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding:40px 30px;">
              <p style="font-size:18px;font-weight:600;color:#2d3748;margin:0 0 20px 0;">Hello there,</p>
              <p style="font-size:16px;color:#4a5568;margin:0 0 30px 0;line-height:1.7;">
                You're almost set to start enjoying our services. Please verify your email address to complete your registration.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:20px 0;">
                    <a href="${link}" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:16px;text-align:center;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>
              <!-- Fallback link -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#f7fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px;">
                    <p style="margin:0 0 10px 0;font-size:14px;color:#718096;"><strong>Button not working?</strong> Copy and paste this link into your browser:</p>
                    <a href="${link}" style="color:#2563eb;word-break:break-all;font-size:14px;text-decoration:none;">${link}</a>
                  </td>
                </tr>
              </table>
              <!-- Security note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#fef5e7;border-left:4px solid #f6ad55;border-radius:0 6px 6px 0;padding:15px 20px;">
                    <p style="margin:0;font-size:14px;color:#744210;">
                      <strong>Note:</strong> This link expires in 24 hours for your security. Do not share this link with anyone. This is an automated message — please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f7fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px 0;font-size:16px;font-weight:bold;color:#2563eb;">Techtales.</p>
              <p style="margin:0 0 16px 0;font-size:14px;color:#718096;">Your go-to source for the latest in technology, web development, and digital innovation.</p>

              <!-- Social icons -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:10px auto 16px auto;">
                <tr>
                  <td style="padding:0 5px;">
                    <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
                      <img alt="Facebook" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" width="30" height="30" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://x.com/diamonddegesh" title="Twitter">
                      <img alt="Twitter" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" width="25" height="20" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://github.com/Donvine254" title="GitHub">
                      <img alt="GitHub" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png" width="20" height="20" style="display:block;">
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#718096;">
                <a href="https://techtales.vercel.app/privacy" style="color:#2563eb;text-decoration:none;">Privacy Policy</a>
                &nbsp;|&nbsp;
                <a href="https://techtales.vercel.app/contact" style="color:#2563eb;text-decoration:none;">Contact Details</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
/*Email template for welcome message after registration*/
export const WelcomeEmailTemplate = (name: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Techtales!</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;line-height:1.6;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fa;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:24px 20px;background-color:#ffffff;border-bottom:1px solid #e2e8f0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1753723016/tech-tales/profile-pictures/akaochvmlgkm24dvc0lf.png" alt="Techtales Logo" width="30" height="30" style="display:block;border-radius:10px;">
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:20px;font-weight:bold;color:#2563eb;">Techtales.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Banner Image -->
          <tr>
            <td style="padding:0;line-height:0;">
              <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1754259448/illustrations/gm51mtu4rkurrmlkzjsk.webp" alt="Welcome to Techtales" width="600" style="display:block;width:100%;max-width:600px;height:auto;">
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:40px 30px;">

              <p style="font-size:22px;font-weight:700;color:#2563eb;margin:0 0 8px 0;">Welcome to Techtales! 🎉</p>
              <p style="font-size:16px;font-weight:600;color:#2d3748;margin:0 0 24px 0;">Dear ${name},</p>

              <p style="font-size:15px;color:#4a5568;margin:0 0 16px 0;line-height:1.8;">
                I'm Don, founder of Tech Tales. Thank you for joining TechTales! We're excited to have you on board.
              </p>

              <p style="font-size:15px;color:#4a5568;margin:0 0 16px 0;line-height:1.8;">
                We are a community of developers and tech enthusiasts where you can explore, learn, and share your tech stories. I am happy to answer any questions that you might have and I can't wait to see you publish your first blog! 🎉
              </p>

              <p style="font-size:15px;color:#4a5568;margin:0 0 24px 0;line-height:1.8;">
                As you get started, I encourage you to adhere to our
                <a href="https://techtales.vercel.app/terms" style="color:#2563eb;text-decoration:underline;">terms and conditions</a>
                and follow our
                <a href="https://techtales.vercel.app/community" style="color:#2563eb;text-decoration:underline;">community guidelines</a>
                when engaging with others — to ensure a respectful and thriving community where everyone is welcome.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:10px 0 30px 0;">
                    <a href="https://techtales.vercel.app" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:16px;text-align:center;">
                      Start Exploring Techtales
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="font-size:15px;color:#4a5568;margin:0 0 4px 0;line-height:1.8;">Have a good one!</p>
              <p style="font-size:15px;color:#2d3748;font-weight:600;margin:0;">Don &mdash; Founder, Techtales</p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px 0;font-size:16px;font-weight:bold;color:#2563eb;">Techtales.</p>
              <p style="margin:0 0 16px 0;font-size:14px;color:#718096;">Your go-to source for the latest in technology, web development, and digital innovation.</p>

              <!-- Social icons -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:10px auto 16px auto;">
                <tr>
                  <td style="padding:0 5px;">
                    <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
                      <img alt="Facebook" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" width="30" height="30" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://x.com/diamonddegesh" title="Twitter">
                      <img alt="Twitter" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" width="25" height="20" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://github.com/Donvine254" title="GitHub">
                      <img alt="GitHub" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png" width="20" height="20" style="display:block;">
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#718096;">
                <a href="https://techtales.vercel.app/privacy" style="color:#2563eb;text-decoration:none;">Privacy Policy</a>
                &nbsp;|&nbsp;
                <a href="https://techtales.vercel.app/contact" style="color:#2563eb;text-decoration:none;">Contact Details</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

/*Email template for account deactivation*/
export const AccountDeactivationTemplate = (
  name: string,
  email: string,
  link: string,
  keepBlogs: boolean,
  keepComments: boolean,
) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Deletion Notification</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;line-height:1.6;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fa;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:24px 20px;background-color:#ffffff;border-bottom:1px solid #e2e8f0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1753723016/tech-tales/profile-pictures/akaochvmlgkm24dvc0lf.png" alt="Techtales Logo" width="30" height="30" style="display:block;border-radius:10px;">
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:20px;font-weight:bold;color:#2563eb;">Techtales.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:40px 30px;">

              <p style="font-size:22px;font-weight:700;color:#dc2626;margin:0 0 8px 0;">Account Deletion Notification ⚠️</p>
              <p style="font-size:16px;font-weight:600;color:#2d3748;margin:0 0 24px 0;">Dear ${name},</p>

              <p style="font-size:15px;color:#4a5568;margin:0 0 16px 0;line-height:1.8;">
                We are writing to inform you that your Techtales account associated with the email address <strong>${email}</strong> has been marked for deletion. As per your request, your account has been deactivated and the following actions have been taken:
              </p>

              <!-- Actions taken list -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#f7fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px;">

                    <!-- Blogs row -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                      <tr>
                        <td width="24" style="vertical-align:top;padding-top:2px;">
                          <span style="font-size:16px;">📝</span>
                        </td>
                        <td style="padding-left:10px;font-size:14px;color:#4a5568;line-height:1.8;">
                          <strong style="color:#2d3748;">Blogs:</strong>&nbsp;${
                            keepBlogs
                              ? "As per your choice, all your blogs remain publicly visible. If you fail to recover your account within 30 days, they will be anonymized and assigned to a deleted user."
                              : "Your blogs have been archived but remain publicly visible with no engagement. They have not been deleted and can be restored if you reactivate your account. If you fail to recover your account within 30 days, they will be permanently deleted."
                          }
                        </td>
                      </tr>
                    </table>

                    <!-- Comments row -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                      <tr>
                        <td width="24" style="vertical-align:top;padding-top:2px;">
                          <span style="font-size:16px;">💬</span>
                        </td>
                        <td style="padding-left:10px;font-size:14px;color:#4a5568;line-height:1.8;">
                          <strong style="color:#2d3748;">Comments:</strong>&nbsp;${
                            keepComments
                              ? "As per your choice, all your comments will remain publicly visible. If you fail to recover your account within 30 days, they will be anonymized and all identifiable data will be removed."
                              : "Your comments have been hidden but not deleted. They will be restored if you choose to reactivate your account. If you fail to recover your account within 30 days, they will be permanently deleted."
                          }
                        </td>
                      </tr>
                    </table>

                    <!-- Bookmarks row -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="24" style="vertical-align:top;padding-top:2px;">
                          <span style="font-size:16px;">🔖</span>
                        </td>
                        <td style="padding-left:10px;font-size:14px;color:#4a5568;line-height:1.8;">
                          <strong style="color:#2d3748;">Bookmarks &amp; Favorites:</strong>&nbsp;Your bookmarks and favorites remain available and will be recovered if you restore your account. If you fail to recover your account within 30 days, they will be permanently deleted.
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <p style="font-size:15px;color:#4a5568;margin:0 0 24px 0;line-height:1.8;">
                If you deleted your account by mistake or change your mind, click the button below to restore your account. You have <strong>30 days</strong> from now to do so.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px 0;">
                    <a href="${link}" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:16px;text-align:center;">
                      Restore My Account
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Warning note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#fef5e7;border-left:4px solid #f6ad55;border-radius:0 6px 6px 0;padding:15px 20px;">
                    <p style="margin:0;font-size:14px;color:#744210;">
                      <strong>Note:</strong> After 30 days, your account and all associated data will be <strong>permanently and irreversibly deleted</strong>. This action cannot be undone. This is an automated message — please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="font-size:15px;color:#4a5568;margin:0 0 4px 0;line-height:1.8;">We're sorry to see you go,</p>
              <p style="font-size:15px;color:#2d3748;font-weight:600;margin:0;">Don &mdash; Founder, Techtales</p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px 0;font-size:16px;font-weight:bold;color:#2563eb;">Techtales.</p>
              <p style="margin:0 0 16px 0;font-size:14px;color:#718096;">Your go-to source for the latest in technology, web development, and digital innovation.</p>

              <!-- Social icons -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:10px auto 16px auto;">
                <tr>
                  <td style="padding:0 5px;">
                    <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
                      <img alt="Facebook" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" width="30" height="30" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://x.com/diamonddegesh" title="Twitter">
                      <img alt="Twitter" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" width="25" height="20" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://github.com/Donvine254" title="GitHub">
                      <img alt="GitHub" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png" width="20" height="20" style="display:block;">
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#718096;">
                <a href="https://techtales.vercel.app/privacy" style="color:#2563eb;text-decoration:none;">Privacy Policy</a>
                &nbsp;|&nbsp;
                <a href="https://techtales.vercel.app/contact" style="color:#2563eb;text-decoration:none;">Contact Details</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
/*Email template for resetting user password*/
export const PasswordResetEmailTemplate = (
  name: string,
  link: string,
) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Techtales Password</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;line-height:1.6;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fa;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:24px 20px;background-color:#ffffff;border-bottom:1px solid #e2e8f0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1753723016/tech-tales/profile-pictures/akaochvmlgkm24dvc0lf.png" alt="Techtales Logo" width="30" height="30" style="display:block;border-radius:10px;">
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:20px;font-weight:bold;color:#2563eb;">Techtales.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:40px 30px;">

              <p style="font-size:22px;font-weight:700;color:#2d3748;margin:0 0 8px 0;">Reset Your Password 🔐</p>
              <p style="font-size:16px;font-weight:600;color:#2d3748;margin:0 0 24px 0;">Dear ${name},</p>

              <p style="font-size:15px;color:#4a5568;margin:0 0 16px 0;line-height:1.8;">
                We received a request to reset the password for your Techtales account. Click the button below to choose a new password.
              </p>
              <p style="font-size:15px;color:#4a5568;margin:0 0 24px 0;line-height:1.8;">
                If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged and your account is secure.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px 0;">
                    <a href="${link}" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:16px;text-align:center;">
                      Reset My Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#f7fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px;">
                    <p style="margin:0 0 10px 0;font-size:14px;color:#718096;"><strong>Button not working?</strong> Copy and paste this link into your browser:</p>
                    <a href="${link}" style="color:#2563eb;word-break:break-all;font-size:14px;text-decoration:none;">${link}</a>
                  </td>
                </tr>
              </table>

              <!-- Security note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#fef5e7;border-left:4px solid #f6ad55;border-radius:0 6px 6px 0;padding:15px 20px;">
                    <p style="margin:0 0 8px 0;font-size:14px;color:#744210;">
                      <strong>⚠️ Security reminder:</strong>
                    </p>
                    <ul style="margin:0;padding-left:18px;font-size:14px;color:#744210;line-height:1.8;">
                      <li>This link expires in <strong>15 minutes</strong> for your security.</li>
                      <li>Never share this link with anyone, including Techtales staff.</li>
                      <li>If you didn't request this, you can report this incident for further investigation.</li>
                      <li>This is an automated message — please do not reply to this email.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="font-size:15px;color:#4a5568;margin:0 0 4px 0;line-height:1.8;">Stay secure,</p>
              <p style="font-size:15px;color:#2d3748;font-weight:600;margin:0;">Don &mdash; Founder, Techtales</p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px 0;font-size:16px;font-weight:bold;color:#2563eb;">Techtales.</p>
              <p style="margin:0 0 16px 0;font-size:14px;color:#718096;">Your go-to source for the latest in technology, web development, and digital innovation.</p>

              <!-- Social icons -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:10px auto 16px auto;">
                <tr>
                  <td style="padding:0 5px;">
                    <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
                      <img alt="Facebook" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" width="30" height="30" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://x.com/diamonddegesh" title="Twitter">
                      <img alt="Twitter" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" width="25" height="20" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://github.com/Donvine254" title="GitHub">
                      <img alt="GitHub" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png" width="20" height="20" style="display:block;">
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#718096;">
                <a href="https://techtales.vercel.app/privacy" style="color:#2563eb;text-decoration:none;">Privacy Policy</a>
                &nbsp;|&nbsp;
                <a href="https://techtales.vercel.app/contact" style="color:#2563eb;text-decoration:none;">Contact Details</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
export const AccountDeletionTemplate = (
  name: string,
  email: string,
  keepBlogs: boolean,
  keepComments: boolean,
) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Deleted – Techtales</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;line-height:1.6;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fa;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:24px 20px;background-color:#ffffff;border-bottom:1px solid #e2e8f0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1753723016/tech-tales/profile-pictures/akaochvmlgkm24dvc0lf.png" alt="Techtales Logo" width="30" height="30" style="display:block;border-radius:10px;">
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:20px;font-weight:bold;color:#2563eb;">Techtales.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:40px 30px;">

              <p style="font-size:22px;font-weight:700;color:#dc2626;margin:0 0 8px 0;">Account Deleted 🗑️</p>
              <p style="font-size:16px;font-weight:600;color:#2d3748;margin:0 0 24px 0;">Dear ${name},</p>

              <p style="font-size:15px;color:#4a5568;margin:0 0 16px 0;line-height:1.8;">
                We are writing to confirm that your Techtales account associated with the email address <strong>${email}</strong> has been permanently deleted. The following actions have been carried out:
              </p>

              <!-- Actions taken list -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#f7fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px;">

                    <!-- Blogs row -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                      <tr>
                        <td width="24" style="vertical-align:top;padding-top:2px;">
                          <span style="font-size:16px;">📝</span>
                        </td>
                        <td style="padding-left:10px;font-size:14px;color:#4a5568;line-height:1.8;">
                          <strong style="color:#2d3748;">Blogs:</strong>&nbsp;${
                            keepBlogs
                              ? "As per your choice, all your blog posts have been anonymized and assigned to a deleted author. They remain archived and publicly available. All identifiable data has been removed."
                              : "All of your blog posts have been permanently deleted and removed from our servers. This action cannot be undone."
                          }
                        </td>
                      </tr>
                    </table>

                    <!-- Comments row -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                      <tr>
                        <td width="24" style="vertical-align:top;padding-top:2px;">
                          <span style="font-size:16px;">💬</span>
                        </td>
                        <td style="padding-left:10px;font-size:14px;color:#4a5568;line-height:1.8;">
                          <strong style="color:#2d3748;">Responses:</strong>&nbsp;${
                            keepComments
                              ? "As per your choice, all your responses have been anonymized and assigned to a deleted author. They remain publicly visible. All identifiable data has been removed."
                              : "All of your responses have been permanently deleted and removed from our servers. This action cannot be undone."
                          }
                        </td>
                      </tr>
                    </table>

                    <!-- Bookmarks row -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="24" style="vertical-align:top;padding-top:2px;">
                          <span style="font-size:16px;">🔖</span>
                        </td>
                        <td style="padding-left:10px;font-size:14px;color:#4a5568;line-height:1.8;">
                          <strong style="color:#2d3748;">Bookmarks &amp; Favorites:</strong>&nbsp;Your bookmarks and favorites have been permanently deleted and removed from our servers.
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <p style="font-size:15px;color:#4a5568;margin:0 0 16px 0;line-height:1.8;">
                If you deleted your account by mistake, you are always welcome to create a new account using this email address.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px 0;">
                    <a href="https://techtales.vercel.app/register" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:16px;text-align:center;">
                      Create a New Account
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Info note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#fef5e7;border-left:4px solid #f6ad55;border-radius:0 6px 6px 0;padding:15px 20px;">
                    <p style="margin:0;font-size:14px;color:#744210;">
                      <strong>Note:</strong> All of your personal data has been permanently removed from our servers in accordance with our
                      <a href="https://techtales.vercel.app/privacy" style="color:#744210;text-decoration:underline;">Privacy Policy</a>.
                      This action is irreversible. This is an automated message — please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="font-size:15px;color:#4a5568;margin:0 0 4px 0;line-height:1.8;">We're sorry to see you go, and hope to see you again someday.</p>
              <p style="font-size:15px;color:#2d3748;font-weight:600;margin:0;">Don &mdash; Founder, Techtales</p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px 0;font-size:16px;font-weight:bold;color:#2563eb;">Techtales.</p>
              <p style="margin:0 0 16px 0;font-size:14px;color:#718096;">Your go-to source for the latest in technology, web development, and digital innovation.</p>
              <!-- Social icons -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:10px auto 16px auto;">
                <tr>
                  <td style="padding:0 5px;">
                    <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
                      <img alt="Facebook" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" width="30" height="30" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://x.com/diamonddegesh" title="Twitter">
                      <img alt="Twitter" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" width="25" height="20" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://github.com/Donvine254" title="GitHub">
                      <img alt="GitHub" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png" width="20" height="20" style="display:block;">
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#718096;">
                <a href="https://techtales.vercel.app/privacy" style="color:#2563eb;text-decoration:none;">Privacy Policy</a>
                &nbsp;|&nbsp;
                <a href="https://techtales.vercel.app/contact" style="color:#2563eb;text-decoration:none;">Contact Details</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
/*Email template for magic link login method*/
export const MagicLinkEmailTemplate = (link: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login to your Techtales Account</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;line-height:1.6;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fa;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:24px 20px;background-color:#ffffff;border-bottom:1px solid #e2e8f0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1753723016/tech-tales/profile-pictures/akaochvmlgkm24dvc0lf.png" alt="Techtales Logo" width="30" height="30" style="display:block;border-radius:10px;">
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:20px;font-weight:bold;color:#2563eb;">Techtales.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:40px 30px;">
              <p style="font-size:18px;font-weight:600;color:#2d3748;margin:0 0 20px 0;">Hello there,</p>
              <p style="font-size:16px;color:#4a5568;margin:0 0 30px 0;line-height:1.7;">
                Click the button below to securely log in to your Techtales account. No password needed.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:20px 0;">
                    <a href="${link}" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:16px;text-align:center;">
                      Log In to Techtales
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#f7fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px;">
                    <p style="margin:0 0 10px 0;font-size:14px;color:#718096;"><strong>Button not working?</strong> Copy and paste this link into your browser:</p>
                    <a href="${link}" style="color:#2563eb;word-break:break-all;font-size:14px;text-decoration:none;">${link}</a>
                  </td>
                </tr>
              </table>

              <!-- Security note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td style="background-color:#fef5e7;border-left:4px solid #f6ad55;border-radius:0 6px 6px 0;padding:15px 20px;">
                    <p style="margin:0;font-size:14px;color:#744210;">
                      <strong>Note:</strong> This magic link expires in 15 minutes for your security. Do not share this link with anyone. This is an automated message — please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px 0;font-size:16px;font-weight:bold;color:#2563eb;">Techtales.</p>
              <p style="margin:0 0 16px 0;font-size:14px;color:#718096;">Your go-to source for the latest in technology, web development, and digital innovation.</p>

              <!-- Social icons -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:10px auto 16px auto;">
                <tr>
                  <td style="padding:0 5px;">
                    <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
                      <img alt="Facebook" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" width="30" height="30" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://x.com/diamonddegesh" title="Twitter">
                      <img alt="Twitter" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" width="25" height="20" style="display:block;">
                    </a>
                  </td>
                  <td style="padding:0 5px;">
                    <a href="https://github.com/Donvine254" title="GitHub">
                      <img alt="GitHub" src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723321813/logos/d1hxxf2dtrw07h2jqsdw.png" width="20" height="20" style="display:block;">
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#718096;">
                <a href="https://techtales.vercel.app/privacy" style="color:#2563eb;text-decoration:none;">Privacy Policy</a>
                &nbsp;|&nbsp;
                <a href="https://techtales.vercel.app/contact" style="color:#2563eb;text-decoration:none;">Contact Details</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
