import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req) {
  try {
    const { ownerDetails, customerDetails} = await req.json();

    // console.log(email, subject, message);
    // Send with gmail & Nodemailer
    
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptionForOwner = {
        from: process.env.EMAIL_USER,
        to: customerDetails[0].email,
        subject: "Rentify - Owner Details",
        html:`
        <html>
          <body>
            <h2>Owner Details</h2>
            <p>Dear User,</p>
            <p>Thank you for showing interest in our property. Here are the details of the owner:</p>
            <table>
              <tr>
                <td><strong>Name:</strong></td>
                <td>${ownerDetails[0].firstname}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>${ownerDetails[0].email}</td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>${ownerDetails[0].phoneno}</td>
              </tr>
            </table>
            <p>If you have any further questions, feel free to reach out to us.</p>
            <p>Best Regards,</p>
            <p>Rentify Team</p>
          </body>
        </html>
      ` ,
        // text: message,
      };
      const mailOptionForCustomer = {
        from: process.env.EMAIL_USER,
        to: ownerDetails[0].email,
        subject: "Rentify - Customer Details",
        html:`
        <html>
          <body>
            <h2>Owner Details</h2>
            <p>Dear User,</p>
            <p>Thank you for showing interest in our property. Here are the details of the owner:</p>
            <table>
              <tr>
                <td><strong>Name:</strong></td>
                <td>${customerDetails[0].firstname}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>${customerDetails[0].email}</td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>${customerDetails[0].phoneno}</td>
              </tr>
            </table>
            <p>If you have any further questions, feel free to reach out to us.</p>
            <p>Best Regards,</p>
            <p>Rentify Team</p>
          </body>
        </html>
      ` ,
        // text: message,
      };

      await transporter.sendMail(mailOptionForOwner);
      await transporter.sendMail(mailOptionForCustomer);

      return NextResponse.json(
        { message: "Email Sent Successfully" },
        { status: 200 }
      );
    

    // Send with Resend
   
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}