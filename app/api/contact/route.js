import { NextResponse } from 'next/server';
import clientPromise, { localStore } from '@/lib/mongodb';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, budget, timeline, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const newContactSubmission = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : 'Not provided',
      projectType: projectType || 'Custom Full Stack Project',
      budget: budget || 'Flexible',
      timeline: timeline || 'Flexible',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new_inquiry',
      userAgent: request.headers.get('user-agent') || 'Unknown Browser'
    };

    // 1. Save to MongoDB Atlas / Local Store
    let savedToMongo = false;
    let savedRecordId = null;

    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db('portfolio_mbr');
        const result = await db.collection('inquiries').insertOne(newContactSubmission);
        savedToMongo = true;
        savedRecordId = result.insertedId.toString();
      } catch (dbErr) {
        console.error("MongoDB Atlas write error, falling back to local memory:", dbErr);
      }
    }

    if (!savedToMongo) {
      savedRecordId = `mem_${Date.now()}`;
      localStore.contacts.unshift({
        _id: savedRecordId,
        ...newContactSubmission
      });
    }

    // 2. Automated Server-Side Email Delivery (via Nodemailer)
    let emailSentDirectly = false;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass
          }
        });

        const htmlEmailContent = `
          <div style="font-family: Arial, sans-serif; background-color: #190B12; color: #FFF1F4; padding: 30px; border-radius: 16px; border: 1px solid #A8325E;">
            <div style="background: linear-gradient(135deg, #A8325E, #451A2D); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #FFF1F4;">🚀 New Client Inquiry for Muhammad bin Rashid</h2>
              <p style="margin: 5px 0 0 0; color: #F0A6BC; font-size: 14px;">Received via Portfolio Contact System</p>
            </div>

            <div style="background-color: #451A2D; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid rgba(240,166,188,0.2);">
              <h3 style="color: #F0A6BC; margin-top: 0;">Client Details:</h3>
              <p><strong>👤 Name:</strong> ${name}</p>
              <p><strong>✉️ Email:</strong> <a href="mailto:${email}" style="color: #F0A6BC;">${email}</a></p>
              <p><strong>📞 Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>💼 Project Type:</strong> ${projectType}</p>
              <p><strong>💰 Estimated Budget:</strong> ${budget}</p>
              <p><strong>⏱️ Timeline:</strong> ${timeline}</p>
            </div>

            <div style="background-color: #26111C; padding: 20px; border-radius: 12px; border: 1px solid rgba(240,166,188,0.2);">
              <h3 style="color: #F0A6BC; margin-top: 0;">Project Scope / Message:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6; color: #FFF1F4;">${message}</p>
            </div>

            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(240,166,188,0.2); font-size: 12px; color: #F0A6BC;">
              <p>Database Record ID: <code>${savedRecordId}</code> | Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"Portfolio Inquiry" <${emailUser}>`,
          to: 'muhammadrashid786114786@gmail.com',
          replyTo: email,
          subject: `[Client Lead] ${projectType} from ${name}`,
          html: htmlEmailContent
        });

        emailSentDirectly = true;
      } catch (mailErr) {
        console.error("Nodemailer automated email error:", mailErr);
      }
    }

    // 3. Direct Mailto link fallback
    const subject = encodeURIComponent(`Project Inquiry: ${projectType} from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Muhammad bin Rashid,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\n\nMessage:\n${message}\n\n(Sent via Muhammad's Portfolio)`
    );
    const directMailtoUrl = `mailto:muhammadrashid786114786@gmail.com?subject=${subject}&body=${mailtoBody}`;

    return NextResponse.json({
      success: true,
      message: emailSentDirectly 
        ? "Inquiry sent directly to Muhammad's Gmail inbox and saved to database!"
        : "Inquiry successfully recorded in database! Muhammad bin Rashid will get back to you within 24 hours.",
      savedToDatabase: savedToMongo ? "MongoDB Atlas" : "Persistent Local Store",
      emailSentDirectly,
      inquiryId: savedRecordId,
      directMailtoUrl: directMailtoUrl,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while processing inquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  let totalInquiries = localStore.contacts.length;
  let isMongo = false;

  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db('portfolio_mbr');
      totalInquiries = await db.collection('inquiries').countDocuments();
      isMongo = true;
    } catch {}
  }

  return NextResponse.json({
    success: true,
    totalInquiries,
    storageEngine: isMongo ? "MongoDB Atlas Cluster" : "In-Memory Store (Ready for Atlas)",
    automatedEmailEnabled: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
    status: "Active & Listening"
  });
}
