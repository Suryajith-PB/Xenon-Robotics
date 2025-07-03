"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Zap,
  Cpu,
  Bot,
  Wifi,
  Users,
  Circle,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  project: z.string().min(10, "Project description must be at least 10 characters"),
})

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

  const services = [
    {
      icon: <Zap className="w-8 h-8 stroke-1" />,
      title: "Automation Systems",
      subtitle: "Industrial Process Control",
      description:
        "Transform your manufacturing processes with intelligent automation systems designed for precision, efficiency, and scalability. Our solutions integrate seamlessly with existing infrastructure.",
      features: ["Smart Manufacturing", "Process Optimization", "Quality Control Systems"],
      image: "/images/manufacturing-robot.jpeg",
    },
    {
      icon: <Cpu className="w-8 h-8 stroke-1" />,
      title: "Circuit & PCB Design",
      subtitle: "Custom Electronics Engineering",
      description:
        "From concept to production, we design and develop custom embedded circuits and PCB solutions that meet your exact specifications with industry-leading reliability.",
      features: ["Embedded Systems", "Hardware Prototyping", "Production Ready Designs"],
      image: "/images/pcb-design-workspace.jpeg",
    },
    {
      icon: <Bot className="w-8 h-8 stroke-1" />,
      title: "Robotics Consulting",
      subtitle: "Next-Generation Automation",
      description:
        "Leverage cutting-edge robotics technology to revolutionize your operations. We design, build, and deploy robotic solutions that deliver measurable results.",
      features: ["Robotic Arms", "Motion Control", "AI Integration"],
      image: "/images/robotic-arm.jpeg",
    },
    {
      icon: <Wifi className="w-8 h-8 stroke-1" />,
      title: "IoT Development",
      subtitle: "Connected Intelligence",
      description:
        "Connect your devices and systems with our comprehensive IoT solutions. Real-time monitoring, data analytics, and remote control capabilities.",
      features: ["Sensor Networks", "Cloud Integration", "Mobile Applications"],
      image: "/images/iot-connectivity.jpeg",
    },
    {
      icon: <Users className="w-8 h-8 stroke-1" />,
      title: "Industry Collaboration",
      subtitle: "Strategic Partnerships",
      description:
        "Partner with us as your dedicated electronics team. We bridge the gap between mechanical engineering and advanced electronics integration.",
      features: ["Technical Consulting", "System Integration", "Ongoing Support"],
      image: "/images/lab-collaboration.jpeg",
    },
  ]

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      project: "",
    },
  })

  const handleContactSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true)

    try {
      console.log('Submitting contact form with values:', values)
      
      const response = await fetch("/api/sendQuote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: "Project Inquiry from Homepage",
          message: values.project,
        }),
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response result:', result)

      if (response.ok && result.success) {
        setIsSubmitted(true)
        contactForm.reset()
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(
        error instanceof Error 
          ? error.message 
          : "There was an error sending your message. Please try again."
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
                  className="h-8 w_lin w-auto hover:opacity-80 transition-opacity duration-300"
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
                className="text-gray-900 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"></span>
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
              <button
                onClick={handleContactNavigation}
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
              <div className="px-2 pt-2 no-repeat bg-cover bg-center bg-[url('/images/xenon-logo.png')]">
                <button
                  onClick={() => handleNavigation("/")}
                  className="block w-full text-left px-3 py-2 text-gray-900 font-medium"
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
                  onClick={handleContactNavigation}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  Get Quote
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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-full opacity-15 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full opacity-30 blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-600 text-sm font-medium shadow-sm">
                <Circle className="w-2 h-2 fill-current mr-3" />
                Kerala's Premier Robotics Innovation Hub
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight">
                  <span className="text-gray-900">Smart</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Automation
                  </span>
                </h1>
                <p className="text-2xl lg:text-3xl text-gray-600 font-light leading-relaxed max-w-2xl">
                  Embedded solutions that transform industries through intelligent automation and cutting-edge robotics.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button
                  size="lg"
                  onClick={() => handleNavigation("/services")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 px-10 py-4 text-lg rounded-full font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Explore Solutions
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative">
                <img
                  src="/images/xenon-logo.png"
                  alt="XENON Robotics Logo"
                  className="w-full h-auto max-w-md mx-auto"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue- three text-sm font-medium mb-8">
              Our Expertise
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Comprehensive
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Robotics Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From concept to deployment, we deliver end-to-end automation and embedded solutions tailored to your
              specific industry needs.
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-32">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                          <div className="text-blue-600">{service.icon}</div>
                        </div>
                        <div className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                          {service.subtitle}
                        </div>
                      </div>

                      <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{service.title}</h3>

                      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
                    </div>

                    <p className="text-xl text-gray-600 leading-relaxed">{service.description}</p>

                    <div className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-4">
                          <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 stroke-1" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8">
                      <Button
                        onClick={() => handleNavigation("/services")}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div className="relative group">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-cyan-500/5 rounded-3xl group-hover:from-blue-600/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>

                {/* Background Decoration */}
                {index % 2 === 0 && (
                  <div className="absolute top-1/2 -right-32 w-64 h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full opacity-30 blur-3xl -z-10"></div>
                )}
                {index % 2 === 1 && (
                  <div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full opacity-30 blur-3xl -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Visual */}
            <div className="relative">
              <img
                src="/images/lab-collaboration.jpeg"
                alt="Xenon Robotics Team"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-cyan-500/5 rounded-3xl"></div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-blue-200 text-blue-600 text-sm font-medium">
                  About Xenon Robotics
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Pioneering the Future of
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Automation Technology
                  </span>
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                Kerala-based startup providing cutting-edge embedded electronics and automation services for industries,
                students, and startups. Founded by passionate engineers committed to building smart, scalable solutions.
              </p>

              <div className="flex items-center space-x-4 text-blue-600">
                <MapPin className="h-6 w-6 stroke-1" />
                <span className="font-medium text-lg">Based at CITTIC CUSAT, Ernakulam</span>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="space-y-2">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Innovation
                  </div>
                  <div className="text-gray-600">Cutting-edge technology solutions</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Excellence
                  </div>
                  <div className="text-gray-600">Premium quality deliverables</div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => handleNavigation("/about")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-32 bg-gradient-to-br from-blue-900 to-cyan-800 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                  Get In Touch
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Ready to Build
                  <br />
                  <span className="text-cyan-300">the Future?</span>
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                  Let's discuss your automation and robotics needs. Our team is ready to transform your ideas into
                  reality.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    <MapPin className="h-6 w-6 text-cyan-300 stroke-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-blue-100">
                      Xenon Robotics
                      <br />
                      CITTIC CUSAT, Ernakulam
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    <Phone className="h-6 w-6 text-cyan-300 stroke-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <Link href="tel:+917012152526" className="text-blue-100 hover:text-white transition-colors text-lg">
                      +91 7012152526
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    <Mail className="h-6 w-6 text-cyan-300 stroke-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Email</h3>
                    <Link
                      href="mailto:xenonroboticsofficial@gmail.com"
                      className="text-blue-100 hover:text-white transition-colors text-lg"
                    >
                      xenonroboticsofficial@gmail.com
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Follow Our Journey</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.instagram.com/xenon.robotics/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
                  >
                    <Instagram className="h-6 w-6 text-blue-100 group-hover:text-white transition-colors stroke-1" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/xenonrobotics/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
                  >
                    <Linkedin className="h-6 w-6 text-blue-100 group-hover:text-white transition-colors stroke-1" />
                  </Link>
                  <Link
                    href="https://wa.me/917012152526"
                    className="p-4 bg-green-500/20 border border-green-400/30 rounded-2xl hover:bg-green-500/30 transition-all duration-300 group"
                  >
                    <MessageCircle className="h-6 w-6 text-green-300 group-hover:text-green-200 transition-colors stroke-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-12">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-2xl font-bold mb-8">Start Your Project</h3>
                    <Form {...contactForm}>
                      <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={contactForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="block text-sm font-medium text-blue-100">
                                  Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your name"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-cyan-300 focus:ring-cyan-300/20 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={contactForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="block text-sm font-medium text-blue-100">
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-cyan-300 focus:ring-cyan-300/20 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={contactForm.control}
                          name="project"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium text-blue-100">
                                Project Description
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your automation or robotics project..."
                                  rows={4}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-cyan-300 focus:ring-cyan-300/20 rounded-xl"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 py-4 rounded-xl font-medium transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-blue-100">
                        Thank you for your interest! We will get back to you soon.
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-2 border-white/20 text-white hover:bg-white/10"
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