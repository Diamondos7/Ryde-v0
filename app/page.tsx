"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="dark-header fixed w-full top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/myryde-logo.png" alt="MyRyde Logo" width={120} height={40} className="h-10 w-auto" />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-white hover:text-green-400 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-white hover:text-green-400 transition-colors">
                How It Works
              </Link>
              <Link href="#city" className="text-white hover:text-green-400 transition-colors">
                Our City
              </Link>
              <Link href="#contact" className="text-white hover:text-green-400 transition-colors">
                Contact
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" asChild className="text-white hover:text-green-400">
                <Link href="/login">Login</Link>
              </Button>
              <button className="cta-button">
                <Link href="/signup">Sign Up</Link>
              </button>
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              <button className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-20 p-4 rounded-b-3xl">
              <div className="flex flex-col space-y-4">
                <Link href="#features" className="text-white hover:text-green-400 transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-white hover:text-green-400 transition-colors">
                  How It Works
                </Link>
                <Link href="#city" className="text-white hover:text-green-400 transition-colors">
                  Our City
                </Link>
                <Link href="#book-ride" className="text-white hover:text-green-400 transition-colors">
                  Book a Ride Now
                </Link>
                <Link href="#contact" className="text-white hover:text-green-400 transition-colors">
                  Contact
                </Link>
                <Link href="/login" className="text-white hover:text-green-400 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="text-white hover:text-green-400 transition-colors">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Rest of the component remains the same but add dark mode classes */}
      {/* Hero Section */}
      <section className="dark-hero pt-32 pb-20 text-center">
        <div className="hero-content">
          <div className="container mx-auto px-4">
            <div className="location-badge">📍 Proudly Serving Ogbomosho City</div>
            <h1
              className="text-4xl lg:text-6xl font-bold mb-6 gradient-text"
              style={{ animation: "fadeInUp 1s ease-out" }}
            >
              Smart Rides for Smart People
            </h1>
            <p className="text-xl mb-8 opacity-90" style={{ animation: "fadeInUp 1s ease-out 0.3s both" }}>
              Experience the future of transportation in Ogbomosho with enhanced safety, smart matching, and fair
              pricing
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{ animation: "fadeInUp 1s ease-out 0.6s both" }}
            >
              <button className="cta-button">Book for Later</button>
              <Link
                href="#book-ride"
                className="cta-button"
                style={{ background: "transparent", border: "2px solid #00ff87", color: "#00ff87" }}
              >
                Ryde Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Book Ride Section */}
      <section id="book-ride" className="py-20" style={{ background: "linear-gradient(135deg, #00ff87, #60efff)" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-8 items-start justify-between">
            <div className="flex-1 min-w-64 text-black">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">🚗 Ready to Ride?</h2>
              <p className="text-xl mb-6 opacity-80">
                Book your ride instantly through WhatsApp and get connected with our verified drivers in Ogbomosho.
              </p>
              <a
                href="https://wa.me/2348109600178?text=Hi%20My%20Ryde!%20I%20want%20to%20book%20a%20ride%20in%20Ogbomosho.%20Please%20help%20me%20with%20the%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-green-700 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <span className="text-2xl">📱</span>
                Book Now via WhatsApp
              </a>
            </div>
            <div className="flex-1 min-w-80 flex flex-col items-center">
              <div className="w-full max-w-sm bg-gray-100 dark:bg-gray-800 rounded-2xl h-48 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-300">Live Map Integration</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Google Maps will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Why Choose My Ryde?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card floating">
              <span className="text-5xl mb-4 block">🛡️</span>
              <h3 className="text-xl font-semibold mb-4">Enhanced Safety</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced night-time safety features with real-time tracking and emergency protocols. Your safety is our
                top priority, day and night.
              </p>
            </div>
            <div className="feature-card floating" style={{ animationDelay: "0.2s" }}>
              <span className="text-5xl mb-4 block">⚡</span>
              <h3 className="text-xl font-semibold mb-4">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI-powered ride matching optimized for day and night operational efficiency. Get matched with the
                perfect ride in seconds.
              </p>
            </div>
            <div className="feature-card floating" style={{ animationDelay: "0.4s" }}>
              <span className="text-5xl mb-4 block">💰</span>
              <h3 className="text-xl font-semibold mb-4">Fair Pricing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Transparent pricing without surge exploitation, premium rates for enhanced services. Know exactly what
                you'll pay before you ride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 text-white">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="step text-white">
              <div className="step-number">1</div>
              <h3 className="text-xl font-semibold mb-4">Request a Ride</h3>
              <p>
                Open the app and request a ride with just a few taps. Our smart system will find you the best match.
              </p>
            </div>
            <div className="step text-white">
              <div className="step-number">2</div>
              <h3 className="text-xl font-semibold mb-4">Get Matched</h3>
              <p>
                Our AI instantly connects you with a nearby driver. Track their location in real-time as they approach.
              </p>
            </div>
            <div className="step text-white">
              <div className="step-number">3</div>
              <h3 className="text-xl font-semibold mb-4">Enjoy Your Ride</h3>
              <p>
                Sit back and enjoy a safe, comfortable ride to your destination. Rate your experience when you arrive.
              </p>
            </div>
            <div className="step text-white">
              <div className="step-number">4</div>
              <h3 className="text-xl font-semibold mb-4">Pay Seamlessly</h3>
              <p>Automatic payment processing with transparent pricing. No hidden fees, no surprises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* City Focus Section */}
      <section id="city" className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Built for Ogbomosho
          </h2>
          <div
            className="text-center p-12 rounded-3xl mb-12"
            style={{ background: "linear-gradient(135deg, #00ff87, #60efff)" }}
          >
            <h2 className="text-3xl font-bold mb-4 text-black">🏙️ Your City, Your Ride</h2>
            <p className="text-xl text-black opacity-80">
              Designed specifically for Ogbomosho's unique roads, traffic patterns, and community needs. We understand
              your city like no other.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl transition-colors">
              <div className="text-4xl font-bold text-green-500 mb-2">24/7</div>
              <p className="text-gray-600 dark:text-gray-300">Available Service</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl transition-colors">
              <div className="text-4xl font-bold text-green-500 mb-2">5★</div>
              <p className="text-gray-600 dark:text-gray-300">Safety Rating</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl transition-colors">
              <div className="text-4xl font-bold text-green-500 mb-2">100%</div>
              <p className="text-gray-600 dark:text-gray-300">Local Drivers</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl transition-colors">
              <div className="text-4xl font-bold text-green-500 mb-2">₦0</div>
              <p className="text-gray-600 dark:text-gray-300">Surge Pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">My Ryde</h3>
              <p className="text-gray-400">
                Revolutionizing transportation in Ogbomosho City with smart, safe, and affordable rides.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">Quick Links</h3>
              <div className="space-y-2">
                <Link href="#features" className="block text-gray-400 hover:text-green-400 transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="block text-gray-400 hover:text-green-400 transition-colors">
                  How It Works
                </Link>
                <Link href="#city" className="block text-gray-400 hover:text-green-400 transition-colors">
                  Our City
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>📍 Ogbomosho, Oyo State</p>
                <p>📞 +234 810 960 0178</p>
                <p>✉️ hello@myryde.com</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
              </svg>
            </a>
            <a
              href="https://wa.me/2348109600178"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.029-.967-.272-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.711.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.004 2.003c-5.523 0-9.997 4.474-9.997 9.997 0 1.768.464 3.484 1.344 4.997l-1.41 5.155 5.29-1.389c1.47.805 3.13 1.24 4.773 1.24 5.523 0 9.997-4.474 9.997-9.997s-4.474-9.997-9.997-9.997zm0 18.181c-1.504 0-2.98-.393-4.253-1.137l-.305-.18-3.137.822.837-3.073-.198-.314c-.802-1.27-1.227-2.734-1.227-4.199 0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
              </svg>
            </a>
          </div>

          <p className="text-center text-gray-400 opacity-70">&copy; 2025 My Ryde. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
