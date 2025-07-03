"use client"

import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  Award,
  Cpu,
  Bot,
  Wifi,
  Wrench,
  GraduationCap,
  Building,
  Globe,
  Heart,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Handle navigation to contact page
  const handleContactNavigation = () => {
    setIsMenuOpen(false)
    setTimeout(() => {
      window.location.href = "/contact"
    }, 100)
  }

  const specializations = [
    {
      icon: <Bot className="w-8 h-8 stroke-1" />,
      title: "Robotic Systems Development",
      description: "Custom robots for automation, learning, and research.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Wifi className="w-8 h-8 stroke-1" />,
      title: "IoT Solutions",
      description: "Smart systems integrating sensors, data processing, and cloud connectivity.",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: <Cpu className="w-8 h-8 stroke-1" />,
      title: "PCB Designing and Prototyping",
      description: "Rapid, reliable circuit development for projects.",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: <Wrench className="w-8 h-8 stroke-1" />,
      title: "3D Printing and Fabrication",
      description: "Fast prototyping and low-volume manufacturing.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <GraduationCap className="w-8 h-8 stroke-1" />,
      title: "Workshops and Training",
      description: "Teaching robotics, IoT, programming, and hands-on technology skills.",
      color: "from-emerald-500 to-blue-500",
    },
  ]

  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "Constantly exploring new technologies and pushing boundaries",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "Working together to achieve extraordinary results",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Impact",
      description: "Creating solutions that make a real difference",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion",
      description: "Driven by genuine love for technology and learning",
    },
  ]

  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "State & National Recognition",
      description: "Our projects have won accolades at prestigious competitions",
      metric: "15+ Awards",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student Empowerment",
      description: "Helped hundreds of students develop practical tech skills",
      metric: "500+ Students",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Industry Partnerships",
      description: "Successful collaborations with various industry sectors",
      metric: "50+ Projects",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Innovation Pipeline",
      description: "Continuously developing cutting-edge solutions",
      metric: "25+ Patents",
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
                className="text-gray-900 hover:text-blue-600 font-medium transition-all duration-300 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"></span>
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
                <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  Home
                </Link>
                <Link href="/services" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  Services
                </Link>
                <Link href="/about" className="block px-3 py-2 text-gray-900 font-medium">
                  About
                </Link>
                <Link href="/industries" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  Industries
                </Link>
                <Link href="/quote" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  Get Quote
                </Link>
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
                <span className="text-gray-900">Building the Future,</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  One Innovation at a Time
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl">
                We design, develop, and implement innovative robotic systems, IoT solutions, and automation products to
                solve real-world problems and foster hands-on learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium">
                  Our Mission
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Empowering Through
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {" "}
                    Technology
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Xenon Robotics is a passionate robotics and technology development team committed to making advanced
                  technology accessible, practical, and impactful.
                </p>
                <p>
                  Founded with the vision of empowering students, makers, and industries, Xenon Robotics bridges the gap
                  between imagination and implementation.
                </p>
                <p>
                  At Xenon Robotics, we believe in learning by building. Our collaborative approach has helped many
                  students develop skills that translate into real opportunities.
                </p>
              </div>

              <div className="pt-8">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative group">
                <img
                  src="/images/lab-collaboration.jpeg"
                  alt="Xenon Robotics Team"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-cyan-500/10 rounded-3xl group-hover:from-blue-600/20 group-hover:to-cyan-500/20 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              What We
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                Specialize In
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expertise spans across multiple domains of technology, bringing innovative solutions to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="space-y-6">
                  <div
                    className={`p-4 bg-gradient-to-br ${spec.color} rounded-xl w-fit group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{spec.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{spec.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{spec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our approach to innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-6 group">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 w-fit mx-auto group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300">
                  <div className="text-blue-600">{value.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 text-sm font-medium shadow-sm">
                <Globe className="w-4 h-4 mr-3 text-blue-600" />
                Future Vision
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Exploring Tomorrow's
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {" "}
                  Technology
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We are constantly exploring new technologies like AI-integrated robotics, automated industry systems,
                and community-centered innovations. Our goal is to create solutions that not only solve today's
                challenges but anticipate tomorrow's needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="space-y-4 text-center">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 w-fit mx-auto">
                  <Bot className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">AI-Integrated Robotics</h3>
                <p className="text-gray-600 text-sm">Smart robots that learn and adapt to their environment</p>
              </div>
              <div className="space-y-4 text-center">
                <div className="p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-100 w-fit mx-auto">
                  <Building className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Industry 4.0 Solutions</h3>
                <p className="text-gray-600 text-sm">Automated systems for the next generation of manufacturing</p>
              </div>
              <div className="space-y-4 text-center">
                <div className="p-4 bg-gradient-to-br from-teal-50 to-green-50 rounded-xl border border-teal-100 w-fit mx-auto">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Community Innovation</h3>
                <p className="text-gray-600 text-sm">Technology solutions that benefit entire communities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Join us in shaping a
                <br />
                <span className="text-cyan-200">smarter, tech-driven future</span>
              </h2>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Whether you're a student, maker, or industry professional, let's collaborate to bring innovative ideas
                to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 border-0 px-10 py-4 text-lg rounded-full font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              onClick={() => window.location.href = "/quote"}
              >
                Start Your Project
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg rounded-full font-medium transition-all duration-300 bg-transparent"
              onClick={() => window.location.href = "/quote"}
              >
                Learn More
              </Button>
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
