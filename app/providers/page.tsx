"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Phone, Clock, Star, Filter, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ExpandableFab from "@/components/expandable-fab-fixed"
import FilterComponent, { type FilterState } from "./filter-component"
import { providers } from "./providers-data"
import { findSpecialtiesForSymptom } from "./symptom-mapping"

// Define our color palette
const colors = {
  primary: "#26D0B2",
  secondary: "#29B6F6",
  accent: "#5B6AD0",
  lightBlue: "#E3F2FD",
  lightTeal: "#E8F7F5",
  lightPurple: "#E8EAFF",
  background: "#ECEDF2",
  gradient: "from-[#29B6F6] to-[#26D0B2]",
}

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFabOpen, setIsFabOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredProviders, setFilteredProviders] = useState(providers)
  const [filters, setFilters] = useState<FilterState>({
    providerTypes: [],
    insuranceTypes: [],
    isPublic: null,
    englishSpeaking: null,
    isOpen: null,
  })
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Apply filters to providers
  useEffect(() => {
    let filtered = [...providers]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()

      // Check if the query might be a symptom
      const relevantSpecialties = findSpecialtiesForSymptom(query)

      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(query) ||
          provider.specialties.some((specialty) => specialty.toLowerCase().includes(query)) ||
          provider.address.toLowerCase().includes(query) ||
          // Include providers with specialties relevant to the symptom
          provider.specialties.some((specialty) =>
            relevantSpecialties.some((relevantSpecialty) =>
              specialty.toLowerCase().includes(relevantSpecialty.toLowerCase()),
            ),
          ),
      )
    }

    // Filter by provider type
    if (filters.providerTypes.length > 0) {
      filtered = filtered.filter((provider) => filters.providerTypes.includes(provider.type))
    }

    // Filter by insurance type
    if (filters.insuranceTypes.length > 0) {
      filtered = filtered.filter((provider) =>
        filters.insuranceTypes.some((insurance) => provider.acceptsInsurance.includes(insurance)),
      )
    }

    // Filter by public/private
    if (filters.isPublic !== null) {
      filtered = filtered.filter((provider) => provider.isPublic === filters.isPublic)
    }

    // Filter by English speaking
    if (filters.englishSpeaking !== null) {
      filtered = filtered.filter((provider) => provider.englishSpeaking === filters.englishSpeaking)
    }

    // Filter by open status
    if (filters.isOpen !== null) {
      filtered = filtered.filter((provider) => (filters.isOpen ? provider.status === "Open" : true))
    }

    setFilteredProviders(filtered)

    // Count active filters
    let count = 0
    if (filters.providerTypes.length > 0) count++
    if (filters.insuranceTypes.length > 0) count++
    if (filters.isPublic !== null) count++
    if (filters.englishSpeaking !== null) count++
    if (filters.isOpen !== null) count++
    setActiveFiltersCount(count)
  }, [searchQuery, filters])

  const applyFilters = () => {
    // Filters are applied automatically via the useEffect
  }

  const resetFilters = () => {
    setFilters({
      providerTypes: [],
      insuranceTypes: [],
      isPublic: null,
      englishSpeaking: null,
      isOpen: null,
    })
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
            <h1 className="text-3xl font-bold text-gray-800">Providers</h1>
            <h2 className="text-xl text-gray-600">Find healthcare facilities</h2>
          </div>
        </div>

        {/* Search Bar - Enhanced with capsule shape and focus effect */}
        <div className="mt-6 relative">
          <div
            className={`flex items-center bg-white rounded-full shadow-sm overflow-hidden border transition-all duration-200 ${
              isSearchFocused ? "border-[#26D0B2] shadow-md" : "border-gray-200"
            }`}
          >
            <div className="pl-4 py-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${isSearchFocused ? "text-[#26D0B2]" : "text-gray-400"}`} />
            </div>
            <input
              type="text"
              className="block w-full pl-3 pr-4 py-3 bg-transparent placeholder-gray-500 focus:outline-none"
              placeholder="Condition, symptom, specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <div className="h-10 w-px bg-gray-200 mx-1"></div>
            <button
              className={`px-4 py-3 flex items-center ${
                activeFiltersCount > 0 ? "text-[#26D0B2]" : "text-gray-500 hover:text-gray-700"
              } transition-colors relative`}
              onClick={() => setIsFilterOpen(true)}
              aria-label="Filter search results"
            >
              <Filter className="h-5 w-5" />
              <span className="ml-2 text-sm font-medium">Filter</span>
              {activeFiltersCount > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-[#26D0B2] text-white rounded-full text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search hint */}
        <div className="mt-2 text-xs text-gray-500 px-2">
          <span>Tip: You can search by symptoms like "headache" or "back pain" to find relevant providers</span>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.providerTypes.length > 0 && (
              <div className="bg-[#E8F7F5] text-[#26D0B2] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <span>
                  {filters.providerTypes.length === 1
                    ? filters.providerTypes[0].charAt(0).toUpperCase() + filters.providerTypes[0].slice(1)
                    : `${filters.providerTypes.length} Types`}
                </span>
                <button
                  onClick={() => setFilters({ ...filters, providerTypes: [] })}
                  className="ml-1 p-0.5 hover:bg-[#26D0B2] hover:text-white rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.insuranceTypes.length > 0 && (
              <div className="bg-[#E8EAFF] text-[#5B6AD0] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <span>
                  {filters.insuranceTypes.length === 1
                    ? filters.insuranceTypes[0] === "taj"
                      ? "TAJ Card"
                      : filters.insuranceTypes[0] === "generali"
                        ? "Generali"
                        : "Private Insurance"
                    : `${filters.insuranceTypes.length} Insurances`}
                </span>
                <button
                  onClick={() => setFilters({ ...filters, insuranceTypes: [] })}
                  className="ml-1 p-0.5 hover:bg-[#5B6AD0] hover:text-white rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.isPublic !== null && (
              <div className="bg-[#E3F2FD] text-[#29B6F6] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <span>{filters.isPublic ? "Public" : "Private"}</span>
                <button
                  onClick={() => setFilters({ ...filters, isPublic: null })}
                  className="ml-1 p-0.5 hover:bg-[#29B6F6] hover:text-white rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.englishSpeaking !== null && (
              <div className="bg-[#FFF4E5] text-[#FF9800] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <span>English-speaking</span>
                <button
                  onClick={() => setFilters({ ...filters, englishSpeaking: null })}
                  className="ml-1 p-0.5 hover:bg-[#FF9800] hover:text-white rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.isOpen !== null && (
              <div className="bg-[#E0F2F1] text-[#009688] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <span>Currently Open</span>
                <button
                  onClick={() => setFilters({ ...filters, isOpen: null })}
                  className="ml-1 p-0.5 hover:bg-[#009688] hover:text-white rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            <button
              onClick={resetFilters}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Hospitals Near You */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Healthcare Providers</h3>
            <div className="text-[#26D0B2] text-sm font-medium">
              {filteredProviders.length} {filteredProviders.length === 1 ? "result" : "results"}
            </div>
          </div>

          {/* Provider Cards */}
          {filteredProviders.length > 0 ? (
            <div className="space-y-4">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40">
                    <Image
                      src={provider.image || "/placeholder.svg"}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center shadow-md">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">{provider.rating}</span>
                    </div>
                    {provider.isPublic && (
                      <div className="absolute top-3 left-3 bg-[#E3F2FD] text-[#29B6F6] px-2 py-1 rounded-full text-xs font-medium">
                        Public
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{provider.name}</h4>

                    <div className="flex items-start mt-2">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{provider.address}</span>
                    </div>

                    <div className="flex items-center mt-2">
                      <Phone className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{provider.phone}</span>
                    </div>

                    <div className="flex items-center mt-2">
                      <Clock className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <div>
                        <span
                          className={`text-sm ${
                            provider.status === "Open" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          } px-2 py-0.5 rounded-full mr-2`}
                        >
                          {provider.status}
                        </span>
                        <span className="text-gray-600 text-sm">{provider.hours}</span>
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-500">{provider.distance}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {provider.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            specialty === "Dentistry"
                              ? "bg-[#E8EAFF] text-[#5B6AD0]"
                              : specialty === "General"
                                ? "bg-[#E8F7F5] text-[#26D0B2]"
                                : "bg-[#E3F2FD] text-[#29B6F6]"
                          }`}
                        >
                          {specialty}
                        </span>
                      ))}
                      {provider.specialties.length > 3 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          +{provider.specialties.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Insurance badges */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {provider.acceptsInsurance.includes("taj") && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                          TAJ Card
                        </span>
                      )}
                      {provider.acceptsInsurance.includes("generali") && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600">
                          Generali
                        </span>
                      )}
                      {provider.acceptsInsurance.includes("private") && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
                          Private Insurance
                        </span>
                      )}
                    </div>

                    {/* English speaking badge */}
                    {provider.englishSpeaking && (
                      <div className="mt-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFF4E5] text-[#FF9800]">
                          English-speaking Staff
                        </span>
                      </div>
                    )}

                    <Link
                      href={`/providers/${provider.id}`}
                      className={`mt-4 block w-full py-3 text-center rounded-xl bg-gradient-to-r ${colors.gradient} text-white font-medium hover:shadow-md transition-shadow`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">No providers found</h4>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search for something else.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#26D0B2] text-white rounded-lg font-medium hover:bg-[#1CA88E] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Additional content can go here */}
        <div className="h-32"></div>
      </main>

      {/* Filter Component */}
      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        onClose={() => setIsFilterOpen(false)}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        isOpen={isFilterOpen}
      />

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
  )
}
