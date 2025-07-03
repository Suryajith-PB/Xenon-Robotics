"use client"

import type React from "react"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Instagram,
  Linkedin,
  Clock,
  Users,
  Award,
  Target,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false)
    setTimeout(() => {
      window.location.href = href
    }, 100)
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      console.log('Submitting contact form with values:', values)
      
      const response = await fetch("/api/sendQuote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response result:', result)

      if (response.ok && result.success) {
        setIsSubmitted(true)
        setSubmitMessage(result.message)
        form.reset()
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitMessage(
        error instanceof Error 
          ? error.message 
          : "There was an error processing your request. Please try again or contact us directly."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center" onClick={() => handleNavigation("/")}>
                <img
                  src="/images/xenon-logo.png"
                  alt="XENON Robotics"
                  className="h-8 w-auto hover:opacity-80 transition-opacity duration-300"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/")
                }}
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/services"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/services")
                }}
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/about"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/about")
                }}
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/industries"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/industries")
                }}
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Industries
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/quote"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/quote")
                }}
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Get Quote
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
                <button
                  onClick={() => handleNavigation("/")}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("/services")}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  Services
                </button>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavigation("/industries")}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  Industries
                </button>
                <button
                  onClick={() => handleNavigation("/quote")}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  Get Quote
                </button>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="block w-full text-left px-3 py-2 text-gray-900 font-medium"
                >
                  Contact
                </button>
                <div className="px-3 py-2">
                  <Link href="/contact">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 rounded-full">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 pt-20">
        {/* Technical Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e40af" strokeWidth="0.5" />
              </pattern>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#1e40af" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Blueprint Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
          <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl space-y-8">
            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-gray-900">Get In Touch</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Let's Build Something Amazing
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl">
                Ready to transform your ideas into reality? Our team of engineers and innovators is here to help you create the future with cutting-edge automation and robotics solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium shadow-sm">
                  <MessageCircle className="w-4 h-4 mr-3 text-blue-600" />
                  Contact Information
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Ready to Engineer
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Your Solution?
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Let's discuss your automation and robotics requirements. Our engineering team is ready to transform
                  your technical challenges into innovative solutions.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <MapPin className="h-6 w-6 text-blue-600 stroke-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900">Engineering Hub</h3>
                    <p className="text-gray-600">
                      Xenon Robotics
                      <br />
                      CITTIC CUSAT, Ernakulam
                      <br />
                      Kerala, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <Phone className="h-6 w-6 text-blue-600 stroke-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900">Direct Line</h3>
                    <Link
                      href="tel:+917012152526"
                      className="text-gray-600 hover:text-blue-600 transition-colors text-lg"
                    >
                      +91 7012152526
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <Mail className="h-6 w-6 text-blue-600 stroke-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900">Email</h3>
                    <Link
                      href="mailto:xenonroboticsofficial@gmail.com"
                      className="text-gray-600 hover:text-blue-600 transition-colors text-lg"
                    >
                      xenonroboticsofficial@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <Clock className="h-6 w-6 text-blue-600 stroke-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900">Business Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-gray-900">Connect With Us</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.instagram.com/xenon.robotics/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all duration-300 group"
                  >
                    <Instagram className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors stroke-1" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/xenonrobotics/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all duration-300 group"
                  >
                    <Linkedin className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors stroke-1" />
                  </Link>
                  <Link
                    href="https://wa.me/917012152526"
                    className="p-4 bg-green-50 border border-green-200 rounded-2xl hover:bg-green-100 hover:border-green-300 transition-all duration-300 group"
                  >
                    <MessageCircle className="h-6 w-6 text-green-600 group-hover:text-green-700 transition-colors stroke-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-lg">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                  Full Name *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your full name"
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                  Email Address *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Subject *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Project Inquiry, Technical Support, Partnership"
                                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Message *
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your project, requirements, or how we can help you..."
                                  rows={6}
                                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="pt-4">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        </div>

                        <p className="text-xs text-gray-500 text-center">
                          By submitting this form, you agree to our privacy policy and terms of service.
                        </p>
                      </form>
                    </Form>
                  </>
                ) : (
                  <div className="text-center space-y-6 py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">
                        {submitMessage || "Your message has been sent successfully! We will get back to you soon."}
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Choose
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Xenon Robotics?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring unique advantages that make us the ideal partner for your automation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group text-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 w-fit mx-auto mb-6 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Solutions</h3>
              <p className="text-gray-600">Tailored automation systems designed specifically for your needs</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group text-center">
              <div className="p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-100 w-fit mx-auto mb-6 group-hover:from-cyan-100 group-hover:to-teal-100 transition-all duration-300">
                <Users className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Team</h3>
              <p className="text-gray-600">Experienced engineers and innovators at your service</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group text-center">
              <div className="p-4 bg-gradient-to-br from-teal-50 to-green-50 rounded-xl border border-teal-100 w-fit mx-auto mb-6 group-hover:from-teal-100 group-hover:to-green-100 transition-all duration-300">
                <Award className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Track Record</h3>
              <p className="text-gray-600">100+ successful projects and satisfied clients</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group text-center">
              <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-100 w-fit mx-auto mb-6 group-hover:from-green-100 group-hover:to-blue-100 transition-all duration-300">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Ongoing technical assistance and maintenance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                XENON
              </div>
              <p className="text-gray-400">© {new Date().getFullYear()} Xenon Robotics. All rights reserved.</p>
            </div>
            <div className="flex space-x-8 text-gray-400">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
