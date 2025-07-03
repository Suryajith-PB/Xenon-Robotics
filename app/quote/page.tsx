"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Menu,
  X,
  Send,
  CheckCircle,
  Users,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  Bot,
  Cog,
  Wifi,
  Cpu,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  organization: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  description: z.string().min(20, "Description must be at least 20 characters"),
})

export default function QuotePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  // Handle navigation to contact page
  const handleContactNavigation = () => {
    setIsMenuOpen(false)
    setTimeout(() => {
      window.location.href = "/contact"
    }, 100)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      projectType: "",
      description: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      console.log('Submitting quote request with values:', values)
      
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
        throw new Error(result.message || "Failed to send quote request")
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

  const projectTypes = [
    { value: "robotics", label: "Robotics", icon: <Bot className="w-4 h-4" /> },
    { value: "automation", label: "Automation", icon: <Cog className="w-4 h-4" /> },
    { value: "iot", label: "IoT", icon: <Wifi className="w-4 h-4" /> },
    { value: "pcb", label: "PCB Design", icon: <Cpu className="w-4 h-4" /> },
    { value: "workshop", label: "Workshop", icon: <GraduationCap className="w-4 h-4" /> },
    { value: "other", label: "Other", icon: <MoreHorizontal className="w-4 h-4" /> },
  ]

  const processSteps = [
    {
      step: "1",
      title: "Our team reviews your request within 24 hours",
      icon: <Users className="w-6 h-6" />,
    },
    {
      step: "2",
      title: "We'll contact you for clarification if needed",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      step: "3",
      title: "You'll get a detailed quote with a timeline",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      step: "4",
      title: "Optional consultation to kick off your project",
      icon: <ArrowRight className="w-6 h-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
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
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/services"
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/industries"
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Industries
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/quote"
                className="text-gray-900 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Get Quote
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"></span>
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Button 
                onClick={handleContactNavigation}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                Contact Us
              </Button>
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
                <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  Home
                </Link>
                <Link href="/services" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  Services
                </Link>
                <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  About
                </Link>
                <Link href="/industries" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  Industries
                </Link>
                <Link href="/quote" className="block px-3 py-2 text-gray-900 font-medium">
                  Get Quote
                </Link>
                <div className="px-3 py-2">
                  <Button 
                    onClick={handleContactNavigation}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 rounded-full">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e40af" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-300 text-gray-700 text-sm font-medium shadow-sm">
              <Send className="w-4 h-4 mr-3 text-blue-600" />
              Get a Quote
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-gray-900">Ready to bring your</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  idea to life?
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl">
                Let's build it together. Share your project details and get a comprehensive quote tailored to your
                specific requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-lg">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Project Details</h3>
                    <p className="text-gray-600 mb-8">
                      Please share as many details as possible so we can provide an accurate quote.
                    </p>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                  Name *
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
                                  Email *
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                  Phone Number *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="+91 XXXXX XXXXX"
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
                            name="organization"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                  Organization (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Company/Institution name"
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
                          name="projectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Project Type *
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
                                    <SelectValue placeholder="Select project type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {projectTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      <div className="flex items-center space-x-2">
                                        {type.icon}
                                        <span>{type.label}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Project Description *
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe your project requirements, purpose, timeline, budget range (if known), and any specific challenges you're facing..."
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
                                Sending Quote Request...
                              </>
                            ) : (
                              <>
                                Send Quote Request
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Sent!</h3>
                      <p className="text-gray-600">
                        {submitMessage ||
                          "Your quote request has been sent successfully! We will get back to you soon."}
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Process Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    What Happens
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      {" "}
                      Next?
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our streamlined process ensures you get a comprehensive quote quickly and efficiently.
                  </p>
                </div>

                <div className="space-y-8">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 pt-2">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="text-blue-600">{step.icon}</div>
                        </div>
                        <p className="text-gray-700 font-medium leading-relaxed">{step.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Need Immediate Assistance?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">For urgent queries</p>
                      <Link
                        href="tel:+917012152526"
                        className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        +91 7012152526
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-cyan-100 rounded-xl">
                      <Mail className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email us directly</p>
                      <Link
                        href="mailto:xenonroboticsofficial@gmail.com"
                        className="text-lg font-medium text-gray-900 hover:text-cyan-600 transition-colors"
                      >
                        xenonroboticsofficial@gmail.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-900 to-cyan-800 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Let's engineer your vision
                <br />
                <span className="text-cyan-300">into reality with confidence</span>
              </h2>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Join hundreds of satisfied clients who have transformed their ideas into successful projects with Xenon
                Robotics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-cyan-300">24hrs</div>
                <p className="text-blue-100">Response Time</p>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-cyan-300">100+</div>
                <p className="text-blue-100">Projects Completed</p>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-cyan-300">98%</div>
                <p className="text-blue-100">Client Satisfaction</p>
              </div>
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
