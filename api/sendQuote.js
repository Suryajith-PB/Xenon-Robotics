import nodemailer from "nodemailer"

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use POST.",
    })
  }

  try {
    const { name, email, phone, organization, projectType, description, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, and phone are required.",
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      })
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Determine if this is a quote request or general contact
    const isQuoteRequest = projectType && description
    const emailSubject = isQuoteRequest
      ? `Quote Request - ${projectType || "General Inquiry"}`
      : subject || "Contact Form Submission"

    // Prepare email content
    let emailBody = ""

    if (isQuoteRequest) {
      // Quote request format
      emailBody = `
New Quote Request from Xenon Robotics Website

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
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

    // Send email
    await transporter.sendMail(mailOptions)

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully! We will get back to you soon.",
    })
  } catch (error) {
    console.error("Email sending error:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later or contact us directly.",
    })
  }
}
