"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Globe,
  Check,
  Calendar,
  MessageSquare,
  AlertCircle,
  User,
  Building,
  Shield,
  Languages,
} from "lucide-react"
import { useRouter } from "next/navigation"
import ExpandableFab from "@/components/expandable-fab-fixed"
import { providers } from "../providers-data"
import { symptomToSpecialtyMap } from "../symptom-mapping"

export default function ProviderDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isBookingInProgress, setIsBookingInProgress] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [bookingMessage, setBookingMessage] = useState("")
  const [isFabOpen, setIsFabOpen] = useState(false)
  const [provider, setProvider] = useState(providers[0])

  // Find the provider based on the ID
  useEffect(() => {
    const foundProvider = providers.find((p) => p.id === Number.parseInt(params.id))
    if (foundProvider) {
      setProvider(foundProvider)
    } else {
      // If provider not found, redirect to providers list
      router.push("/providers")
    }
  }, [params.id, router])

  const handleAIBooking = () => {
    setShowBookingModal(true)
    setBookingStatus("idle")
    setBookingMessage("")
  }

  const startAIBooking = async () => {
    try {
      setBookingStatus("loading")
      setBookingMessage("Initiating AI booking assistant...")

      const response = await fetch("https://nitro1908.app.n8n.cloud/webhook/399dadb1-50c0-4ad1-9207-a4377598aa0b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerName: provider.name,
          providerPhone: provider.phone,
          specialty: provider.specialties[0],
          userName: "Sara", // Assuming the user's name is Sara based on the home page
        }),
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      setBookingStatus("success")
      setBookingMessage(
        "Your AI assistant is booking your appointment. You'll receive a notification when it's confirmed.",
      )

      // Close the modal after showing success for a few seconds
      setTimeout(() => {
        setShowBookingModal(false)
        setBookingStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Error starting AI booking:", error)
      setBookingStatus("error")
      setBookingMessage("Something went wrong. Please try again later.")
    }
  }

  // Add this function inside the component before the return statement
  const getRelevantSymptoms = (specialties: string[]): string[] => {
    const symptoms: string[] = []

    // For each specialty, find symptoms that map to it
    specialties.forEach((specialty) => {
      Object.entries(symptomToSpecialtyMap).forEach(([symptom, mappedSpecialties]) => {
        if (
          mappedSpecialties.some(
            (s) => s.toLowerCase() === specialty.toLowerCase() || specialty.toLowerCase().includes(s.toLowerCase()),
          ) &&
          !symptoms.includes(symptom)
        ) {
          symptoms.push(symptom)
        }
      })
    })

    // Return a limited number of symptoms to avoid overwhelming the UI
    return symptoms.slice(0, 8)
  }

  // If provider is not loaded yet, show loading state
  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 rounded-full border-4 border-[#26D0B2] border-t-transparent animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      {/* Overlay for when FAB is open */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isFabOpen ? "opacity-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsFabOpen(false)}
      />
      <div className={`min-h-screen bg-gray-50 ${isFabOpen ? "blur-sm" : ""}`}>
        {/* Header Image */}
        <div className="relative h-56 w-full">
          <Image
            src={provider.image || "/placeholder.svg"}
            alt={provider.name}
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>

          {/* Provider info overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 mb-1">
              <div className="bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-medium">{provider.rating}</span>
              </div>
              <div
                className={`${
                  provider.status === "Open" ? "bg-green-500" : "bg-red-500"
                } text-white rounded-full px-3 py-1 text-sm font-medium`}
              >
                {provider.status}
              </div>
              {provider.isPublic && (
                <div className="bg-[#E3F2FD] text-[#29B6F6] rounded-full px-3 py-1 text-sm font-medium">Public</div>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-sm">{provider.name}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {/* Provider Type Badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                provider.type === "hospital"
                  ? "bg-[#E3F2FD] text-[#29B6F6]"
                  : provider.type === "clinic"
                    ? "bg-[#E8F7F5] text-[#26D0B2]"
                    : provider.type === "dental"
                      ? "bg-[#E8EAFF] text-[#5B6AD0]"
                      : provider.type === "pharmacy"
                        ? "bg-[#FFF4E5] text-[#FF9800]"
                        : provider.type === "emergency"
                          ? "bg-[#FFEBEE] text-[#F44336]"
                          : "bg-[#E0F2F1] text-[#009688]"
              }`}
            >
              {provider.type.charAt(0).toUpperCase() + provider.type.slice(1)}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700">{provider.description}</p>
          </div>

          {/* Insurance Coverage */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Insurance Coverage</h2>
            <div className="flex flex-wrap gap-2">
              {provider.acceptsInsurance.includes("taj") && (
                <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  TAJ Card
                </div>
              )}
              {provider.acceptsInsurance.includes("generali") && (
                <div className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Generali STUDIUM
                </div>
              )}
              {provider.acceptsInsurance.includes("private") && (
                <div className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Private Insurance
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-800">{provider.address}</p>
                  <Link href="#" className="text-[#26D0B2] text-sm font-medium mt-1 inline-block">
                    Directions
                  </Link>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-800">{provider.phone}</p>
                  <div className="flex space-x-3 mt-2">
                    <a
                      href={`tel:${provider.phone}`}
                      className="bg-[#26D0B2] text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      Call
                    </a>
                    <button
                      onClick={handleAIBooking}
                      className="bg-[#5B6AD0] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Book with AI
                    </button>
                  </div>
                </div>
              </div>

              {provider.website && (
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <Link href={provider.website} target="_blank" className="text-[#26D0B2] font-medium">
                      Website
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Languages */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {provider.staff
                .reduce((languages, staff) => {
                  staff.languages.forEach((lang) => {
                    if (!languages.includes(lang)) {
                      languages.push(lang)
                    }
                  })
                  return languages
                }, [] as string[])
                .map((language) => (
                  <div
                    key={language}
                    className="bg-[#E8EAFF] text-[#5B6AD0] px-3 py-1.5 rounded-full text-sm font-medium flex items-center"
                  >
                    <Languages className="h-4 w-4 mr-1" />
                    {language}
                  </div>
                ))}
            </div>
          </section>

          {/* Hours */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Hours</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex justify-between py-3 px-4 border-b border-gray-100">
                <div className="flex items-center">
                  <span className="font-medium">Today</span>
                  <span className="ml-2 text-xs bg-[#26D0B2] text-white px-2 py-0.5 rounded-full">Today</span>
                </div>
                <span className={provider.status === "Open" ? "text-green-600" : "text-red-500"}>{provider.hours}</span>
              </div>
              <div className="flex justify-between py-3 px-4">
                <span className="font-medium">Regular Hours</span>
                <span className="text-gray-600">{provider.hours}</span>
              </div>
            </div>
          </section>

          {/* Staff */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Staff</h2>
            <div className="space-y-3">
              {provider.staff.map((person, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">{person.name}</h4>
                      <p className="text-sm text-gray-600">{person.specialty}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {person.languages.map((lang, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <ul className="space-y-2">
                {provider.services.map((service, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-[#26D0B2] mr-2 flex-shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Common Symptoms Treated */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Common Symptoms Treated</h2>
            <div className="flex flex-wrap gap-2">
              {getRelevantSymptoms(provider.specialties).map((symptom, index) => (
                <div key={index} className="bg-[#E8F7F5] text-[#26D0B2] px-3 py-1.5 rounded-full text-sm font-medium">
                  {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                </div>
              ))}
            </div>
          </section>

          {/* Facilities */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Facilities</h2>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <ul className="space-y-2">
                {provider.facilities.map((facility, index) => (
                  <li key={index} className="flex items-center">
                    <Building className="h-5 w-5 text-[#29B6F6] mr-2 flex-shrink-0" />
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Book Appointment Button */}
          <button className="w-full py-4 bg-gradient-to-r from-[#29B6F6] to-[#26D0B2] text-white font-medium rounded-xl shadow-md flex items-center justify-center">
            <Calendar className="h-5 w-5 mr-2" />
            Book Appointment
          </button>
        </div>

        {/* AI Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-bold mb-2">Book with AI Assistant</h3>

              {bookingStatus === "idle" && (
                <>
                  <p className="text-gray-600 mb-4">
                    Our AI assistant will help you schedule an appointment with {provider.name}. The assistant will call
                    on your behalf and find the best available time slot.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#E8EAFF] flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-[#5B6AD0]" />
                      </div>
                      <div>
                        <h4 className="font-medium">AI Assistant</h4>
                        <p className="text-sm text-gray-500">Will call: {provider.phone}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Hello, I'm calling on behalf of Sara to schedule a {provider.specialties[0].toLowerCase()}{" "}
                      appointment. What are the available time slots for next week?"
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={startAIBooking}
                      className="flex-1 py-3 bg-[#5B6AD0] text-white rounded-xl font-medium text-center"
                    >
                      Start AI Call
                    </button>
                  </div>
                </>
              )}

              {bookingStatus === "loading" && (
                <div className="py-8 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-4 border-[#5B6AD0] border-t-transparent animate-spin mb-4"></div>
                  <p className="text-gray-600">{bookingMessage}</p>
                </div>
              )}

              {bookingStatus === "success" && (
                <div className="py-8 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-gray-600 text-center">{bookingMessage}</p>
                </div>
              )}

              {bookingStatus === "error" && (
                <div className="py-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-gray-600 text-center mb-6">{bookingMessage}</p>
                  <div className="flex space-x-3 w-full">
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={startAIBooking}
                      className="flex-1 py-3 bg-[#5B6AD0] text-white rounded-xl font-medium text-center"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Expandable FAB */}
        <ExpandableFab onToggle={setIsFabOpen} />
        {/* Fixed Navigation Bar - Floating style */}
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-30">
          <nav className="flex justify-around items-center py-3 px-6 bg-white rounded-full shadow-lg w-[85%] max-w-md">
            <Link href="/" className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
                className="text-gray-500"
                fill="currentColor"
              >
                <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path>
              </svg>
            </Link>
            <Link href="/providers" className="p-3 rounded-full bg-gradient-to-r from-[#29B6F6] to-[#26D0B2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
                className="text-white"
                fill="currentColor"
              >
                <path d="M248,208h-8V128a16,16,0,0,0-16-16H168V48a16,16,0,0,0-16-16H56A16,16,0,0,0,40,48V208H32a8,8,0,0,0,0,16H248a8,8,0,0,0,0-16Zm-24-80v80H168V128ZM56,48h96V208H136V160a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8v48H56Zm64,160H88V168h32ZM72,96a8,8,0,0,1,8-8H96V72a8,8,0,0,1,16,0V88h16a8,8,0,0,1,0,16H112v16a8,8,0,0,1-16,0V104H80A8,8,0,0,1,72,96Z"></path>
              </svg>
            </Link>
            <Link href="/guidelines" className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                className="text-gray-500"
                fill="currentColor"
              >
                <path
                  d="M27.5,5.4c0.2,0.2,0.2,0.5,0,0.7c0,0,0,0,0,0l-3.3,3.3c-0.2,0.2-0.5,0.2-0.7,0c0,0,0,0,0,0l-1.4-1.4c-0.2-0.2-0.2-0.5,0-0.7
s0.5-0.2,0.7,0l1.1,1.1l2.9-2.9C27,5.2,27.3,5.2,27.5,5.4C27.5,5.4,27.5,5.4,27.5,5.4z M30.9,7.1c0,3.3-2.7,6-6,6s-6-2.7-6-6
s2.7-6,6-6C28.2,1.1,30.9,3.8,30.9,7.1z M30,7.1C30,4.3,27.7,2,24.9,2s-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1C27.7,12.2,30,10,30,7.1z"
                />
                <path
                  d="M25,13.2V23H9c-0.7,0-1.4,0.2-2,0.5V7c0-1.1,0.9-2,2-2h10.2c0.3-0.7,0.7-1.4,1.3-2H9C6.8,3,5,4.8,5,7v21c0,0.6,0.4,1,1,1h18
c0.6,0,1-0.4,1-1s-0.4-1-1-1H7c0-1.1,0.9-2,2-2h17c0.6,0,1-0.4,1-1V12.8C26.4,13,25.7,13.1,25,13.2z"
                />
              </svg>
            </Link>
            <Link href="#" className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
                className="text-gray-500"
                fill="currentColor"
              >
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
