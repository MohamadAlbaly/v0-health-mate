// Map common symptoms to relevant medical specialties
export const symptomToSpecialtyMap: Record<string, string[]> = {
  // General symptoms
  fever: ["General", "Family Medicine", "Internal Medicine"],
  pain: ["General", "Family Medicine", "Internal Medicine"],
  fatigue: ["General", "Family Medicine", "Internal Medicine", "Endocrinology"],
  weakness: ["General", "Family Medicine", "Internal Medicine", "Neurology"],

  // Head-related symptoms
  headache: ["General", "Neurology", "Family Medicine"],
  migraine: ["Neurology", "General"],
  dizziness: ["Neurology", "ENT", "General"],
  vision: ["Ophthalmology", "Neurology"],
  eye: ["Ophthalmology"],
  ear: ["ENT"],
  hearing: ["ENT"],
  nose: ["ENT"],
  throat: ["ENT", "General"],

  // Cardiovascular symptoms
  "chest pain": ["Cardiology", "General", "Emergency"],
  heart: ["Cardiology"],
  palpitation: ["Cardiology", "General"],
  "blood pressure": ["Cardiology", "General", "Internal Medicine"],
  hypertension: ["Cardiology", "Internal Medicine"],

  // Respiratory symptoms
  cough: ["General", "Pulmonology", "ENT"],
  breathing: ["Pulmonology", "Cardiology", "General"],
  asthma: ["Pulmonology", "General"],
  "shortness of breath": ["Pulmonology", "Cardiology", "General", "Emergency"],

  // Digestive symptoms
  stomach: ["Gastroenterology", "General"],
  "abdominal pain": ["Gastroenterology", "General", "Surgery"],
  nausea: ["Gastroenterology", "General"],
  vomiting: ["Gastroenterology", "General", "Emergency"],
  diarrhea: ["Gastroenterology", "General"],
  constipation: ["Gastroenterology", "General"],
  indigestion: ["Gastroenterology", "General"],

  // Musculoskeletal symptoms
  "back pain": ["Orthopedics", "Neurology", "Physical Therapy"],
  "joint pain": ["Orthopedics", "Rheumatology"],
  muscle: ["Orthopedics", "Physical Therapy", "Sports Medicine"],
  fracture: ["Orthopedics", "Emergency"],
  sprain: ["Orthopedics", "Sports Medicine", "Physical Therapy"],
  arthritis: ["Rheumatology", "Orthopedics"],

  // Skin-related symptoms
  rash: ["Dermatology", "General"],
  skin: ["Dermatology"],
  acne: ["Dermatology"],
  eczema: ["Dermatology"],
  allergy: ["Dermatology", "Immunology", "General"],

  // Urinary symptoms
  urinary: ["Urology", "Nephrology", "General"],
  kidney: ["Nephrology", "Urology"],
  bladder: ["Urology"],

  // Reproductive health
  gynecology: ["Gynecology"],
  pregnancy: ["Obstetrics", "Gynecology"],
  menstrual: ["Gynecology"],
  fertility: ["Gynecology", "Reproductive Medicine"],

  // Mental health
  anxiety: ["Psychiatry", "Psychology"],
  depression: ["Psychiatry", "Psychology"],
  stress: ["Psychiatry", "Psychology", "General"],
  sleep: ["Psychiatry", "Neurology", "General"],
  insomnia: ["Psychiatry", "Neurology"],

  // Dental symptoms
  tooth: ["Dentistry"],
  teeth: ["Dentistry"],
  gum: ["Dentistry"],
  dental: ["Dentistry"],

  // Pediatric symptoms
  child: ["Pediatrics"],
  baby: ["Pediatrics"],
  infant: ["Pediatrics"],
  vaccination: ["Pediatrics", "General", "Family Medicine"],

  // Emergency symptoms
  emergency: ["Emergency"],
  accident: ["Emergency", "Trauma"],
  bleeding: ["Emergency", "Surgery"],
  unconscious: ["Emergency", "Neurology"],
  stroke: ["Emergency", "Neurology"],
  "heart attack": ["Emergency", "Cardiology"],

  // Chronic conditions
  diabetes: ["Endocrinology", "General", "Internal Medicine"],
  thyroid: ["Endocrinology"],
  cancer: ["Oncology"],
  hiv: ["Infectious Disease"],
  autoimmune: ["Rheumatology", "Immunology"],

  // Medications and pharmacy
  prescription: ["Pharmacy", "General"],
  medication: ["Pharmacy", "General"],
  medicine: ["Pharmacy", "General"],
  drug: ["Pharmacy"],

  // Preventive care
  checkup: ["General", "Family Medicine", "Internal Medicine"],
  screening: ["General", "Family Medicine", "Internal Medicine"],
  vaccination: ["General", "Family Medicine", "Pediatrics"],
  immunization: ["General", "Family Medicine", "Pediatrics"],
}

// Function to find specialties based on a symptom
export function findSpecialtiesForSymptom(symptom: string): string[] {
  // Convert to lowercase for case-insensitive matching
  const lowerSymptom = symptom.toLowerCase()

  // Check for exact matches
  if (symptomToSpecialtyMap[lowerSymptom]) {
    return symptomToSpecialtyMap[lowerSymptom]
  }

  // Check for partial matches
  for (const [key, specialties] of Object.entries(symptomToSpecialtyMap)) {
    if (lowerSymptom.includes(key) || key.includes(lowerSymptom)) {
      return specialties
    }
  }

  // Default to general specialties if no match is found
  return ["General", "Family Medicine", "Internal Medicine"]
}
