# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Residency.create({name: "Jack Hughston Memorial Hospital", address: "4401 River Chase Dr, Phoenix City, AL, 36867", state: "AL", latitude: 32.5080845, longitude: -85.0086714,
  website_url: "https://www.hughston.com/orthopedic-surgery-residency-program/",
  description: "We are proud to announce the start of the Jack Hughston Memorial Hospital Orthopedic Surgery Residency Program on July 1, 2015.  Our program was approved in December 2014 and we selected 3 residents per year for the incoming intern (OGME1) and first year (OGME2) classes. The mission of the JHMH Orthopedic Surgery Residency Program is to provide a high quality training experience that prepares our resident physicians for comprehensive general or subspecialty orthopedics. The goal is achieved through a structured clinical and didactic educational curriculum that follows nationally established best practices as well as the commitment of faculty and our institutions to this teaching program. The residency training program follows a 5-year track based on osteopathic graduate medical education guidelines, rotating the residents schedule for specific training in all areas of general orthopedic surgery including sports medicine, hand and upper extremity, foot and ankle, pediatric orthopedics, orthopedic trauma, adult reconstruction, spine and rehabilitation.",
  coordinator_name: "Renee Thomason",
  coordinator_email: "thomason@jhmhospital.com", coordinator_number: "(334) 732-3022",
  med_student_coordinator_name: "", med_student_coordinator_email: "",
  med_student_coordinator_number: "", program_director: "Dr. David MacDonald, Dr. Robert Harris",
  num_residents: 32, num_rotating_students: 6, rotation_required: true, application_instructions: "Email requested dates - Needs affiliation with school",
  merger_status: "Initial pre-accreditation", comlex_requirement: "575", usmle_requirement: "200", interview_date: "Dec 2 and Dec 7, 2017", interview_count: "100"})
