"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import ExpandableFab from "@/components/expandable-fab-fixed"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SearchProvider } from "./search-context"
import SearchBar from "./search-bar"
import ChatInterface from "./chat-interface"
import { Phone, MapPin, Mail } from "lucide-react"

export default function GuidelinesPage() {
  const [isFabOpen, setIsFabOpen] = useState(false)

  return (
    <SearchProvider>
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
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Guidelines</h1>
            <h2 className="text-xl text-gray-600">Healthcare System for International Students</h2>
          </div>

          {/* Enhanced Search Bar */}
          <div className="mb-6 relative">
            <SearchBar />
          </div>

          {/* Guidelines Content */}
          <div className="space-y-4 mb-20">
            <Accordion type="single" collapsible className="w-full">
              {/* Section 1: Getting Started */}
              <AccordionItem
                value="getting-started"
                className="border rounded-xl bg-white shadow-sm mb-4 overflow-hidden"
                id="getting-started"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline">
                  <div className="flex items-center w-full justify-start">
                    <div className="w-10 h-10 rounded-full bg-[#E8F7F5] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#26D0B2] font-bold">1</span>
                    </div>
                    <span className="font-semibold text-lg text-left">Getting Started</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-4 pl-11">
                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">Why is health insurance important in Hungary?</h4>
                      <p className="text-gray-600 text-sm">
                        Full coverage general health insurance is mandatory for registration at the University of Pécs
                        for non-Hungarian, non-EU students. While first aid and emergency care are free, all other
                        medical treatments require payment.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        What are the main health insurance options for international students?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Non-EU students have several options: Generali STUDIUM accident and health insurance
                        (recommended by the university), applying for a Hungarian Social Security Card (TAJ kártya), or
                        general private medical insurance.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 2: Generali STUDIUM Health Insurance */}
              <AccordionItem
                value="generali-studium"
                className="border rounded-xl bg-white shadow-sm mb-4 overflow-hidden"
                id="generali-studium"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline">
                  <div className="flex items-center w-full justify-start">
                    <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#29B6F6] font-bold">2</span>
                    </div>
                    <span className="font-semibold text-lg text-left">Generali STUDIUM Health Insurance</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-4 pl-11">
                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        What does the Generali STUDIUM insurance cover?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        This insurance provides fee-for-service coverage within Hungary, including medical procedures,
                        treatments, physician and hospital services, prescribed medications, and necessary medical
                        equipment. It also grants access to the University of Pécs Clinical Centre's services.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        How much does the Generali STUDIUM insurance cost?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        The annual cost is approximately 96,000 HUF, but it's advisable to confirm the latest price with
                        the university or provider.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        How can I purchase the Generali STUDIUM insurance?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        It can typically be bought in person upon arrival in Pécs, usually during the registration
                        period in late August or early September. The University of Pécs assists students with this.
                        Contact Mr. Tamás NÁDAI at the International Studies Center for more information.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Who can I contact for more information about Generali STUDIUM insurance?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Contact Mr. Tamás NÁDAI at nadai.tamas@pte.hu or visit his office at 7624 Pécs, Damjanich utca
                        30. You can also contact New West Ltd., the official partner, at 7621 Pécs, Jókai tér 5, by
                        phone at +36 72 511-355 or +36 30 817 0291, or via email at info@newwest.hu.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Remaining sections continue with the same pattern... */}
              {/* Section 3: The Hungarian Social Security Card (TAJ) */}
              <AccordionItem
                value="taj-card"
                className="border rounded-xl bg-white shadow-sm mb-4 overflow-hidden"
                id="taj-card"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline">
                  <div className="flex items-center w-full justify-start">
                    <div className="w-10 h-10 rounded-full bg-[#E8EAFF] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#5B6AD0] font-bold">3</span>
                    </div>
                    <span className="font-semibold text-lg text-left">The Hungarian Social Security Card (TAJ)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  {/* Content remains the same */}
                  <div className="space-y-4 pl-11">
                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        What is a TAJ card and how does it benefit international students?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        The TAJ card provides access to Hungary's public healthcare system.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">Who is eligible for a TAJ card?</h4>
                      <p className="text-gray-600 text-sm">
                        Stipendium Hungaricum scholarship recipients usually receive a TAJ card for free. Other non-EU
                        students can voluntarily enroll in the Hungarian State Health System by signing a contract and
                        paying a monthly fee.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        How can non-scholarship students apply for a TAJ card?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Apply in person at the local office of the National Health Insurance Fund (NEAK) at Nagy Lajos
                        Király Street 3, Pécs, 7623. Required documents include your university registration card,
                        address card, enrollment certificate, and passport.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        What are the costs associated with the TAJ card for non-scholarship students?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        As of January 2024, the monthly contribution fee for non-EEA students voluntarily enrolling is
                        80,040 HUF.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 4: Navigating the Healthcare System */}
              <AccordionItem
                value="navigating-healthcare"
                className="border rounded-xl bg-white shadow-sm mb-4 overflow-hidden"
                id="navigating-healthcare"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline">
                  <div className="flex items-center w-full justify-start">
                    <div className="w-10 h-10 rounded-full bg-[#FFE8E8] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#FF6B6B] font-bold">4</span>
                    </div>
                    <span className="font-semibold text-lg text-left">Navigating the Healthcare System</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-4 pl-11">
                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        How can international students access public healthcare in Pécs?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        With a TAJ card, students can access public healthcare services. Without a TAJ card, payment is
                        required based on the University of Pécs Clinical Centre's policy, or students can enter a
                        healthcare service agreement with the Hungarian Health Insurance Fund for a monthly fee.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">How do I find a General Practitioner (GP)?</h4>
                      <p className="text-gray-600 text-sm">
                        The University of Pécs Clinical Centre offers a GP service for students. Generali STUDIUM
                        insurance holders should contact the Clinical Centre first. The "Felnőtt Háziorvosi Ügyelet" at
                        the Janus Pannonius Clinical Center (Ifjúság útja 13) may also provide information.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">How do I see a specialist?</h4>
                      <p className="text-gray-600 text-sm">
                        Generally, a referral from a GP is needed for specialist treatment in public healthcare.
                        However, direct consultation is possible for specialties like dermatology, gynecology, and
                        urology.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        What are the costs of public healthcare services?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Most services are free with a TAJ card, though some co-payments for medications may apply.
                        Without a TAJ card, students pay according to the Clinical Centre's policies.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">What should I do in a medical emergency?</h4>
                      <p className="text-gray-600 text-sm">
                        Dial the toll-free emergency number 112. For ambulance services, call 104. The University of
                        Pécs Clinical Centre has an Emergency Department at Pécs, Rákóczi út 2. For trauma, consider
                        Honvéd Hospital at Pécs, Akác utca 1, but call +36 72 536-000/33742 first.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 5: Private Healthcare Options */}
              <AccordionItem
                value="private-healthcare"
                className="border rounded-xl bg-white shadow-sm mb-4 overflow-hidden"
                id="private-healthcare"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline">
                  <div className="flex items-center w-full justify-start">
                    <div className="w-10 h-10 rounded-full bg-[#FFF4E5] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#FF9800] font-bold">5</span>
                    </div>
                    <span className="font-semibold text-lg text-left">Private Healthcare Options</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-4 pl-11">
                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">Why might I consider private healthcare?</h4>
                      <p className="text-gray-600 text-sm">
                        Private healthcare can offer shorter waiting times, more modern facilities, and a higher chance
                        of English-speaking staff.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        How can I find private healthcare providers in Pécs?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Research local clinics and hospitals upon arrival or consult the university's international
                        student support services.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">How do I access private healthcare services?</h4>
                      <p className="text-gray-600 text-sm">
                        Proof of insurance is usually required, and many facilities expect upfront cash payments. Ensure
                        your insurance is accepted in Hungary or be prepared to pay out-of-pocket and seek
                        reimbursement.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        What are the costs of private healthcare and insurance?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Costs vary depending on the facility, treatment, and insurance plan. Annual private insurance
                        premiums can range from approximately €300 to €1,200.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        What private insurance plans are recommended for international students?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Consider Generali STUDIUM, Aon student insurance, ISI Protect, and Student Secure. Non-EU/EEA
                        students needing a visa might consider Swisscare.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 6: Important Health Considerations */}
              <AccordionItem
                value="health-considerations"
                className="border rounded-xl bg-white shadow-sm mb-4 overflow-hidden"
                id="health-considerations"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline">
                  <div className="flex items-center w-full justify-start">
                    <div className="w-10 h-10 rounded-full bg-[#E0F2F1] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#009688] font-bold">6</span>
                    </div>
                    <span className="font-semibold text-lg text-left">Important Health Considerations</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-4 pl-11">
                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        What if I have a pre-existing health condition?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Generali STUDIUM typically doesn't cover pre-existing conditions. The TAJ card via voluntary
                        agreement may also have limitations. Comprehensive private international health insurance might
                        be the most suitable option.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        How can I bring personal medication into Hungary?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Carry medications in their original packaging with a copy of your doctor's prescription. Verify
                        the legality of your medication in Hungary. A dated letter from your doctor stating the
                        medication name, dosage, and personal use is advisable. For controlled substances, especially in
                        larger quantities, an international certificate might be needed. Keep medications in carry-on
                        luggage.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Where can I find after-hours medical care and pharmacies?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        The "Felnőtt Háziorvosi Ügyelet" (Night medical duty for adults) is at Janus Pannonius Clinical
                        Center, Ifjúság útja 13, open daily 15:00-07:00 and 24 hours on weekends/holidays; phone +36 72
                        515 104. The Non-Stop Pharmacy, SIPO Zsolnay Patika, is at 7622 Pécs, Zsolnay Vilmos utca 8;
                        phone +36 72 516 760. Árkád Pharmacy in the Árkád shopping mall is open daily.
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-4 py-1">
                      <h4 className="font-medium text-gray-800 mb-2">What other health advice should I know?</h4>
                      <p className="text-gray-600 text-sm">
                        Register with a GP upon arrival. Always carry health insurance information. Learn basic
                        Hungarian health-related phrases. Be prepared to pay upfront for some services and keep records
                        of treatments and expenses.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 7: Key Contacts and Emergency Information */}
              <AccordionItem
                value="key-contacts"
                className="border rounded-xl bg-white shadow-sm mb-4 overflow-hidden"
                id="key-contacts"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline">
                  <div className="flex items-center w-full justify-start">
                    <div className="w-10 h-10 rounded-full bg-[#FFEBEE] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#F44336] font-bold">7</span>
                    </div>
                    <span className="font-semibold text-lg text-left">Key Contacts and Emergency Information</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="pl-11">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 mb-4">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Service
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Phone Number(s)
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Additional Information
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Emergency</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">112</td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Toll-free, 24/7, English speaking operators
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Ambulance</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">104 / 350-0388</td>
                            <td className="px-4 py-3 text-sm text-gray-500"></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Fire Brigade
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">105</td>
                            <td className="px-4 py-3 text-sm text-gray-500"></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Police</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">107 / +36 72 504 400</td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Pécs Police Headquarters, Vargha Damján utca 1
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Night Medical Duty (Adults)
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">+36 72 515 104</td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              Janus Pannonius Clinical Center, Ifjúság útja 13
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Non-Stop Pharmacy
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">+36 72 516 760</td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              SIPO Zsolnay Patika, Zsolnay Vilmos utca 8
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              University of Pécs ISC
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">+36-72/ 251-300</td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              www.international.pte.hu, info.isc@pte.hu
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Clinical Centre Main
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">N/A</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Pécs, Rákóczi út 2</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Janus Pannonius Clinical C.
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">N/A</td>
                            <td className="px-4 py-3 text-sm text-gray-500">7624 Pécs, Ifjúság útja 13</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              NEAK Pécs Office
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">N/A</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Nagy Lajos Király Street 3, 7623</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              New West Ltd. (Generali)
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">+36 72 511-355</td>
                            <td className="px-4 py-3 text-sm text-gray-500">7621 Pécs, Jókai tér 5</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div className="bg-[#FFF4E5] p-4 rounded-lg">
                        <h4 className="font-medium text-[#FF9800] flex items-center mb-2">
                          <Phone className="w-4 h-4 mr-2" /> Emergency Numbers
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <span className="font-medium mr-2">112:</span> General Emergency (Police, Fire, Ambulance)
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium mr-2">104:</span> Ambulance
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium mr-2">105:</span> Fire Brigade
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium mr-2">107:</span> Police
                          </li>
                        </ul>
                      </div>

                      <div className="bg-[#E0F2F1] p-4 rounded-lg">
                        <h4 className="font-medium text-[#009688] flex items-center mb-2">
                          <MapPin className="w-4 h-4 mr-2" /> Key Locations
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>University of Pécs Clinical Centre: Pécs, Rákóczi út 2</li>
                          <li>Janus Pannonius Clinical Center: 7624 Pécs, Ifjúság útja 13</li>
                          <li>NEAK Office: Nagy Lajos Király Street 3, 7623 Pécs</li>
                          <li>Non-Stop Pharmacy: SIPO Zsolnay Patika, 7622 Pécs, Zsolnay Vilmos utca 8</li>
                        </ul>
                      </div>

                      <div className="bg-[#E8EAFF] p-4 rounded-lg">
                        <h4 className="font-medium text-[#5B6AD0] flex items-center mb-2">
                          <Mail className="w-4 h-4 mr-2" /> Contact Information
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <span className="font-medium mr-2">University of Pécs ISC:</span> info.isc@pte.hu,
                            +36-72/251-300
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium mr-2">Generali Contact:</span> Mr. Tamás NÁDAI,
                            nadai.tamas@pte.hu
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium mr-2">New West Ltd.:</span> info@newwest.hu, +36 72 511-355
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Additional Resources */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Additional Resources</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center justify-between p-3 bg-[#E8F7F5] rounded-lg hover:bg-[#D0F0EC] transition-colors"
                >
                  <span className="font-medium text-[#26D0B2]">University of Pécs International Student Guide</span>
                  <ExternalLink className="w-4 h-4 text-[#26D0B2]" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-3 bg-[#E3F2FD] rounded-lg hover:bg-[#C8E6FB] transition-colors"
                >
                  <span className="font-medium text-[#29B6F6]">Hungarian Health Insurance Fund (NEAK) Website</span>
                  <ExternalLink className="w-4 h-4 text-[#29B6F6]" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-3 bg-[#E8EAFF] rounded-lg hover:bg-[#D8DCFF] transition-colors"
                >
                  <span className="font-medium text-[#5B6AD0]">Generali STUDIUM Insurance Information</span>
                  <ExternalLink className="w-4 h-4 text-[#5B6AD0]" />
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Chat Interface */}
        <ChatInterface />

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
            <Link href="/guidelines" className="p-3 rounded-full bg-gradient-to-r from-[#29B6F6] to-[#26D0B2]">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                className="text-white"
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
    </SearchProvider>
  )
}
