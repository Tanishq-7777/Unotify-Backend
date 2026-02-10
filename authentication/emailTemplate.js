const Verification_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification - UNOTIFY</title>
</head>
<body style="margin:0; padding:0; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="
          background-color:#1e293b;
          border-radius:24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          overflow:hidden;
          border: 1px solid rgba(255,255,255,0.1);
        ">
          <!-- Header -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #FF6B35 0%, #ff8c5a 100%);
              padding:40px 30px;
              text-align:center;
              position: relative;
            ">
              <div style="
                font-size:42px;
                font-weight:900;
                color:#ffffff;
                letter-spacing:2px;
                margin-bottom:8px;
                text-shadow: 0 2px 10px rgba(0,0,0,0.2);
              ">
                UNO<span style="color:#00d4ff;">TIFY</span>
              </div>
              <div style="
                font-size:16px;
                color:rgba(255,255,255,0.9);
                font-weight:500;
                letter-spacing:0.5px;
              ">
                Email Verification
              </div>
            </td>
          </tr>
          
          <!-- Icon Section -->
          <tr>
            <td style="padding:30px 30px 20px; text-align:center;">
              <div style="
                width:80px;
                height:80px;
                margin:0 auto;
                background: linear-gradient(135deg, #FF6B35 0%, #ff4500 100%);
                border-radius:20px;
                display:inline-flex;
                align-items:center;
                justify-content:center;
                box-shadow: 0 10px 30px rgba(255,107,53,0.4);
              ">
                <span style="font-size:40px;">📧</span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 40px 40px; color:#e2e8f0; font-size:16px; line-height:1.8;">
              <p style="margin:0 0 20px; font-size:18px; color:#ffffff;">
                Hello 👋
              </p>
              <p style="margin:0 0 20px; color:#cbd5e1;">
                Welcome to <strong style="color:#FF6B35;">UNOTIFY</strong>!  
                We're excited to have you on board. Please verify your email address using the code below.
              </p>
              
              <!-- Verification Code -->
              <div style="text-align:center; margin:35px 0;">
                <div style="
                  display:inline-block;
                  padding:20px 40px;
                  font-size:32px;
                  letter-spacing:8px;
                  font-weight:900;
                  color:#ffffff;
                  background: linear-gradient(135deg, #FF6B35 0%, #ff8c5a 100%);
                  border-radius:16px;
                  box-shadow: 0 8px 24px rgba(255,107,53,0.3);
                  border: 2px solid rgba(255,255,255,0.2);
                ">
                  {verificationCode}
                </div>
              </div>
              
              <p style="margin:0 0 20px; color:#cbd5e1;">
                This code will expire in <strong style="color:#00d4ff;">10 minutes</strong>.  
                If you didn't request this verification, you can safely ignore this email.
              </p>
              
              <div style="
                margin:30px 0;
                padding:20px;
                background:rgba(0,212,255,0.1);
                border-left:4px solid #00d4ff;
                border-radius:8px;
              ">
                <p style="margin:0; color:#cbd5e1; font-size:14px;">
                  💡 <strong style="color:#00d4ff;">Tip:</strong> Having trouble? Make sure to check your spam folder or contact our support team.
                </p>
              </div>
              
              <p style="margin:30px 0 0; color:#94a3b8; font-size:15px;">
                Best regards,<br />
                <strong style="color:#FF6B35; font-size:16px;">The UNOTIFY Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="
              background-color:#0f172a;
              padding:24px;
              text-align:center;
              border-top: 1px solid rgba(255,255,255,0.1);
            ">
              <p style="margin:0 0 12px; font-size:13px; color:#64748b;">
                © ${new Date().getFullYear()} UNOTIFY. All rights reserved.
              </p>
              <p style="margin:0; font-size:12px; color:#475569;">
                You're receiving this email because you signed up for UNOTIFY
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = { Verification_Email_Template };
