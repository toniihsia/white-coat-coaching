# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Residency.create({name: "Jack Hughston Memorial Hospital", street: "4401 River Chase Dr",
  city: "Phenix City", state: "AL", zip_code: "36867" lat: 32.5080845, long: -85.0086714,
  website_url: "https://www.hughston.com/orthopedic-surgery-residency-program/",
  description: "We are proud to announce the start of the Jack Hughston Memorial Hospital Orthopedic Surgery Residency Program on July 1, 2015.  Our program was approved in December 2014 and we selected 3 residents per year for the incoming intern (OGME1) and first year (OGME2) classes. The mission of the JHMH Orthopedic Surgery Residency Program is to provide a high quality training experience that prepares our resident physicians for comprehensive general or subspecialty orthopedics. The goal is achieved through a structured clinical and didactic educational curriculum that follows nationally established best practices as well as the commitment of faculty and our institutions to this teaching program. The residency training program follows a 5-year track based on osteopathic graduate medical education guidelines, rotating the residents schedule for specific training in all areas of general orthopedic surgery including sports medicine, hand and upper extremity, foot and ankle, pediatric orthopedics, orthopedic trauma, adult reconstruction, spine and rehabilitation.", coordinator_name: "Renee Thomason",
  coordinator_email: "thomason@jhmhospital.com", coordinator_number: "(334) 732-3022",
  med_student_coordinator_name: "", med_student_coordinator_email: "",
  med_student_coordinator_number: "", PD: "Dr. David MacDonald, Dr. Robert Harris",
  num_students: 32, max_students: 6, crowded_period_start: "July", crowded_period_end: "December", schedule_restrictions: "No restrictions", booking_date: "Jan 15", booking_medium: "Email requested dates - Needs affiliation with school", curriculum: "See website", merger_status: "Initial pre-accreditation"})

Residency.create({name: "Valley Consortium for Medical Education", street: "1441 Florida Avenue",
  city: "Modesto", state: "CA", zip_code: "95350" lat: 37.6661937, long: -120.9963818,
  website_url: "https://www.hughston.com/orthopedic-surgery-residency-program/",
  description: "The Valley Orthopedic Surgery Residency began in July 2013. Since our inception we have expanded to new facilities and increased our resident and attending complement accordingly. We are proud to offer excellent clinical and didactic education that will allow our graduates to succeed in any type of orthopedic practice after graduation. Our residents say the strengths of the program are:

Large operative volume and early operative experience
Dedicated teaching faculty that develop personal relationships with the residents
Dedicated education time with focus on evidence based medicine
Opportunity for Elective rotations
Supportive Hospital administration/staff
Collegial work environment", coordinator_name: "",
  coordinator_email: "", coordinator_number: "",
  med_student_coordinator_name: "Michele Helwick", med_student_coordinator_email: "michele.helwick@tenethealth.com",
  med_student_coordinator_number: "(209) 576-3526", PD: "Dr. Mark Treziak",
  num_students: 40, max_students: 6, crowded_period_start: "Aug", crowded_period_end: "Aug", schedule_restrictions: "Begin on Monday", booking_date: "Jan 1", booking_medium: "Send application ( http://www.valleymeded.org/ortho/docs/application.pdf ) to Michele Helwick", curriculum: "See website", merger_status: "Pre-accreditation"})
