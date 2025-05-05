"use client"

import { useRef, useState } from "react"
import { Calendar, ChevronRight, Plus, Stethoscope, Activity, FileText, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ExpandableFab from "@/components/expandable-fab-fixed"

// Define our color palette
const colors = {
  primary: "#26D0B2",
  secondary: "#29B6F6",
  accent: "#5B6AD0",
  lightBlue: "#E3F2FD",
  lightTeal: "#E8F7F5",
  lightPurple: "#E8EAFF",
  background: "#ECEDF2", // Slightly darker background color
  gradient: "from-[#29B6F6] to-[#26D0B2]",
}

type Medication = {
  id: number
  name: string
  dosage: string
  taken: boolean
  icon: "pill" | "pill-case" | "pill-bottle"
}

type MedicalRecord = {
  id: number
  type: "diagnosis" | "surgery" | "test"
  name: string
  date: string
  doctor: string
  facility: string
}

export default function Dashboard() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Aspirin", dosage: "1 pill, 25 mg.", taken: false, icon: "pill" },
    { id: 2, name: "Vitamin B2", dosage: "8 drops", taken: true, icon: "pill-bottle" },
    { id: 3, name: "Ibuprofen", dosage: "1 tablet, 400 mg", taken: false, icon: "pill-case" },
  ])

  const [medicalHistory, setMedicalHistory] = useState<MedicalRecord[]>([
    {
      id: 1,
      type: "diagnosis",
      name: "Seasonal Allergies",
      date: "15 Nov 2023",
      doctor: "Dr. Nagy Zsófia",
      facility: "Budapest Orvosi Központ",
    },
    {
      id: 2,
      type: "surgery",
      name: "Appendectomy",
      date: "3 Jun 2023",
      doctor: "Dr. Kovács István",
      facility: "Szent János Kórház",
    },
    {
      id: 3,
      type: "test",
      name: "Annual Blood Work",
      date: "22 Jan 2023",
      doctor: "Dr. Szabó Katalin",
      facility: "Egészség Laboratórium",
    },
  ])

  const [isFabOpen, setIsFabOpen] = useState(false)

  const toggleMedication = (id: number) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med)))
  }

  const handleAddMedicine = () => {
    // This would typically open a form or modal to add a new medicine
    console.log("Add new medicine")
  }

  const handleViewRecord = (id: number) => {
    console.log(`View medical record ${id}`)
    // This would navigate to a detail page in a real app
  }

  // Improved draggable medication cards
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Fix the getMedicalRecordColor function to use the correct color values
  const getMedicalRecordColor = (type: MedicalRecord["type"]) => {
    switch (type) {
      case "diagnosis":
        return "bg-[#E8EAFF]"
      case "surgery":
        return "bg-[#FFE8E8]"
      case "test":
        return "bg-[#E8F7F5]"
      default:
        return "bg-gray-100"
    }
  }

  // Fix the getMedicalRecordTextColor function to use the correct color values
  const getMedicalRecordTextColor = (type: MedicalRecord["type"]) => {
    switch (type) {
      case "diagnosis":
        return "text-[#5B6AD0]"
      case "surgery":
        return "text-[#FF6B6B]"
      case "test":
        return "text-[#26D0B2]"
      default:
        return "text-gray-500"
    }
  }

  const getMedicalRecordIcon = (type: string) => {
    switch (type) {
      case "diagnosis":
        return <Stethoscope className="w-5 h-5" />
      case "surgery":
        return <Activity className="w-5 h-5" />
      case "test":
        return <FileText className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen text-gray-800 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fbfa] to-[#e6f7f5] z-[-2]"></div>

        {/* Floating gradient blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-primary-light to-transparent rounded-full opacity-40 transform translate-x-1/3 -translate-y-1/3 blur-3xl bg-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-secondary-light to-transparent rounded-full opacity-40 transform -translate-x-1/3 translate-y-1/3 blur-3xl bg-float-reverse"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-light rounded-full opacity-30 blur-3xl bg-float-slow"></div>

        {/* Additional subtle gradient elements */}
        <div
          className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-tr from-[#e3f2fd]/40 to-transparent rounded-full opacity-50 blur-3xl bg-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/2 w-60 h-60 bg-gradient-to-bl from-[#e8eaff]/30 to-transparent rounded-full opacity-40 blur-3xl bg-float-reverse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Mesh gradient effect */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(at_top_right,_#26D0B2_0%,_transparent_60%)] z-[-1]"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(at_bottom_left,_#29B6F6_0%,_transparent_60%)] z-[-1]"></div>
      </div>
      {/* Overlay for when FAB is open */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isFabOpen ? "opacity-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsFabOpen(false)}
      />

      {/* Main content with padding for the fixed navbar */}
      <main className={`pb-24 px-4 pt-4 transition-all duration-300 relative z-10 ${isFabOpen ? "blur-sm" : ""}`}>
        {/* Date */}
        <p className="text-accent font-medium">Today, 1 December</p>

        {/* Greeting */}
        <div className="flex justify-between items-start mt-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Good morning,</h1>
            <h2 className="text-3xl font-bold text-gray-800">Sara</h2>
            <p className="text-gray-500 mt-1">you have 3 appointments today</p>
          </div>
          <button className="bg-lightPurple p-3 rounded-full hover:bg-accent hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
          </button>
        </div>

        {/* Appointment */}
        <div
          className={`bg-gradient-to-r ${colors.gradient} rounded-2xl p-4 text-white flex items-center justify-between shadow-md hover:shadow-lg transition-shadow mt-6`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center overflow-hidden shadow-inner">
              <Image src="/doctor.png" alt="Dr. Marlina Cooper" width={48} height={48} className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold">Dr. Horváth Márta</h3>
              <p className="text-sm opacity-90">Today, 09:00 AM</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5" />
        </div>

        {/* Medication */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-gray-800">Medication</h3>
            <a href="#" className="text-[#26D0B2] text-sm font-medium hover:underline">
              See all
            </a>
          </div>
          <p className="text-gray-500 mb-4">Before lunch</p>

          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-4 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch", // Keep this for smoother scrolling on iOS
              }}
              onScroll={() => {
                if (!scrollContainerRef.current) return
                const container = scrollContainerRef.current
                const maxScroll = container.scrollWidth - container.clientWidth
                if (maxScroll <= 0) {
                  setScrollProgress(0)
                  return
                }
                const progress = (container.scrollLeft / maxScroll) * 100
                setScrollProgress(Math.min(Math.max(progress, 0), 100))
              }}
            >
              {medications.map((med) => (
                <div key={med.id} className="min-w-[calc(50%-0.5rem)] w-[calc(50%-0.5rem)] mr-4 flex-shrink-0">
                  <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow h-full">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                        med.icon === "pill"
                          ? "bg-[#5B6AD0] text-white"
                          : med.icon === "pill-case"
                            ? "bg-[#26D0B2] text-white"
                            : "bg-[#FFD9B7] text-[#FF8A9B]"
                      }`}
                    >
                      {/* Icon SVGs remain the same */}
                      {med.icon === "pill" && (
                        <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none">
                          <g clipPath="url(#clip0_1607_9804)">
                            <path
                              d="M7.65861 16.3414L16.3414 7.65861M21.2017 21.2017C18.8041 23.5994 14.9167 23.5994 12.519 21.2017L2.79826 11.481C0.400582 9.08335 0.400578 5.19594 2.79826 2.79826C5.19594 0.400581 9.08334 0.40058 11.481 2.79826L21.2017 12.519C23.5994 14.9167 23.5994 18.8041 21.2017 21.2017Z"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1607_9804">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                      {/* Other icons remain the same */}
                      {med.icon === "pill-case" && (
                        <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none">
                          <g clipPath="url(#clip0_1607_9812)">
                            <path
                              d="M1.28834 10.338C0.903885 9.95351 0.903885 9.33018 1.28834 8.94572L8.94572 1.28834C9.33018 0.903885 9.95351 0.903885 10.338 1.28834L22.7117 13.662C23.0961 14.0465 23.0961 14.6698 22.7117 15.0543L15.0543 22.7117C14.6698 23.0961 14.0465 23.0961 13.662 22.7117L1.28834 10.338Z"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M9.82244 5.88456C10.2749 5.43213 11.0084 5.43213 11.4608 5.88456L13.0992 7.52296C13.5517 7.97539 13.5517 8.70893 13.0992 9.16136C12.6468 9.61379 11.9133 9.61379 11.4608 9.16136L9.82244 7.52296C9.37 7.07053 9.37 6.33699 9.82244 5.88456Z"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M14.7448 10.8069C15.1972 10.3545 15.9308 10.3545 16.3832 10.8069L18.0216 12.4453C18.474 12.8977 18.474 13.6313 18.0216 14.0837C17.5692 14.5361 16.8356 14.5361 16.3832 14.0837L14.7448 12.4453C14.2924 11.9929 14.2924 11.2593 14.7448 10.8069Z"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M5.88456 9.82244C6.33699 9.37001 7.07052 9.37001 7.52296 9.82244L9.16136 11.4608C9.61379 11.9133 9.61379 12.6468 9.16136 13.0992C8.70892 13.5517 7.97539 13.5517 7.52296 13.0992L5.88456 11.4608C5.43212 11.0084 5.43212 10.2749 5.88456 9.82244Z"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M10.8069 14.7448C11.2593 14.2924 11.9929 14.2924 12.4453 14.7448L14.0837 16.3832C14.5361 16.8356 14.5361 17.5692 14.0837 18.0216C13.6313 18.474 12.8977 18.474 12.4453 18.0216L10.8069 16.3832C10.3545 15.9308 10.3545 15.1972 10.8069 14.7448Z"
                              strokeWidth="1.5"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1607_9812">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                      {med.icon === "pill-bottle" && (
                        <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 4L6 6M10 4L10 6M18 4L18 6M14 4L14 6M20 6V22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22V6H20ZM12.3331 11C12.8854 11 13.3331 11.4477 13.3331 12V13.5668C13.3331 13.622 13.3779 13.6668 13.4331 13.6668H15C15.5523 13.6668 16 14.1145 16 14.6668V15.3334C16 15.8857 15.5523 16.3334 15 16.3334H13.4331C13.3779 16.3334 13.3331 16.3782 13.3331 16.4334V18C13.3331 18.5523 12.8854 19 12.3331 19H11.6665C11.1142 19 10.6665 18.5523 10.6665 18V16.4334C10.6665 16.3782 10.6217 16.3334 10.5665 16.3334H9C8.44772 16.3334 8 15.8857 8 15.3334V14.6668C8 14.1145 8.44772 13.6668 9 13.6668H10.5665C10.6217 13.6668 10.6665 13.622 10.6665 13.5668V12C10.6665 11.4477 11.1142 11 11.6665 11H12.3331ZM3 6H21C21.5523 6 22 5.55228 22 5V2C22 1.44772 21.5523 1 21 1H3C2.44772 1 2 1.44772 2 2V5C2 5.55228 2.44772 6 3 6Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                    <h4 className="font-semibold">{med.name}</h4>
                    <p className="text-gray-500 text-sm mb-3">{med.dosage}</p>
                    <button
                      onClick={() => toggleMedication(med.id)}
                      className={`py-2 px-4 rounded-full text-sm font-medium w-full transition-all ${
                        med.taken
                          ? "bg-[#E8EAFF] text-[#5B6AD0] hover:bg-[#5B6AD0] hover:text-white"
                          : `bg-gradient-to-r ${colors.gradient} text-white hover:shadow-md`
                      }`}
                    >
                      {med.taken ? "Taken" : "Take"}
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Medicine Button Card */}
              <div className="min-w-[calc(50%-0.5rem)] w-[calc(50%-0.5rem)] mr-4 flex-shrink-0">
                <div
                  className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow h-full border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#26D0B2]"
                  onClick={handleAddMedicine}
                >
                  <div className="w-12 h-12 rounded-full bg-lightTeal flex items-center justify-center mb-3">
                    <Plus className="w-6 h-6 text-[#26D0B2]" />
                  </div>
                  <h4 className="font-semibold text-center">Add Medicine</h4>
                  <p className="text-gray-500 text-sm text-center mb-3">Track a new medication</p>
                  <div className="py-2 px-4 rounded-full text-sm font-medium w-full bg-white text-[#26D0B2] border border-[#26D0B2] text-center hover:bg-lightTeal transition-colors">
                    Add
                  </div>
                </div>
              </div>
            </div>

            {/* Single progress indicator */}
            <div className="flex justify-center mt-2">
              <div className="h-1 bg-gray-200 rounded-full w-16 relative overflow-hidden">
                <div
                  className="h-full bg-[#26D0B2] rounded-full absolute left-0 top-0 transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical History Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-gray-800">Medical History</h3>
            <a href="#" className="text-[#26D0B2] text-sm font-medium hover:underline">
              See all
            </a>
          </div>
          <p className="text-gray-500 mb-4">Recent records</p>

          {/* Medical History Cards */}
          <div className="space-y-3">
            {medicalHistory.map((record) => (
              <div key={record.id} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div
                    className={`p-3 rounded-xl ${getMedicalRecordColor(record.type)} ${getMedicalRecordTextColor(record.type)} mr-4`}
                  >
                    {getMedicalRecordIcon(record.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{record.name}</h4>
                        <p className="text-gray-500 text-sm">{record.date}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getMedicalRecordColor(record.type)} ${getMedicalRecordTextColor(record.type)} capitalize`}
                      >
                        {record.type}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{record.doctor}</p>
                      <p className="text-gray-500">{record.facility}</p>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => handleViewRecord(record.id)}
                        className="flex items-center text-sm font-medium text-[#26D0B2] hover:text-[#1CA88E] transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Record Button */}
            <div
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-[#26D0B2]"
              onClick={() => console.log("Add new medical record")}
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-lightTeal flex items-center justify-center mb-2">
                  <Plus className="w-5 h-5 text-[#26D0B2]" />
                </div>
                <p className="font-medium text-gray-800">Add Medical Record</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional content can go here */}
        <div className="h-32"></div>
      </main>

      {/* Expandable FAB */}
      <ExpandableFab onToggle={setIsFabOpen} />

      {/* Fixed Navigation Bar - Floating style */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-30">
        <nav className="flex justify-around items-center py-3 px-6 bg-white rounded-full shadow-lg w-[85%] max-w-md">
          <Link href="/" className="p-3 rounded-full bg-gradient-to-r from-[#29B6F6] to-[#26D0B2]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
              className="text-white"
              fill="currentColor"
            >
              <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path>
            </svg>
          </Link>
          <Link href="/providers" className="p-3 hover:bg-gray-100 rounded-full transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
              className="text-gray-500"
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
  )
}
