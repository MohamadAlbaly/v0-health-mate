// Types for our providers
export type ProviderType = "hospital" | "clinic" | "dental" | "pharmacy" | "emergency" | "specialist"
export type InsuranceType = "generali" | "taj" | "private" | "none"

export interface Provider {
  id: number
  name: string
  type: ProviderType
  rating: number
  address: string
  phone: string
  hours: string
  status: "Open" | "Closed"
  distance: string
  specialties: string[]
  image: string
  isPublic: boolean
  acceptsInsurance: InsuranceType[]
  englishSpeaking: boolean
  description: string
  services: string[]
  staff: {
    name: string
    specialty: string
    languages: string[]
  }[]
  facilities: string[]
  website?: string
}

// Providers data
export const providers: Provider[] = [
  {
    id: 1,
    name: "Pécs Dental Center",
    type: "dental",
    rating: 4.6,
    address: "8 Széchenyi tér, Pécs, 7621",
    phone: "+36205094930",
    hours: "8:00 - 16:00",
    status: "Closed",
    distance: "0.6 km away",
    specialties: ["Dentistry"],
    image: "/images/dental-center.png",
    isPublic: false,
    acceptsInsurance: ["generali", "private"],
    englishSpeaking: true,
    description:
      "Pécs Dental Center offers comprehensive dental care with modern equipment and experienced professionals. Services include general dentistry, cosmetic procedures, and emergency dental care.",
    services: ["General Dentistry", "Cosmetic Dentistry", "Dental Implants", "Orthodontics", "Emergency Dental Care"],
    staff: [
      { name: "Dr. Kovács Anna", specialty: "General Dentistry", languages: ["Hungarian", "English", "German"] },
      { name: "Dr. Nagy Péter", specialty: "Orthodontics", languages: ["Hungarian", "English"] },
    ],
    facilities: ["Modern Equipment", "Digital X-ray", "Wheelchair Accessible", "Free Wi-Fi"],
    website: "https://pecs-dental.hu",
  },
  {
    id: 2,
    name: "University of Pécs Clinical Center",
    type: "hospital",
    rating: 4.5,
    address: "13 Ifjúság út, Pécs, 7624",
    phone: "+36205094930",
    hours: "8:00 - 20:00",
    status: "Closed",
    distance: "0.7 km away",
    specialties: ["General", "Cardiology", "Neurology", "Orthopedics"],
    image: "/images/clinical-center.png",
    isPublic: true,
    acceptsInsurance: ["taj", "generali"],
    englishSpeaking: true,
    description:
      "The University of Pécs Clinical Center is the main teaching hospital affiliated with the University of Pécs Medical School. It provides comprehensive healthcare services and specializes in complex medical cases.",
    services: [
      "Emergency Care",
      "Surgery",
      "Diagnostic Imaging",
      "Laboratory Services",
      "Inpatient Care",
      "Outpatient Services",
    ],
    staff: [
      { name: "Dr. Szabó János", specialty: "Cardiology", languages: ["Hungarian", "English"] },
      { name: "Dr. Horváth Mária", specialty: "Neurology", languages: ["Hungarian", "English", "French"] },
      { name: "Dr. Kiss István", specialty: "Orthopedics", languages: ["Hungarian", "German"] },
    ],
    facilities: ["MRI", "CT Scan", "ICU", "Cafeteria", "Pharmacy", "Parking"],
    website: "https://aok.pte.hu/en",
  },
  {
    id: 3,
    name: "Pécs Medical Center",
    type: "clinic",
    rating: 4.3,
    address: "22 Rákóczi út, Pécs, 7621",
    phone: "+36205094930",
    hours: "9:00 - 17:00",
    status: "Open",
    distance: "1.2 km away",
    specialties: ["Family Medicine", "Pediatrics", "Gynecology"],
    image: "/placeholder.svg?key=a3eya",
    isPublic: false,
    acceptsInsurance: ["generali", "private"],
    englishSpeaking: true,
    description:
      "Pécs Medical Center is a private clinic offering a range of outpatient services with a focus on family medicine, pediatrics, and women's health.",
    services: ["General Check-ups", "Vaccinations", "Prenatal Care", "Pediatric Consultations", "Women's Health"],
    staff: [
      { name: "Dr. Tóth Katalin", specialty: "Family Medicine", languages: ["Hungarian", "English"] },
      { name: "Dr. Varga Zoltán", specialty: "Pediatrics", languages: ["Hungarian", "English", "Croatian"] },
      { name: "Dr. Molnár Éva", specialty: "Gynecology", languages: ["Hungarian", "German"] },
    ],
    facilities: ["Child-friendly Waiting Area", "Laboratory", "Ultrasound", "Wheelchair Accessible"],
    website: "https://pecsmedicalcenter.hu",
  },
  {
    id: 4,
    name: "Zsolnay Pharmacy",
    type: "pharmacy",
    rating: 4.8,
    address: "8 Zsolnay Vilmos utca, Pécs, 7622",
    phone: "+36205094930",
    hours: "0:00 - 24:00",
    status: "Open",
    distance: "1.5 km away",
    specialties: ["Pharmacy", "Medical Supplies"],
    image: "/placeholder.svg?key=gx1x6",
    isPublic: false,
    acceptsInsurance: ["taj", "generali", "private"],
    englishSpeaking: true,
    description:
      "SIPO Zsolnay Pharmacy is a 24/7 pharmacy offering a wide range of medications, medical supplies, and health consultations.",
    services: [
      "Prescription Filling",
      "Over-the-counter Medications",
      "Medical Supplies",
      "Health Consultations",
      "Compounding",
    ],
    staff: [
      { name: "Németh Júlia", specialty: "Pharmacist", languages: ["Hungarian", "English"] },
      { name: "Balogh Tamás", specialty: "Pharmacy Assistant", languages: ["Hungarian", "English", "German"] },
    ],
    facilities: ["24/7 Service", "Drive-through Window", "Consultation Room"],
    website: "https://zsolnaypatika.hu",
  },
  {
    id: 5,
    name: "Pécs Emergency Medical Center",
    type: "emergency",
    rating: 4.2,
    address: "2 Rákóczi út, Pécs, 7621",
    phone: "+36205094930",
    hours: "0:00 - 24:00",
    status: "Open",
    distance: "0.9 km away",
    specialties: ["Emergency Medicine", "Trauma"],
    image: "/placeholder.svg?key=91asa",
    isPublic: true,
    acceptsInsurance: ["taj", "generali"],
    englishSpeaking: false,
    description:
      "Pécs Emergency Medical Center provides 24/7 emergency medical services for acute conditions and injuries.",
    services: ["Emergency Care", "Trauma Care", "Critical Care", "Ambulance Services"],
    staff: [
      { name: "Dr. Fekete Gábor", specialty: "Emergency Medicine", languages: ["Hungarian"] },
      { name: "Dr. Szilágyi Andrea", specialty: "Trauma Surgery", languages: ["Hungarian", "German"] },
    ],
    facilities: ["Trauma Rooms", "Resuscitation Equipment", "Ambulance Bay", "Helicopter Pad"],
    website: "https://pecsisugo.hu",
  },
  {
    id: 6,
    name: "Mecsek Cardiology Center",
    type: "specialist",
    rating: 4.7,
    address: "45 Bajcsy-Zsilinszky út, Pécs, 7622",
    phone: "+36205094930",
    hours: "8:00 - 16:00",
    status: "Closed",
    distance: "2.1 km away",
    specialties: ["Cardiology", "Cardiovascular Surgery"],
    image: "/placeholder.svg?key=6re10",
    isPublic: false,
    acceptsInsurance: ["generali", "private"],
    englishSpeaking: true,
    description:
      "Mecsek Cardiology Center specializes in the diagnosis and treatment of heart and vascular conditions with state-of-the-art equipment.",
    services: [
      "Cardiac Consultations",
      "ECG",
      "Echocardiography",
      "Stress Tests",
      "Holter Monitoring",
      "Cardiac Rehabilitation",
    ],
    staff: [
      { name: "Dr. Kerekes János", specialty: "Cardiology", languages: ["Hungarian", "English"] },
      {
        name: "Dr. Papp Viktória",
        specialty: "Cardiovascular Surgery",
        languages: ["Hungarian", "English", "Spanish"],
      },
    ],
    facilities: ["Cardiac Catheterization Lab", "ECG Lab", "Rehabilitation Center"],
    website: "https://mecsekcardiocenter.hu",
  },
  {
    id: 7,
    name: "Árkád Medical Clinic",
    type: "clinic",
    rating: 4.4,
    address: "Árkád Shopping Center, Bajcsy-Zsilinszky út, Pécs, 7622",
    phone: "+36205094930",
    hours: "10:00 - 20:00",
    status: "Open",
    distance: "1.8 km away",
    specialties: ["General Practice", "Dermatology", "Ophthalmology"],
    image: "/placeholder.svg?key=5my67",
    isPublic: false,
    acceptsInsurance: ["generali", "private"],
    englishSpeaking: true,
    description:
      "Conveniently located in the Árkád Shopping Center, this clinic offers various medical services with extended hours.",
    services: ["General Check-ups", "Skin Consultations", "Eye Examinations", "Minor Procedures"],
    staff: [
      { name: "Dr. Lakatos Béla", specialty: "General Practice", languages: ["Hungarian", "English"] },
      { name: "Dr. Simon Eszter", specialty: "Dermatology", languages: ["Hungarian", "English", "Italian"] },
      { name: "Dr. Török Zsolt", specialty: "Ophthalmology", languages: ["Hungarian", "German"] },
    ],
    facilities: ["Modern Equipment", "Optical Shop", "Pharmacy Nearby", "Shopping Center Amenities"],
    website: "https://arkadclinic.hu",
  },
  {
    id: 8,
    name: "Honvéd Hospital",
    type: "hospital",
    rating: 4.1,
    address: "1 Akác utca, Pécs, 7621",
    phone: "+36205094930",
    hours: "0:00 - 24:00",
    status: "Open",
    distance: "2.5 km away",
    specialties: ["General Surgery", "Trauma", "Rehabilitation"],
    image: "/placeholder.svg?height=400&width=600&query=military hospital building",
    isPublic: true,
    acceptsInsurance: ["taj"],
    englishSpeaking: false,
    description:
      "Originally a military hospital, Honvéd Hospital now serves the general public with a focus on trauma care and rehabilitation.",
    services: ["Emergency Care", "Surgery", "Trauma Care", "Physical Rehabilitation", "Inpatient Care"],
    staff: [
      { name: "Dr. Nagy Sándor", specialty: "General Surgery", languages: ["Hungarian"] },
      { name: "Dr. Kovács Péter", specialty: "Trauma Surgery", languages: ["Hungarian"] },
      { name: "Dr. Szabó Júlia", specialty: "Rehabilitation Medicine", languages: ["Hungarian", "Russian"] },
    ],
    facilities: ["Operating Theaters", "Rehabilitation Center", "Physical Therapy Gym", "Inpatient Wards"],
    website: "https://honvedkorhaz.hu",
  },
  {
    id: 9,
    name: "Mecsek Pediatric Clinic",
    type: "clinic",
    rating: 4.9,
    address: "12 Dischka Győző utca, Pécs, 7621",
    phone: "+36205094930",
    hours: "8:00 - 18:00",
    status: "Closed",
    distance: "1.3 km away",
    specialties: ["Pediatrics", "Child Psychology", "Child Neurology"],
    image: "/placeholder.svg?height=400&width=600&query=colorful pediatric clinic with playground",
    isPublic: false,
    acceptsInsurance: ["generali", "private"],
    englishSpeaking: true,
    description:
      "A specialized clinic for children offering comprehensive pediatric care in a child-friendly environment.",
    services: [
      "Well-child Visits",
      "Vaccinations",
      "Developmental Assessments",
      "Behavioral Consultations",
      "Neurological Evaluations",
    ],
    staff: [
      { name: "Dr. Fehér Katalin", specialty: "Pediatrics", languages: ["Hungarian", "English", "French"] },
      { name: "Dr. Németh Balázs", specialty: "Child Psychology", languages: ["Hungarian", "English"] },
      { name: "Dr. Varga Lilla", specialty: "Child Neurology", languages: ["Hungarian", "German"] },
    ],
    facilities: ["Playroom", "Child-friendly Examination Rooms", "Sensory Room", "Outdoor Playground"],
    website: "https://mecsekpediatrics.hu",
  },
  {
    id: 10,
    name: "Uránváros Health Center",
    type: "clinic",
    rating: 4.0,
    address: "2 Veress Endre utca, Pécs, 7621",
    phone: "+36205094930",
    hours: "7:00 - 19:00",
    status: "Open",
    distance: "3.2 km away",
    specialties: ["Family Medicine", "Internal Medicine", "Endocrinology"],
    image: "/placeholder.svg?height=400&width=600&query=community health center building",
    isPublic: true,
    acceptsInsurance: ["taj", "generali"],
    englishSpeaking: false,
    description:
      "A community health center serving the Uránváros district with primary care and some specialty services.",
    services: ["Primary Care", "Chronic Disease Management", "Preventive Care", "Laboratory Services", "Diabetes Care"],
    staff: [
      { name: "Dr. Horváth Zoltán", specialty: "Family Medicine", languages: ["Hungarian"] },
      { name: "Dr. Kiss Erzsébet", specialty: "Internal Medicine", languages: ["Hungarian"] },
      { name: "Dr. Szabó Tamás", specialty: "Endocrinology", languages: ["Hungarian", "Croatian"] },
    ],
    facilities: ["Laboratory", "ECG", "Ultrasound", "Community Health Education Room"],
    website: "https://uranvaroshealth.hu",
  },
  {
    id: 11,
    name: "Pécs Orthopedic Institute",
    type: "specialist",
    rating: 4.6,
    address: "33 Petőfi utca, Pécs, 7624",
    phone: "+36205094930",
    hours: "9:00 - 17:00",
    status: "Closed",
    distance: "1.9 km away",
    specialties: ["Orthopedics", "Sports Medicine", "Physical Therapy"],
    image: "/placeholder.svg?height=400&width=600&query=orthopedic clinic with rehabilitation equipment",
    isPublic: false,
    acceptsInsurance: ["generali", "private"],
    englishSpeaking: true,
    description:
      "Specializing in musculoskeletal conditions, this institute offers comprehensive orthopedic care and rehabilitation services.",
    services: [
      "Orthopedic Consultations",
      "Sports Injury Treatment",
      "Joint Replacement",
      "Physical Therapy",
      "Gait Analysis",
    ],
    staff: [
      { name: "Dr. Balogh István", specialty: "Orthopedic Surgery", languages: ["Hungarian", "English", "German"] },
      { name: "Dr. Molnár Gergely", specialty: "Sports Medicine", languages: ["Hungarian", "English"] },
      { name: "Kovács Júlia", specialty: "Physical Therapy", languages: ["Hungarian", "English"] },
    ],
    facilities: ["Digital X-ray", "Ultrasound", "Physical Therapy Gym", "Gait Analysis Lab"],
    website: "https://pecsortho.hu",
  },
  {
    id: 12,
    name: "Mecsek Mental Health Center",
    type: "specialist",
    rating: 4.3,
    address: "5 Király utca, Pécs, 7621",
    phone: "+36205094930",
    hours: "8:00 - 16:00",
    status: "Closed",
    distance: "0.8 km away",
    specialties: ["Psychiatry", "Psychology", "Psychotherapy"],
    image: "/placeholder.svg?height=400&width=600&query=calm mental health clinic interior",
    isPublic: false,
    acceptsInsurance: ["generali", "private"],
    englishSpeaking: true,
    description:
      "A private mental health center offering a range of psychiatric and psychological services in a supportive environment.",
    services: [
      "Psychiatric Evaluations",
      "Individual Therapy",
      "Group Therapy",
      "Medication Management",
      "Stress Management",
    ],
    staff: [
      { name: "Dr. Nagy Viktória", specialty: "Psychiatry", languages: ["Hungarian", "English"] },
      { name: "Szabó Péter", specialty: "Clinical Psychology", languages: ["Hungarian", "English", "Spanish"] },
      { name: "Kovács Márta", specialty: "Psychotherapy", languages: ["Hungarian", "German"] },
    ],
    facilities: ["Private Therapy Rooms", "Group Therapy Space", "Relaxation Room", "Art Therapy Studio"],
    website: "https://mecsekmentalhealth.hu",
  },
]

// Filter options
export const filterOptions = {
  providerTypes: [
    { value: "hospital", label: "Hospital" },
    { value: "clinic", label: "Clinic" },
    { value: "dental", label: "Dental Center" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "emergency", label: "Emergency Center" },
    { value: "specialist", label: "Specialist Practice" },
  ],
  insuranceTypes: [
    { value: "taj", label: "TAJ Card" },
    { value: "generali", label: "Generali STUDIUM" },
    { value: "private", label: "Private Insurance" },
  ],
  facilities: [
    { value: "wheelchair", label: "Wheelchair Accessible" },
    { value: "parking", label: "Parking Available" },
    { value: "laboratory", label: "On-site Laboratory" },
    { value: "pharmacy", label: "On-site Pharmacy" },
  ],
  other: [
    { value: "public", label: "Public Institutions" },
    { value: "private", label: "Private Institutions" },
    { value: "english", label: "English-speaking Staff" },
    { value: "open", label: "Currently Open" },
  ],
}
