"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import { filterOptions, type InsuranceType, type ProviderType } from "./providers-data"

export type FilterState = {
  providerTypes: ProviderType[]
  insuranceTypes: InsuranceType[]
  isPublic: boolean | null
  englishSpeaking: boolean | null
  isOpen: boolean | null
}

type FilterComponentProps = {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  onClose: () => void
  applyFilters: () => void
  resetFilters: () => void
  isOpen: boolean
}

export default function FilterComponent({
  filters,
  setFilters,
  onClose,
  applyFilters,
  resetFilters,
  isOpen,
}: FilterComponentProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)

  const handleProviderTypeToggle = (type: ProviderType) => {
    setLocalFilters((prev) => {
      if (prev.providerTypes.includes(type)) {
        return { ...prev, providerTypes: prev.providerTypes.filter((t) => t !== type) }
      } else {
        return { ...prev, providerTypes: [...prev.providerTypes, type] }
      }
    })
  }

  const handleInsuranceTypeToggle = (type: InsuranceType) => {
    setLocalFilters((prev) => {
      if (prev.insuranceTypes.includes(type)) {
        return { ...prev, insuranceTypes: prev.insuranceTypes.filter((t) => t !== type) }
      } else {
        return { ...prev, insuranceTypes: [...prev.insuranceTypes, type] }
      }
    })
  }

  const handlePublicToggle = (value: boolean | null) => {
    setLocalFilters((prev) => ({
      ...prev,
      isPublic: prev.isPublic === value ? null : value,
    }))
  }

  const handleEnglishToggle = (value: boolean | null) => {
    setLocalFilters((prev) => ({
      ...prev,
      englishSpeaking: prev.englishSpeaking === value ? null : value,
    }))
  }

  const handleOpenToggle = (value: boolean | null) => {
    setLocalFilters((prev) => ({
      ...prev,
      isOpen: prev.isOpen === value ? null : value,
    }))
  }

  const handleApply = () => {
    setFilters(localFilters)
    applyFilters()
    onClose()
  }

  const handleReset = () => {
    const emptyFilters: FilterState = {
      providerTypes: [],
      insuranceTypes: [],
      isPublic: null,
      englishSpeaking: null,
      isOpen: null,
    }
    setLocalFilters(emptyFilters)
    setFilters(emptyFilters)
    resetFilters()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl z-10">
          <h2 className="text-lg font-bold">Filter Providers</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Provider Type Filter */}
          <div>
            <h3 className="font-medium mb-2">Provider Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.providerTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleProviderTypeToggle(type.value as ProviderType)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                    localFilters.providerTypes.includes(type.value as ProviderType)
                      ? "bg-[#E8F7F5] text-[#26D0B2]"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <span>{type.label}</span>
                  {localFilters.providerTypes.includes(type.value as ProviderType) && (
                    <Check className="h-4 w-4 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Insurance Coverage Filter */}
          <div>
            <h3 className="font-medium mb-2">Insurance Coverage</h3>
            <div className="grid grid-cols-1 gap-2">
              {filterOptions.insuranceTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleInsuranceTypeToggle(type.value as InsuranceType)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                    localFilters.insuranceTypes.includes(type.value as InsuranceType)
                      ? "bg-[#E8EAFF] text-[#5B6AD0]"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <span>{type.label}</span>
                  {localFilters.insuranceTypes.includes(type.value as InsuranceType) && (
                    <Check className="h-4 w-4 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Public/Private Filter */}
          <div>
            <h3 className="font-medium mb-2">Institution Type</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handlePublicToggle(true)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                  localFilters.isPublic === true ? "bg-[#E3F2FD] text-[#29B6F6]" : "bg-gray-100 text-gray-700"
                }`}
              >
                Public
              </button>
              <button
                onClick={() => handlePublicToggle(false)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                  localFilters.isPublic === false ? "bg-[#E3F2FD] text-[#29B6F6]" : "bg-gray-100 text-gray-700"
                }`}
              >
                Private
              </button>
            </div>
          </div>

          {/* English Speaking Filter */}
          <div>
            <h3 className="font-medium mb-2">Language</h3>
            <button
              onClick={() => handleEnglishToggle(true)}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                localFilters.englishSpeaking === true ? "bg-[#FFF4E5] text-[#FF9800]" : "bg-gray-100 text-gray-700"
              }`}
            >
              <span>English-speaking Staff</span>
              {localFilters.englishSpeaking === true && <Check className="h-4 w-4 ml-1" />}
            </button>
          </div>

          {/* Open Now Filter */}
          <div>
            <h3 className="font-medium mb-2">Availability</h3>
            <button
              onClick={() => handleOpenToggle(true)}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                localFilters.isOpen === true ? "bg-[#E0F2F1] text-[#009688]" : "bg-gray-100 text-gray-700"
              }`}
            >
              <span>Currently Open</span>
              {localFilters.isOpen === true && <Check className="h-4 w-4 ml-1" />}
            </button>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700"
          >
            Reset All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 bg-gradient-to-r from-[#29B6F6] to-[#26D0B2] text-white rounded-xl font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
