"use client"

import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  ArrowRight,
  Factory,
  Microscope,
  Truck,
  TrendingUp,
  CheckCircle,
  Users,
  Clock,
  DollarSign,
  Headphones,
  Cog,
  Wifi,
  BarChart3,
  Settings,
  Target,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function IndustriesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Handle navigation to contact page
  const handleContactNavigation = () => {
    setIsMenuOpen(false)
    setTimeout(() => {
      window.location.href = "/contact"
    }, 100)
  }

  const services = [
    {
      icon: <Cog className="w-8 h-8 stroke-1" />,
      title: "Custom Automation Solutions",
      description: "Tailored automation systems designed specifically for your workflow and requirements.",
    },
    {
      icon: <Wifi className="w-8 h-8 stroke-1" />,
      title: "IoT and Smart Monitoring",
      description: "Real-time monitoring and control systems with cloud integration and analytics.",
    },
    {
      icon: <Settings className="w-8 h-8 stroke-1" />,
      title: "Prototype to Deployment Support",
      description: "Complete development cycle from initial concept to full-scale deployment.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 stroke-1" />,
      title: "PCB and Control System Development",
      description: "Custom circuit boards and control systems for industrial applications.",
    },
    {
      icon: <Headphones className="w-8 h-8 stroke-1" />,
      title: "Technical Consulting and Support",
      description: "Expert guidance and ongoing support for your technical challenges.",
    },
  ]

  const benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Scalable, practical systems tailored to your needs",
      color: "text-blue-600",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Cost-effective, modern solutions",
      color: "text-green-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Local maintenance and upgrade support",
      color: "text-purple-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "On-site training for your team",
      color: "text-orange-600",
    },
  ]

  const industries = [
    {
      icon: <Factory className="w-12 h-12" />,
      title: "Manufacturing",
      description: "Smart factory automation, quality control systems, and process optimization solutions.",
      benefits: ["Reduced downtime", "Improved quality", "Cost savings"],
      image: "/images/manufacturing-robot.jpeg",
    },
    {
      icon: <Microscope className="w-12 h-12" />,
      title: "Research Labs",
      description: "Precision instrumentation, data collection systems, and automated testing equipment.",
      benefits: ["Accurate results", "Time efficiency", "Reproducible processes"],
      image: "/images/lab-collaboration.jpeg",
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Service Sectors",
      description: "Customer service automation, inventory management, and operational efficiency tools.",
      benefits: ["Better service", "Streamlined operations", "Enhanced productivity"],
      image: "/images/iot-connectivity.jpeg",
    },
  ]

  const stats = [
    {
      number: "50+",
      label: "Manufacturing Units Served",
      icon: <Factory className="w-8 h-8" />,
    },
    {
      number: "25+",
      label: "Research Labs Equipped",
      icon: <Microscope className="w-8 h-8" />,
    },
    {
      number: "95%",
      label: "Efficiency Improvement",
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      number: "24/7",
      label: "Technical Support",
      icon: <Headphones className="w-8 h-8" />,
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
                className="text-gray-900 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Industries
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"></span>
              </Link>
              <Link
                href="/quote"
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                Get Quote
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
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
                <Link href="/industries" className="block px-3 py-2 text-gray-900 font-medium">
                  Industries
                </Link>
                <Link href="/quote" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
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
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
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
            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-gray-900">Your Technical Partner</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  for Automation & Innovation
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl">
                We partner with industries to bring smart automation, robotics, and IoT integration to your workflows.
                We work as your technical extension, helping you implement efficient, practical solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              What We
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed to transform your industrial operations and drive efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 w-fit group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300">
                    <div className="text-blue-600">{service.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Partner with
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                Xenon Robotics?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring unique advantages that make us the ideal technical partner for your automation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl border border-gray-200">
                <div className={`p-2 rounded-lg ${benefit.color} bg-opacity-10`}>
                  <div className={benefit.color}>{benefit.icon}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-900 font-medium">{benefit.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Industries We
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've helped manufacturing units, research labs, and service sectors improve efficiency and reduce
              downtime using intelligent automation.
            </p>
          </div>

          <div className="space-y-24">
            {industries.map((industry, index) => (
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
                          <div className="text-blue-600">{industry.icon}</div>
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">{industry.title}</h3>
                      </div>
                      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
                    </div>

                    <p className="text-xl text-gray-600 leading-relaxed">{industry.description}</p>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Key Benefits:</h4>
                      {industry.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8">
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div className="relative group">
                      <img
                        src={industry.image || "/placeholder.svg"}
                        alt={industry.title}
                        className="w-full h-80 lg:h-[400px] object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-cyan-500/5 rounded-3xl group-hover:from-blue-600/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-900 to-cyan-800 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Ready to transform
                <br />
                <span className="text-cyan-300">your operations?</span>
              </h2>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Let's discuss how our automation solutions can drive efficiency, reduce costs, and improve productivity
                in your industry.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 border-0 px-10 py-4 text-lg rounded-full font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                onClick={() => window.location.href = "/quote"}
              >
                Get Started Today
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg rounded-full font-medium transition-all duration-300 bg-transparent"
                onClick={() => window.location.href = "/quote"}
              >
                Schedule Consultation
              </Button>
            </div>

            {/* Contact Info */}
            <div className="pt-16 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-5 h-5 text-cyan-300" />
                    <span className="text-cyan-300 font-semibold">Call Us</span>
                  </div>
                  <Link href="tel:+917012152526" className="text-blue-100 hover:text-white transition-colors">
                    +91 7012152526
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-5 h-5 text-cyan-300" />
                    <span className="text-cyan-300 font-semibold">Email Us</span>
                  </div>
                  <Link
                    href="mailto:xenonroboticsofficial@gmail.com"
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    xenonroboticsofficial@gmail.com
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-cyan-300" />
                    <span className="text-cyan-300 font-semibold">WhatsApp</span>
                  </div>
                  <Link href="https://wa.me/917012152526" className="text-blue-100 hover:text-white transition-colors">
                    Quick Chat
                  </Link>
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
