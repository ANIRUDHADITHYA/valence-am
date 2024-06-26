import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, order_detail, user) => {
    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.ENQUIRY_EMAIL_ID,
            pass: process.env.ENQUIRY_EMAIL_PASS
        }
    });

    const emailContent = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valence Order Email</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet">
    <style>
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

        .footer-wrapper img {
            width: 100%;
            height: auto;
        }

        .logo-wrapper img {
            width: 200px;
            height: auto;
        }

        .reset-btn {
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

        .order-container {
            border-bottom: 1px solid #b2b2b2;
            padding: 20px 0;
        }

        .product-details h1,
        .product-details h2,
        .product-details h3 {
            margin: 0;
        }

        .product-details h1 {
            font-size: 18px;
            color: #2d4798;
            font-weight: 500;
        }

        .product-details h2 {
            font-size: 12px;
            color: #4b4a4c;
            font-weight: 500;
        }

        .product-details h3 {
            color: #4b4a4c;
            font-weight: 400;
            font-size: 12px;
        }

        .qty-class p {
            text-align: center;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                padding: 10px;
            }

            .reset-btn {
                padding: 10px 15px;
                font-size: 14px;
            }

            .content-container p {
                font-size: 14px;
            }

            .product-details h1 {
                font-size: 16px;
            }

            .product-details h2 {
                font-size: 10px;
            }

            .product-details h3 {
                font-size: 9px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="logo-wrapper">
            <img src="https://cdn-images.valence-am.com/logo.png" alt="Valence">
        </div>
        <div class="content-container">
            <p><b>Order No: ${order_detail.order_id}</b></p>
            <p>Hi ${user.name},</p>
            <p>We're grateful you've chosen our products.</p>
            <p>Below, you'll find the requested products, along with their specifications and quantity.</p>
            ${order_detail.orders.map(orderItem =>
        `
            <div class="order-container">
                <table role="presentation" width="100%">
                    <tr>
                        <td width="120">
                            <img src="https://cdn-images.valence-am.com/${orderItem.product_id}.jpg"
                                alt="${orderItem.product_id}" width="120" height="120">
                        </td>
                        <td style="padding-left: 10px;">
                            <table role="presentation" width="100%">
                                <tr>
                                    <td>
                                        <h1 style="font-size: 16px; font-weight: 500; color: #2d4798; margin: 0;">
                                            ${orderItem.product_name}</h1>
                                        <h2
                                            style="font-size: 14px; font-weight: 500; color: #4b4a4c; margin-top: 2px; margin-bottom: 5px;">
                                            ${orderItem.product_category}</h2>
                                            
                                        ${orderItem.product_properties.map(prop => `
                                        <h3
                                            style="font-size: 12px; color: #4b4a4c; font-weight: 400; margin-top: 3px; margin-bottom: 0px;">
                                            <b>${prop.property_name}:</b> ${prop.value} ${prop.unit}
                                            <br>${prop.custom_value}</br>
                                        </h3>
                                        `).join('')}
                                    </td>
                                    <td class="qty-class">
                                    <p>${orderItem.quantity} <span style="padding-left: 10px;"><b>QTY</b></span></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            `).join('')}
            <p>Our team will be contacting you shortly through <b>${user.mobile}</b> and <b>${user.email}</b> to discuss the details further and present our official offer.</p>
            <p>Should you wish to provide more information or communicate directly with us, please reply to this email.
            </p>
            <p>Thanks,<br>The Valence Team</p>
        </div>
        <div class="footer-wrapper">
            <img src="https://cdn-images.valence-am.com/email-footer.jpg" alt="House of Composite Consumables">
        </div>
    </div>
</body>

</html>
    `;

    const userMailOptions = {
        from: process.env.ENQUIRY_EMAIL_ID,
        to: ["enquiry@valence-am.com", to],
        subject,
        html: emailContent
    };

    await transporter.sendMail(userMailOptions);
};

export { sendEmail as sendOrderEmail };
