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
    
            .order-container {
                display: flex;
                padding-top: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid #b2b2b2;
                align-items: center;
            }
    
            .order-container img {
                width: 120px;
                height: 120px;
            }
    
            .product-details {
                padding-left: 20px;
            }
    
            .product-details-container {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                width: 100%;
            }
    
            .product-details-container h1,
            .product-details-container h2,
            .product-details-container h3 {
                padding: 0;
                margin: 0;
            }
    
            .product-details-container h1 {
                font-size: 18px;
                color: #2d4798;
                font-weight: 500;
                margin: 0;
                cursor: pointer;
            }
    
            .product-details-container h2 {
                font-size: 12px;
                color: #4b4a4c;
                margin: 0;
                padding-top: 2px;
                padding-bottom: 5px;
                font-weight: 500;
            }
    
            .product-details-container h3 {
                padding-top: 5px;
                margin: 0;
                color: #4b4a4c;
                font-weight: 400;
                font-size: 12px;
            }
    
            .product-details-container p span {
                padding-left: 20px;
            }

            .product-details-container p {
                padding-left: 50px;
                padding-top: 25px;
            }
    
            .qty-class {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .qty-class p{
                text-align: center;
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
    
                .product-details-container h1 {
                    font-size: 16px;
                }
    
                .product-details-container h2 {
                    font-size: 10px;
                }
    
                .product-details-container h3 {
    
                    font-size: 9px;
                }
    
                .product-details-container p span {
                    padding-left: 10px;
                }
    
                .order-container img {
                    width: 100px;
                    height: 100px;
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
                <p><b>Order No: ${order_detail.order_id}</b></p>
                <p>Hi ${user.name},</p>
                <p>We're grateful you've chosen our products.</p>
                <p>Below, you'll find the requested products, along with their specifications and quantity.</p>
                ${order_detail.orders.map(orderItem =>
        `
                    <div class="order-container">
                        <img src=https://cdn.valence-am.site/${orderItem.product_id}.jpg alt=${orderItem.product_id}>
                        <div class="product-details-container">
                        <div class="product-details" style="flex: 1;">
                                <h1>${orderItem.product_name}</h1>
                                <h2>${orderItem.product_category}</h2>
                        ${orderItem.product_properties.map(prop => `
                        
                                <h3><b>${prop.property_name}:</b> ${prop.value} ${prop.unit}</h3>
                            
                            `).join('')}
                            </div>
                            <div class="qty-class" style="flex: 1;">
                            <p>${orderItem.quantity}<span><b>QTY</b></span></p>
                            </div
                        </div>
                    </div>
                    `).join('')}
                <p>Our team will be sending our official offer to you shortly.</p>
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




    const userMailOptions = {
        from: process.env.ENQUIRY_EMAIL_ID,
        to: ["enquiry@valence-am.com", to],
        subject,
        html: emailContent
    };

    await transporter.sendMail(userMailOptions);
};


export { sendEmail as sendOrderEmail }
