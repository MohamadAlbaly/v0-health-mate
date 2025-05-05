"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

type ExpandableFabProps = {
  onToggle?: (isOpen: boolean) => void
}

export default function ExpandableFab({ onToggle }: ExpandableFabProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const toggleFab = () => {
    const newState = !isOpen
    setIsOpen(newState)
    if (onToggle) onToggle(newState)
  }

  // Close the FAB when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest("[data-fab-container]")) {
        setIsOpen(false)
        if (onToggle) onToggle(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen, onToggle])

  const handleCallMate = () => {
    setIsOpen(false)
    if (onToggle) onToggle(false)
    router.push("/call")
  }

  return (
    <div className="fixed right-6 bottom-24 z-50" data-fab-container>
      {/* Emergency Call Button */}
      <div
        className={`absolute right-0 transform transition-all duration-300 ease-in-out flex items-center ${
          isOpen ? "opacity-100 -translate-y-40 scale-100" : "opacity-0 translate-y-0 scale-0"
        }`}
      >
        <div className="mr-3 bg-white px-6 py-3 rounded-xl shadow-md text-base font-medium">Emergency</div>
        <a
          href="tel:191"
          className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Call emergency number 191"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
            stroke="currentColor"
          >
            <g clipPath="url(#clip0_1209_6824)">
              <path
                d="M11.544 40.2985H36.4606C37.4773 40.2985 38.4523 40.7024 39.1712 41.4213C39.8901 42.1402 40.294 43.1152 40.294 44.1319V45.0902C40.294 45.216 40.2692 45.3407 40.221 45.4569C40.1729 45.5732 40.1023 45.6788 40.0133 45.7678C39.9243 45.8568 39.8186 45.9274 39.7024 45.9756C39.5861 46.0237 39.4615 46.0485 39.3356 46.0485H8.66897C8.54312 46.0485 8.4185 46.0237 8.30223 45.9756C8.18596 45.9274 8.08031 45.8568 7.99132 45.7678C7.90233 45.6788 7.83174 45.5732 7.78358 45.4569C7.73542 45.3407 7.71063 45.216 7.71063 45.0902V44.1319C7.71063 43.1152 8.1145 42.1402 8.83339 41.4213C9.55228 40.7024 10.5273 40.2985 11.544 40.2985Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30.7107 25.9235C30.7107 25.6693 30.6097 25.4256 30.43 25.2459C30.2503 25.0661 30.0065 24.9652 29.7523 24.9652H26.8773V22.0902C26.8773 21.836 26.7764 21.5922 26.5967 21.4125C26.4169 21.2328 26.1732 21.1318 25.919 21.1318H22.0857C21.8315 21.1318 21.5878 21.2328 21.408 21.4125C21.2283 21.5922 21.1273 21.836 21.1273 22.0902V24.9652H18.2523C17.9982 24.9652 17.7544 25.0661 17.5747 25.2459C17.395 25.4256 17.294 25.6693 17.294 25.9235V29.7568C17.294 30.011 17.395 30.2548 17.5747 30.4345C17.7544 30.6142 17.9982 30.7152 18.2523 30.7152H21.1273V33.5902C21.1273 33.8443 21.2283 34.0881 21.408 34.2678C21.5878 34.4475 21.8315 34.5485 22.0857 34.5485H25.919C26.1732 34.5485 26.4169 34.4475 26.5967 34.2678C26.7764 34.0881 26.8773 33.8443 26.8773 33.5902V30.7152H29.7523C30.0065 30.7152 30.2503 30.6142 30.43 30.4345C30.6097 30.2548 30.7107 30.011 30.7107 29.7568V25.9235Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M36.4607 40.2985H11.544V25.9235C11.544 22.6193 12.8566 19.4505 15.193 17.1141C17.5294 14.7777 20.6982 13.4651 24.0023 13.4651C27.3065 13.4651 30.4753 14.7777 32.8117 17.1141C35.1481 19.4505 36.4607 22.6193 36.4607 25.9235V40.2985Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1209_6824">
                <rect width="48" height="48" fill="white" transform="translate(0.00231934 0.00683594)" />
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>

      {/* Avatar Button */}
      <div
        className={`absolute right-0 transform transition-all duration-300 ease-in-out flex items-center ${
          isOpen ? "opacity-100 -translate-y-20 scale-100" : "opacity-0 translate-y-0 scale-0"
        }`}
      >
        <div className="mr-3 bg-white px-6 py-3 rounded-xl shadow-md text-base font-medium">Call Mate</div>
        <button
          onClick={handleCallMate}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Call your mate"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <div className="w-16 h-16 rounded-full overflow-hidden" style={{ backgroundColor: "white" }}>
              <Image
                src="/circular-avatar.png"
                alt="Call mate avatar"
                width={64}
                height={64}
                className="object-cover"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </button>
      </div>

      {/* Main FAB Button */}
      <button
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10 ${
          isOpen ? "bg-[#3A3E4A]" : "bg-gradient-to-r from-[#29B6F6] to-[#26D0B2]"
        }`}
        onClick={toggleFab}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          // Phone list icon when open
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 256 256"
            className="text-white"
            fill="currentColor"
          >
            <path d="M214.36,166.46l-47.1-21.11-.12-.06a16,16,0,0,0-15.18,1.4,8.12,8.12,0,0,0-.75.56L126.87,168c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06.61.61,0,0,1,0-.12L89.54,41.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,24,88c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,214.36,166.46ZM168,216A128.14,128.14,0,0,1,40,88,40.2,40.2,0,0,1,74.87,48a.61.61,0,0,0,0,.12l21,47L75.2,119.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,6.92,6.92,0,0,0,.74-.57L160.89,160l47,21.06h0s.08,0,.11,0A40.21,40.21,0,0,1,168,216ZM136,64a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H144A8,8,0,0,1,136,64Zm0,40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H144A8,8,0,0,1,136,104Z"></path>
          </svg>
        ) : (
          // Phone plus icon when closed
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 256 256"
            className="text-white"
            fill="currentColor"
          >
            <path d="M214.36,166.46l-47.1-21.11-.12-.06a16,16,0,0,0-15.18,1.4,8.12,8.12,0,0,0-.75.56L126.87,168c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06.61.61,0,0,1,0-.12L89.54,41.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,24,88c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,214.36,166.46ZM168,216A128.14,128.14,0,0,1,40,88,40.2,40.2,0,0,1,74.87,48a.61.61,0,0,0,0,.12l21,47L75.2,119.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,6.92,6.92,0,0,0,.74-.57L160.89,160l47,21.06h0s.08,0,.11,0A40.21,40.21,0,0,1,168,216ZM136,80a8,8,0,0,1,8-8h24V48a8,8,0,0,1,16,0V72h24a8,8,0,0,1,0,16H184v24a8,8,0,0,1-16,0V88H144A8,8,0,0,1,136,80Z"></path>
          </svg>
        )}
      </button>
    </div>
  )
}
