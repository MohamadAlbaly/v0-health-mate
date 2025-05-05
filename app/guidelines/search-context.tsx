"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for our search context
type SearchMode = "search" | "chat"
type ChatMessage = {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

type SearchResult = {
  id: string
  title: string
  content: string
  section: string
  sectionId: string
}

type SearchContextType = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchMode: SearchMode
  setSearchMode: (mode: SearchMode) => void
  searchResults: SearchResult[]
  isSearching: boolean
  showResults: boolean
  setShowResults: (show: boolean) => void
  chatMessages: ChatMessage[]
  addUserMessage: (content: string) => void
  addAssistantMessage: (content: string) => void
  isChatOpen: boolean
  setIsChatOpen: (open: boolean) => void
  clearChat: () => void
  suggestedQuestions: string[]
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Sample data for search results based on our guidelines content
const guidelinesData = [
  {
    id: "getting-started",
    title: "Getting Started",
    content:
      "Full coverage general health insurance is mandatory for registration at the University of Pécs for non-Hungarian, non-EU students.",
    section: "Getting Started",
    sectionId: "getting-started",
  },
  {
    id: "generali-studium",
    title: "Generali STUDIUM Health Insurance",
    content:
      "This insurance provides fee-for-service coverage within Hungary, including medical procedures, treatments, physician and hospital services.",
    section: "Generali STUDIUM Health Insurance",
    sectionId: "generali-studium",
  },
  {
    id: "taj-card",
    title: "The Hungarian Social Security Card (TAJ)",
    content:
      "The TAJ card provides access to Hungary's public healthcare system. Stipendium Hungaricum scholarship recipients usually receive a TAJ card for free.",
    section: "The Hungarian Social Security Card (TAJ)",
    sectionId: "taj-card",
  },
  {
    id: "navigating-healthcare",
    title: "Navigating the Healthcare System",
    content:
      "With a TAJ card, students can access public healthcare services. Without a TAJ card, payment is required.",
    section: "Navigating the Healthcare System",
    sectionId: "navigating-healthcare",
  },
  {
    id: "private-healthcare",
    title: "Private Healthcare Options",
    content:
      "Private healthcare can offer shorter waiting times, more modern facilities, and a higher chance of English-speaking staff.",
    section: "Private Healthcare Options",
    sectionId: "private-healthcare",
  },
  {
    id: "health-considerations",
    title: "Important Health Considerations",
    content:
      "Generali STUDIUM typically doesn't cover pre-existing conditions. The TAJ card via voluntary agreement may also have limitations.",
    section: "Important Health Considerations",
    sectionId: "health-considerations",
  },
  {
    id: "key-contacts",
    title: "Key Contacts and Emergency Information",
    content:
      "Emergency number: 112. For ambulance services, call 104. The University of Pécs Clinical Centre has an Emergency Department.",
    section: "Key Contacts and Emergency Information",
    sectionId: "key-contacts",
  },
  {
    id: "emergency-numbers",
    title: "Emergency Numbers",
    content: "112: General Emergency (Police, Fire, Ambulance), 104: Ambulance, 105: Fire Brigade, 107: Police",
    section: "Key Contacts and Emergency Information",
    sectionId: "key-contacts",
  },
  {
    id: "night-medical",
    title: "Night Medical Duty",
    content:
      "The 'Felnőtt Háziorvosi Ügyelet' (Night medical duty for adults) is at Janus Pannonius Clinical Center, open daily 15:00-07:00.",
    section: "Important Health Considerations",
    sectionId: "health-considerations",
  },
  {
    id: "pharmacy",
    title: "Non-Stop Pharmacy",
    content:
      "The Non-Stop Pharmacy, SIPO Zsolnay Patika, is at 7622 Pécs, Zsolnay Vilmos utca 8; phone +36 72 516 760.",
    section: "Important Health Considerations",
    sectionId: "health-considerations",
  },
]

// Sample suggested questions
const initialSuggestedQuestions = [
  "How do I get a TAJ card?",
  "What should I do if I feel sick at night?",
  "Where is the nearest pharmacy?",
  "How much does health insurance cost?",
  "What emergency numbers should I know?",
]

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchMode, setSearchMode] = useState<SearchMode>("search")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(initialSuggestedQuestions)

  // Search function
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simple search implementation
    const query = searchQuery.toLowerCase()
    const results = guidelinesData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query),
    )

    // Simulate a slight delay for the search
    const timer = setTimeout(() => {
      setSearchResults(results)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Add a user message to the chat
  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    }
    setChatMessages((prev) => [...prev, newMessage])
    setIsChatOpen(true)

    // Generate an assistant response
    generateAssistantResponse(content)
  }

  // Add an assistant message to the chat
  const addAssistantMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: false,
      timestamp: new Date(),
    }
    setChatMessages((prev) => [...prev, newMessage])
  }

  // Clear the chat
  const clearChat = () => {
    setChatMessages([])
  }

  // Generate a response based on the user's question
  const generateAssistantResponse = (userQuestion: string) => {
    // Simulate a delay for the assistant's response
    setTimeout(() => {
      const question = userQuestion.toLowerCase()

      // Simple pattern matching for common questions
      if (question.includes("taj card") || question.includes("taj kártya")) {
        addAssistantMessage(
          "To get a TAJ card, apply in person at the local office of the National Health Insurance Fund (NEAK) at Nagy Lajos Király Street 3, Pécs, 7623. Required documents include your university registration card, address card, enrollment certificate, and passport. Stipendium Hungaricum scholarship recipients usually receive a TAJ card for free.",
        )
      } else if (question.includes("sick") && question.includes("night")) {
        addAssistantMessage(
          "If you feel sick at night, you can visit the 'Felnőtt Háziorvosi Ügyelet' (Night medical duty for adults) at Janus Pannonius Clinical Center, Ifjúság útja 13. It's open daily from 15:00-07:00 and 24 hours on weekends/holidays. You can also call them at +36 72 515 104. For emergencies, dial 112 or 104 for an ambulance.",
        )
      } else if (question.includes("pharmacy") || question.includes("medicine")) {
        addAssistantMessage(
          "The Non-Stop Pharmacy, SIPO Zsolnay Patika, is at 7622 Pécs, Zsolnay Vilmos utca 8; phone +36 72 516 760. It's open 24/7. Árkád Pharmacy in the Árkád shopping mall is also open daily with extended hours.",
        )
      } else if (question.includes("insurance") && question.includes("cost")) {
        addAssistantMessage(
          "The annual cost of Generali STUDIUM insurance is approximately 96,000 HUF. For the TAJ card, as of January 2024, the monthly contribution fee for non-EEA students voluntarily enrolling is 80,040 HUF. Private insurance premiums can range from approximately €300 to €1,200 annually.",
        )
      } else if (question.includes("emergency") && question.includes("number")) {
        addAssistantMessage(
          "Important emergency numbers in Hungary:\n• 112: General Emergency (Police, Fire, Ambulance)\n• 104: Ambulance\n• 105: Fire Brigade\n• 107: Police\nThese numbers are toll-free and available 24/7. The 112 service has English-speaking operators.",
        )
      } else {
        addAssistantMessage(
          "I'm here to help with questions about healthcare in Hungary for international students. You can ask me about insurance options, emergency services, finding doctors, or any other health-related concerns. If you need specific information, please provide more details about your question.",
        )
      }

      // Update suggested questions based on the conversation
      updateSuggestedQuestions(userQuestion)
    }, 1000)
  }

  // Update suggested questions based on the conversation context
  const updateSuggestedQuestions = (lastQuestion: string) => {
    const question = lastQuestion.toLowerCase()

    if (question.includes("taj card")) {
      setSuggestedQuestions([
        "How much does a TAJ card cost?",
        "What documents do I need for a TAJ card?",
        "What services are covered with a TAJ card?",
        "Can I use my TAJ card at private clinics?",
        "How long is a TAJ card valid?",
      ])
    } else if (question.includes("sick") || question.includes("emergency")) {
      setSuggestedQuestions([
        "Where is the nearest emergency room?",
        "How do I find a doctor who speaks English?",
        "What should I do if I need an ambulance?",
        "Are emergency services free?",
        "Do I need a referral to see a specialist?",
      ])
    } else if (question.includes("insurance")) {
      setSuggestedQuestions([
        "What does Generali STUDIUM insurance cover?",
        "How do I make an insurance claim?",
        "Are pre-existing conditions covered?",
        "Can I get insurance after arriving in Hungary?",
        "Which insurance is best for international students?",
      ])
    } else {
      setSuggestedQuestions(initialSuggestedQuestions)
    }
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchMode,
        setSearchMode,
        searchResults,
        isSearching,
        showResults,
        setShowResults,
        chatMessages,
        addUserMessage,
        addAssistantMessage,
        isChatOpen,
        setIsChatOpen,
        clearChat,
        suggestedQuestions,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
