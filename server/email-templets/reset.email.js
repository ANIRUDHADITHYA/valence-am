import nodemailer from 'nodemailer';


const sendEmail = async (to, subject, name, url) => {

    const templete = `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valence | Reset Email</title>
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
            <img src="https://cdn-images.valence-am.com/logo.png"
                alt="Valence">
        </div>
        <div class="content-container">
            <p>Hi ${name},</p>
            <p>We received a request to reset your password for your Valence account.</p>
            <p>If you didn't make the request, just ignore this message. Otherwise, you can reset your passsword.</p>

            <a href=${url} class="reset-btn">Reset Password</a>

            <p style="font-size: 14px; color: #7c7c7c;"><i>This link will expire in 5 Minutes for security reasons. If
                    the link has expired, you can request a
                    new password reset by visiting www.valence-am.com/lost-password.</i></p>

            <p>Thanks,<br>The Valence Team</p>
        </div>
        <div class="footer-wrapper">
            <img src="https://cdn-images.valence-am.com/email-footer.jpg"
                alt="House of Composite Consumables">
        </div>
    </div>
</body>

</html>
    `;


    try {
        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NO_REPLY_EMAIL_ID,
                pass: process.env.NO_REPLY_EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.NO_REPLY_EMAIL_ID,
            to,
            subject,
            html: templete
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error.message)
        throw new Error(`Error sending email: ${error.message}`);
    }
};

export { sendEmail as sendResetEmail }
