"use client"

import type React from "react"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Menu,
  X,
  ArrowRight,
  Zap,
  Cpu,
  Bot,
  Wifi,
  Users,
  Circle,
  Factory,
  Lightbulb,
  GraduationCap,
  Rocket,
  Building,
  Cog,
  HeadphonesIcon,
  Target,
  Award,
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Instagram,
  Linkedin,
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

export default function ServicesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)
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
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])

  // Handle navigation with scroll to top
  const handleNavigation = (href: string) => {
    setIsMenuOpen(false)
    // Small delay to ensure menu closes before navigation
    setTimeout(() => {
      window.location.href = href
    }, 100)
  }

  // Handle navigation to contact page
  const handleContactNavigation = () => {
    setIsMenuOpen(false)
    setTimeout(() => {
      window.location.href = "/contact"
    }, 100)
  }

  // Handle smooth scroll to contact section (fallback for current page)
  const scrollToContact = () => {
    handleContactNavigation()
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      console.log('Submitting form with values:', values)
      
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

  const services = [
    {
      id: 1,
      icon: <Zap className="w-8 h-8 stroke-1" />,
      title: "Automation Systems",
      tagline: "Streamlining Factories for the Future",
      useCases: [
        "Smart conveyor belt control systems for packaging lines",
        "Automated quality inspection with vision systems",
        "Energy-efficient motor control for manufacturing equipment",
      ],
      image: "/images/manufacturing-robot.jpeg",
      complexity: "Enterprise",
      timeline: "8-16 weeks",
    },
    {
      id: 2,
      icon: <Cpu className="w-8 h-8 stroke-1" />,
      title: "Circuit & PCB Design",
      tagline: "Custom Electronics from Concept to Production",
      useCases: [
        "IoT sensor boards for environmental monitoring",
        "Motor driver circuits for robotic applications",
        "Communication modules for industrial equipment",
      ],
      image: "/images/pcb-design-workspace.jpeg",
      complexity: "Custom",
      timeline: "4-12 weeks",
    },
    {
      id: 3,
      icon: <Bot className="w-8 h-8 stroke-1" />,
      title: "Robotics Consulting",
      tagline: "Advanced Automation & Intelligent Machines",
      useCases: [
        "Pick-and-place robots for assembly lines",
        "Autonomous mobile robots for warehouse logistics",
        "Collaborative robots for human-machine interaction",
      ],
      image: "/images/robotic-arm.jpeg",
      complexity: "Advanced",
      timeline: "12-24 weeks",
    },
    {
      id: 4,
      icon: <Wifi className="w-8 h-8 stroke-1" />,
      title: "IoT Development",
      tagline: "Connected Intelligence for Smart Operations",
      useCases: [
        "Real-time machine monitoring dashboards",
        "Predictive maintenance alert systems",
        "Remote equipment control and diagnostics",
     ],
      image: "/images/iot-connectivity.jpeg",
      complexity: "Scalable",
      timeline: "6-14 weeks",
    },
    {
      id: 5,
      icon: <Users className="w-8 h-8 stroke-1" />,
      title: "Industry Collaboration",
      tagline: "Strategic Engineering Partnerships",
      useCases: [
        "Embedded systems integration for OEM products",
        "Technical consulting for startup hardware development",
        "Long-term engineering support for growing companies",
      ],
      image: "/images/lab-collaboration.jpeg",
      complexity: "Partnership",
      timeline: "Ongoing",
    },
  ]

  const industries = [
    {
      icon: <Factory className="w-8 h-8" />,
      name: "Manufacturing",
      description: "Smart factory automation and process optimization",
      projects: "50+ projects",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      name: "Research",
      description: "Advanced R&D instrumentation and control systems",
      projects: "25+ projects",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      name: "Education",
      description: "Educational robotics and laboratory equipment",
      projects: "15+ projects",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      name: "Startups",
      description: "Rapid prototyping and MVP development",
      projects: "30+ projects",
    },
    {
      icon: <Building className="w-8 h-8" />,
      name: "Enterprise",
      description: "Large-scale automation and system integration",
      projects: "20+ projects",
    },
    {
      icon: <Cog className="w-8 h-8" />,
      name: "OEMs",
      description: "Embedded solutions for product manufacturers",
      projects: "35+ projects",
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
                className="text-gray-900 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"></span>
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
              <button
                onClick={scrollToContact}
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Get Quote
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Button
                onClick={handleContactNavigation}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
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
                <button
                  onClick={() => handleNavigation("/")}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("/services")}
                  className="block w-full text-left px-3 py-2 text-gray-900 font-medium"
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
                  onClick={scrollToContact}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  Contact
                </button>
                <div className="px-3 py-2">
                  <Button
                    onClick={handleContactNavigation}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 rounded-full"
                  >
                    Contact Us
                  </Button>
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
                <span className="text-gray-900">What We</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Build & Deliver
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl">
                Explore our specialized services — from turnkey automation systems to advanced custom robotics
                engineering — trusted by industry and innovators alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Vertical Timeline */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Engineering
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ideation to deployment, each service represents a critical phase in bringing your automation vision
              to life.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-cyan-200 to-blue-200 rounded-full"></div>

            {services.map((service, index) => (
              <div key={service.id} className="relative mb-20 last:mb-0">
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Service Block */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                  }`}
                >
                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 0 ? "lg:pr-16" : "lg:pl-16 lg:col-start-2"}`}>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                        <div className="text-blue-600">{service.icon}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-lg text-blue-600 font-medium">{service.tagline}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-900">Real-World Applications:</h4>
                      <ul className="space-y-2">
                        {service.useCases.map((useCase, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <Circle className="w-2 h-2 text-blue-600 fill-current mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Technical Image */}
                  <div className={`${index % 2 === 0 ? "lg:pl-16" : "lg:pr-16 lg:col-start-1"}`}>
                    <div className="relative group">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-80 object-cover rounded-2xl shadow-lg border border-gray-200 group-hover:shadow-xl transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-cyan-500/5 rounded-2xl"></div>
                      {/* Technical Overlay */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                        {service.complexity} Solution
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Who We
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering specialized solutions across industries, from manufacturing floors to research laboratories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300">
                      <div className="text-blue-600">{industry.icon}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-600">{industry.projects}</div>
                      <div className="text-xs text-gray-500">completed</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{industry.name}</h3>
                    <p className="text-gray-600">{industry.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-32 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 text-sm font-medium shadow-sm">
                  <MessageCircle className="w-4 h-4 mr-3 text-blue-600" />
                  Get In Touch
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
              </div>

              {/* Social Media */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-gray-900">Connect With Us</h3>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="p-4 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all duration-300 group"
                  >
                    <Instagram className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors stroke-1" />
                  </Link>
                  <Link
                    href="#"
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Start Your Project</h3>
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
                                Project Subject *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Industrial Automation System, Custom PCB Design"
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
                                Project Details *
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe your automation or robotics project requirements, technical specifications, timeline, and any specific challenges you're facing..."
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
                                Send Project Inquiry
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

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-900 to-cyan-800 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Not sure which solution
                <br />
                <span className="text-cyan-300">fits your needs?</span>
              </h2>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Every great automation solution starts with understanding your specific challenges. Let's engineer the
                perfect solution together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 px-10 py-4 text-lg rounded-full font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Schedule Consultation
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>

            {/* Technical Guarantee */}
            <div className="pt-12 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="w-5 h-5 text-cyan-300" />
                    <span className="text-cyan-300 font-semibold">Quality Assured</span>
                  </div>
                  <p className="text-blue-100 text-sm">ISO 9001 certified processes</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Target className="w-5 h-5 text-cyan-300" />
                    <span className="text-cyan-300 font-semibold">On-Time Delivery</span>
                  </div>
                  <p className="text-blue-100 text-sm">98% projects delivered on schedule</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <HeadphonesIcon className="w-5 h-5 text-cyan-300" />
                    <span className="text-cyan-300 font-semibold">Ongoing Support</span>
                  </div>
                  <p className="text-blue-100 text-sm">24/7 technical assistance</p>
                </div>
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