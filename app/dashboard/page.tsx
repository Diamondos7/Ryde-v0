"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  Bike,
  MapPin,
  Star,
  User,
  CreditCard,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  Navigation,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { authService, type User as UserType } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

function DashboardContent() {
  const [activeTab, setActiveTab] = useState("book-ride")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [bookingData, setBookingData] = useState({
    pickup: "",
    destination: "",
    rideType: "car",
  })
  const router = useRouter()

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleLogout = () => {
    authService.logout()
    router.push("/login")
  }

  const rideHistory = [
    {
      id: "RYD001",
      date: "2025-01-23",
      from: "Ogbomoso South",
      to: "Ogbomoso North",
      amount: "₦850",
      status: "completed",
      driver: "Adebayo M.",
      rating: 5,
    },
    {
      id: "RYD002",
      date: "2025-01-22",
      from: "Caretaker Market",
      to: "LAUTECH",
      amount: "₦650",
      status: "completed",
      driver: "Fatima A.",
      rating: 4,
    },
    {
      id: "RYD003",
      date: "2025-01-21",
      from: "Sabo Area",
      to: "Takie Square",
      amount: "₦450",
      status: "cancelled",
      driver: "Ibrahim K.",
      rating: null,
    },
  ]

  const handleBookRide = () => {
    if (!bookingData.pickup || !bookingData.destination) {
      alert("Please enter both pickup and destination locations")
      return
    }

    const message = `Hi My Ryde! I want to book a ${bookingData.rideType} ride.\n\nName: ${user?.fullName}\nPhone: ${user?.phone}\nPickup: ${bookingData.pickup}\nDestination: ${bookingData.destination}\n\nPlease confirm availability and pricing.`
    const waLink = `https://wa.me/2348109600178?text=${encodeURIComponent(message)}`
    window.open(waLink, "_blank")
  }

  const sidebarItems = [
    { id: "book-ride", label: "Book a Ride", icon: Car },
    { id: "ride-history", label: "Ride History", icon: History },
    { id: "profile", label: "Profile", icon: User },
    { id: "payment", label: "Payment", icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="dark-header sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white">
                <Menu className="w-6 h-6" />
              </button>
              <Image src="/images/myryde-logo.png" alt="MyRyde Logo" width={120} height={40} className="h-10 w-auto" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-white">
                <User className="w-5 h-5" />
                <span>Welcome, {user?.fullName?.split(" ")[0] || "User"}!</span>
              </div>
              <ThemeToggle />
              <Button variant="ghost" className="text-white hover:text-green-400" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out`}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 dark:text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Hello, {user?.fullName || "User"}</p>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-green-400 to-cyan-400 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                )
              })}
              <li>
                <button
                  onClick={() => router.push("/settings")}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          {/* Book a Ride Tab */}
          {activeTab === "book-ride" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Book a Ride</h1>
                <div className="location-badge">📍 Ogbomosho City</div>
              </div>

              {/* Live Map - Now at the top */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Live Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-80 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Interactive Map</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Google Maps integration will show your route here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Form - Now below the map */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Where to?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup" className="text-gray-700 dark:text-gray-300">
                      Pickup Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="pickup"
                        placeholder="Enter pickup location"
                        value={bookingData.pickup}
                        onChange={(e) => setBookingData({ ...bookingData, pickup: e.target.value })}
                        className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-gray-700 dark:text-gray-300">
                      Destination
                    </Label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="destination"
                        placeholder="Enter destination"
                        value={bookingData.destination}
                        onChange={(e) => setBookingData({ ...bookingData, destination: e.target.value })}
                        className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-700 dark:text-gray-300">Choose Ride Type</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setBookingData({ ...bookingData, rideType: "car" })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          bookingData.rideType === "car"
                            ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700"
                        }`}
                      >
                        <Car className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Car</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">₦300 base</div>
                      </button>
                      <button
                        onClick={() => setBookingData({ ...bookingData, rideType: "bike" })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          bookingData.rideType === "bike"
                            ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700"
                        }`}
                      >
                        <Bike className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Bike</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">₦200 base</div>
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleBookRide}
                    className="w-full h-12 text-lg font-semibold"
                    style={{
                      background: "linear-gradient(135deg, #00ff87, #60efff)",
                      border: "none",
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Book via WhatsApp
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Rides</div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">4.8</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">₦8,450</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">₦150</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Savings</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Rest of the tabs with dark mode support */}
          {/* Ride History Tab */}
          {activeTab === "ride-history" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ride History</h1>

              <div className="space-y-4">
                {rideHistory.map((ride) => (
                  <Card key={ride.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <Badge variant={ride.status === "completed" ? "default" : "destructive"}>
                              {ride.status}
                            </Badge>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{ride.date}</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">#{ride.id}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{ride.from}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Navigation className="w-4 h-4 text-red-600" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{ride.to}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Driver: {ride.driver}</span>
                            {ride.rating && (
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < ride.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900 dark:text-white">{ride.amount}</div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={user?.fullName || ""}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={user?.username || ""}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={user?.phone || ""}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={user?.location || ""}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joinDate" className="text-gray-700 dark:text-gray-300">
                        Member Since
                      </Label>
                      <Input
                        id="joinDate"
                        value={user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : ""}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <Button onClick={() => router.push("/settings")} className="cta-button">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Wallet Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <div className="text-4xl font-bold text-green-600 mb-2">₦2,450</div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Available Balance</p>
                    <Button className="cta-button">Add Money</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Ride Payment</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Jan 23, 2025</div>
                      </div>
                      <div className="text-red-600 font-medium">-₦850</div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Wallet Top-up</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Jan 20, 2025</div>
                      </div>
                      <div className="text-green-600 font-medium">+₦5,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
