import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received request body:', body)

    const { name, email, phone, organization, projectType, description, subject, message } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: name and email are required.",
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: "Invalid email format.",
      }, { status: 400 })
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email environment variables')
      return NextResponse.json({
        success: false,
        message: "Email service configuration error. Please try again later.",
      }, { status: 500 })
    }

    console.log('Creating email transporter...')
    console.log('Email user:', process.env.EMAIL_USER)
    console.log('Email pass length:', process.env.EMAIL_PASS?.length)
    console.log('Email pass format check:', /^[a-z]{16}$/.test(process.env.EMAIL_PASS || ''))

    // Create transporter using Gmail SMTP with explicit configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log('Email transporter verified successfully')
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError)
      return NextResponse.json({
        success: false,
        message: "Email service unavailable. Please try again later.",
      }, { status: 500 })
    }

    // Determine if this is a quote request or general contact
    const isQuoteRequest = projectType && description
    const emailSubject = isQuoteRequest
      ? `Quote Request - ${projectType || "General Inquiry"} from ${name}`
      : subject || `Contact Form Submission from ${name}`

    // Prepare email content
    let emailBody = ""

    if (isQuoteRequest) {
      // Quote request format
      emailBody = `
New Quote Request from Xenon Robotics Website

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- Organization: ${organization || "Not specified"}

Project Details:
- Project Type: ${projectType}
- Description: ${description}

---
This quote request was submitted through the Xenon Robotics website.
Please respond to the customer at: ${email}
      `.trim()
    } else {
      // General contact format
      emailBody = `
New Contact Form Submission from Xenon Robotics Website

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- Organization: ${organization || "Not specified"}

Subject: ${subject || "General Inquiry"}

Message:
${message || description || "No message provided"}

---
This message was submitted through the Xenon Robotics website.
Please respond to the customer at: ${email}
      `.trim()
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "xenonroboticsofficial@gmail.com",
      subject: emailSubject,
      text: emailBody,
      replyTo: email,
    }

    console.log('Sending email with options:', {
      ...mailOptions,
      text: '[EMAIL CONTENT HIDDEN]'
    })

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! We will get back to you soon.",
    })
  } catch (error) {
    console.error("Email sending error:", error)

    // More specific error messages
    let errorMessage = "Failed to send message. Please try again later or contact us directly."
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid login') || error.message.includes('EAUTH') || error.message.includes('535')) {
        console.error('Gmail authentication failed. Credentials:', {
          user: process.env.EMAIL_USER,
          passLength: process.env.EMAIL_PASS?.length,
          passPreview: process.env.EMAIL_PASS?.substring(0, 4) + '...'
        })
        errorMessage = "Email authentication failed. Please check Gmail App Password setup."
      } else if (error.message.includes('Network')) {
        errorMessage = "Network error. Please check your connection and try again."
      }
    }

    return NextResponse.json({
      success: false,
      message: errorMessage,
    }, { status: 500 })
  }
}
