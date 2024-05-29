import nodemailer from 'nodemailer';

const sendEmailToUser = async (to, subject, ticketDetails) => {
    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.ENQUIRY_EMAIL_ID,
            pass: process.env.ENQUIRY_EMAIL_PASS
        }
    });

    const emailContent =
        `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Valence Reset Email</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@200;300;400;500;600;700&display=swap');
    
            body {
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
                font-family: 'Bai Jamjuree', sans-serif, Arial, sans-serif;
            }
    
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #dddddd;
                padding: 20px;
            }
    
            .footer-wrapper {
                width: 100%;
                height: auto;
            }
    
            .footer-wrapper img {
                width: 100%;
                height: auto;
            }
    
            .logo-wrapper {
                width: 200px;
            }
    
            .logo-wrapper img {
                width: 100%;
                height: auto;
            }
    
            .content-container .reset-btn {
                display: inline-block;
                text-decoration: none;
                color: white;
                padding: 15px 20px;
                border-radius: 3px;
                background-color: #2d4798;
                margin: 20px 0px 10px 0px;
            }
    
            .content-container p {
                color: #4b4a4c;
            }
    
            @media only screen and (max-width: 600px) {
                .email-container {
                    padding: 10px;
                }
    
                .content-container .reset-btn {
                    padding: 10px 15px;
                    font-size: 14px;
                }
    
                .content-container p {
                    font-size: 14px;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="email-container">
            <div class="logo-wrapper">
                <img src="https://firebasestorage.googleapis.com/v0/b/valence-am-d9394.appspot.com/o/image-6.png?alt=media&token=cad2cb37-e4b6-4f37-bb93-09d360398201"
                    alt="Valence">
            </div>
            <div class="content-container">
                <p><b>Acknowledgement No: ${ticketDetails.ticket_id}</b></p>
                <p>Hi ${ticketDetails.name},</p>
                <p>Thank you for your input!</p>
                <p>Here are your recorded details:</p>

                <p><b>Subject: </b>${ticketDetails.subject}</p>
                <p><b>Message: </b>${ticketDetails.message}</p>
                <p>We’ve received your feedback and our team will take a look at it soon. Expect to hear from us shortly!
                </p>
                <p>Should you wish to provide more information or communicate directly with us, please reply to this email.
                </p>
                <p>Thanks,<br>The Valence Team</p>
            </div>
            <div class="footer-wrapper">
                <img src="https://firebasestorage.googleapis.com/v0/b/valence-am-d9394.appspot.com/o/2024_Email_Template.jpg?alt=media&token=ed536332-9302-4fe2-bf2b-99a5880b7d07"
                    alt="House of Composite Consumables">
            </div>
        </div>
    </body>
    
    </html>
`;


    const mailOptions = {
        from: process.env.ENQUIRY_EMAIL_ID,
        to: ["enquiry@valence-am.com", to],
        subject,
        html: emailContent
    };

    await transporter.sendMail(mailOptions);
};

export { sendEmailToUser as sendGetInTouchUserEmail }
