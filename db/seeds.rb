# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Residency.create({name: "Jack Hughston Memorial Hospital", street: "4401 River Chase Dr",
  city: "Phenix City", state: "AL", zip_code: "36867", latitude: 32.5080845, longitude: -85.0086714,
  website_url: "https://www.hughston.com/orthopedic-surgery-residency-program/",
  description: "We are proud to announce the start of the Jack Hughston Memorial Hospital Orthopedic Surgery Residency Program on July 1, 2015.  Our program was approved in December 2014 and we selected 3 residents per year for the incoming intern (OGME1) and first year (OGME2) classes. The mission of the JHMH Orthopedic Surgery Residency Program is to provide a high quality training experience that prepares our resident physicians for comprehensive general or subspecialty orthopedics. The goal is achieved through a structured clinical and didactic educational curriculum that follows nationally established best practices as well as the commitment of faculty and our institutions to this teaching program. The residency training program follows a 5-year track based on osteopathic graduate medical education guidelines, rotating the residents schedule for specific training in all areas of general orthopedic surgery including sports medicine, hand and upper extremity, foot and ankle, pediatric orthopedics, orthopedic trauma, adult reconstruction, spine and rehabilitation.", coordinator_name: "Renee Thomason",
  coordinator_email: "thomason@jhmhospital.com", coordinator_number: "(334) 732-3022",
  med_student_coordinator_name: "", med_student_coordinator_email: "",
  med_student_coordinator_number: "", PD: "Dr. David MacDonald, Dr. Robert Harris",
  num_students: 32, max_students: 6, crowded_period_start: "July", crowded_period_end: "December", schedule_restrictions: "No restrictions", booking_date: "Jan 15", booking_medium: "Email requested dates - Needs affiliation with school", curriculum: "See website", merger_status: "Initial pre-accreditation"})

Residency.create({name: "Valley Consortium for Medical Education", street: "1441 Florida Avenue",
  city: "Modesto", state: "CA", zip_code: "95350", latitude: 37.6661937, longitude: -120.9963818,
  website_url: "https://www.hughston.com/orthopedic-surgery-residency-program/",
  description: "The Valley Orthopedic Surgery Residency began in July 2013. Since our inception we have expanded to new facilities and increased our resident and attending complement accordingly. We are proud to offer excellent clinical and didactic education that will allow our graduates to succeed in any type of orthopedic practice after graduation. Our residents say the strengths of the program are:

Large operative volume and early operative expgit erience
Dedicated teaching faculty that develop personal relationships with the residents
Dedicated education time with focus on evidence based medicine
Opportunity for Elective rotations
Supportive Hospital administration/staff
Collegial work environment", coordinator_name: "",
  coordinator_email: "", coordinator_number: "",
  med_student_coordinator_name: "Michele Helwick", med_student_coordinator_email: "michele.helwick@tenethealth.com",
  med_student_coordinator_number: "(209) 576-3526", PD: "Dr. Mark Treziak",
  num_students: 40, max_students: 6, crowded_period_start: "Aug", crowded_period_end: "Aug", schedule_restrictions: "Begin on Monday", booking_date: "Jan 1", booking_medium: "Send application ( http://www.valleymeded.org/ortho/docs/application.pdf ) to Michele Helwick", curriculum: "See website", merger_status: "Pre-accreditation"})

Residency.create({name: "Riverside University Health System Medical Center", street: "26520 Cactus Ave",
  city: "Moreno Valley", state: "CA", zip_code: "92555", latitude: 33.9119303, longitude: -117.1958666,
  website_url: "http://rcrmc-ortho.org/home/",
  description: "Welcome to the Orthopaedic Surgery Residency program at Riverside University Health System.

Our Residency program offers three categorical positions per year (Total 15). RUHS is a Level 2 trauma territory referral center for Riverside County (the second largest county in the United States). In addition to the standard trauma exposure, we are the motor cross and sky diving capital in the world.

Subspecialty exposure during the residency includes rotations in house to include, Total Joints and Reconstruction, Sports Medicine, Hand and Upper Extremity Trauma, Pediatric Orthopaedics, and Spine.

To augment our case load and exposure, we do have out rotations to include: Pediatric Orthopaedics (Childrens' Hospital of Orange County), Total Joints (Kaiser Riverside)  and ambulatory rotations at Ambulatory Surgery (Kaiser Outpatient Surgical Center).

Since the program has been initiated 12 years ago, it has gained immense popularity. The clinical exposure has been matched with a didactic program to allow for a comprehensive education in orthopaedics.

Our department and residency program take great pride regarding commitment to excellence, by providing state of the art patient care and house staff education.

Please browse our website and feel free to contact me or any of the senior residents to answer any questions you may have.", coordinator_name: "Atrina Johnson",
  coordinator_email: "atrina.johnson@ruhealth.org", coordinator_number: "(951) 486-4698",
  med_student_coordinator_name: "", med_student_coordinator_email: "ruhsrotations@ruhealth.org",
  med_student_coordinator_number: "", PD: "Wade Faerber, DO",
  num_students: 40, max_students: 8, crowded_period_start: "Oct", crowded_period_end: "Oct", schedule_restrictions: "No restrictions", booking_date: "Jan", booking_medium: "Email", curriculum: "See website", merger_status: "Pre-accreditation"})

Residency.create({name: "Community Memorial Health System", street: "147 North Brent St",
  city: "Ventura", state: "CA", zip_code: "93003", latitude: 34.2792761, longitude: -119.2563744,
  website_url: "http://www.cmhshealth.org/residency-program/orthopaedic-surgery.shtml",
  description: "The Orthopaedic Surgery Residency Program at CMHS prides itself on our commitment to provide an educational environment that produces academically and surgically excellent orthopaedic surgeons. Our faculty includes a diverse group of attending physicians with a wide breadth of orthopaedic experience.  Under their supervision, with increasing levels of independence, our residents provide preoperative, operative, and postoperative care for a diverse population of patients.

Residents work through a structured didactic program that is designed to prepare residents for the annual OITE as well as the American Osteopathic Board of Orthopaedic Surgery certification examination. The didactic program is based on protected education time and is bolstered by regular journal clubs, fracture conferences and additional cadaver lab activities. The curriculum is predetermined to allow each resident a transparent schedule for the complete five years of training, with elective and selective rotations built in to allow variations for individual preferences.

Our mission is to foster an environment that includes excellent teaching and scholarly research activity, with a focus on patient care. Our Residency Program is founded on the values of compassion, quality, integrity, and teamwork. Through strong commitment to our core values, education and patient care, we train physicians who are leaders in providing orthopaedic care in the community.", coordinator_name: "Sarah Perry",
  coordinator_email: "sperry@cmhshealth.org", coordinator_number: "(805) 652-5651",
  med_student_coordinator_name: "Diana Sawyer Thompson", med_student_coordinator_email: "",
  med_student_coordinator_number: "", PD: "Dr. Dennis Horvath, Dr. Thomas Golden",
  num_students: 22, max_students: 3, crowded_period_start: "Sept", crowded_period_end: "Oct", schedule_restrictions: "No restrictions", booking_date: "Jan 15-Feb 15", booking_medium: "http://www.cmhshealth.org/residency-program/pdfs/CMHRotation_Application.pdf", curriculum: "See website", merger_status: "Initial pre-accreditation"})

Residency.create({name: "N Broward Hospital District", street: "1600 S. Andrews Ave",
  city: "Fort Lauderdale", state: "FL", zip_code: "33316", latitude: 26.1021322, longitude: -80.1407576,
  website_url: "https://www.browardhealth.org/",
  description: "N/A", coordinator_name: "Jennifer Lopes",
  coordinator_email: "jlopes@browardhealth.org", coordinator_number: "(954) 459-2091",
  med_student_coordinator_name: "", med_student_coordinator_email: "",
  med_student_coordinator_number: "", PD: "Joel Rush, DO",
  num_students: 35, max_students: 5, crowded_period_start: "Sept", crowded_period_end: "Nov", schedule_restrictions: "No restrictions", booking_date: "Jan", booking_medium: "Email jlopes@browardhealth.org", curriculum: "See website", merger_status: "Initial accreditation"})

Residency.create({name: "Largo Medical Center", street: "2025 Indian Rocks Rd",
  city: "Largo", state: "FL", zip_code: "33774", latitude: 27.8982376, longitude: -82.8268174,
  website_url: "http://largomedical.com/professionals/graduate-medical-education/residency-program/orthopedic-surgery/",
  description: "The orthopedic surgery residency program at Largo Medical Center is sponsored by Nova Southeastern University. It is a fully approved, five-year program which provides trainees with the educational and practical experience that will enable them to deliver superior specialized care to patients.

Of great importance is our mission to educate and train the best in orthopedic surgery residents. We design a comprehensive curriculum that is constantly enhanced with resident and faculty feedback.

I encourage you to look around the website and contact the medical education office at (727) 588-5704 if you have any questions about the program, would like to speak to a resident, and/or schedule a visit.", coordinator_name: "Shelby Homzak",
  coordinator_email: "shelby.homzak@hcahealthcare.com", coordinator_number: "(727) 588-5704 x3",
  med_student_coordinator_name: "Maegan Chewning", med_student_coordinator_email: "maegan.chewning@hcahealthcare.com",
  med_student_coordinator_number: "(727) 588-5704 x1", PD: "John Harker, D.O.",
  num_students: 40, max_students: 4, crowded_period_start: "July", crowded_period_end: "Nov", schedule_restrictions: "Begin on Monday", booking_date: "Jan", booking_medium: "http://largomedical.com/util/documents/student-application-for-clinical-rotation.pdf", curriculum: "See website", merger_status: "Initial pre-accreditation"})

  Residency.create({name: "Larkin Community Hospiital", street: "7031 SW 62nd St",
    city: "South Miami", state: "FL", zip_code: "33143", latitude: 25.7126258, longitude: -80.3080861,
    website_url: "http://www.graduatemedicaleducation.org/orthopedic-residency-program/",
    description: "The orthopedic residency program, at Larkin Community Hospital (LCH) in Miami, Florida, obtained accreditation in July 2013 with four residents per year (a total of 20 positions were approved). Larkin Hospital has become one of 12 designated Statutory Teaching Hospitals in Florida and the largest teaching hospital for osteopathic physicians (D.O.) in the United States, offering the largest number of training programs (32 different specialties in total). The expansion of graduate medical education programs at LCH continues to demonstrate the hospital’s commitment to train the next generation of physicians.

The orthopedic residency program is based at the Center for Advanced Orthopedics at Larkin. This unit was created in September 2013 and has as its mission statement to develop a world-class team of professionals to deliver the highest quality of musculoskeletal care focusing on patient satisfaction and cost effectiveness. At the center, we use latest techniques, state of art technology and instrumentation with advanced robotics. Here at Larkin we have developed a unique community based orthopedic program for residents focused on three main components including patient care, education and research.", coordinator_name: "Madeleine Hernandez",
    coordinator_email: "madeleineg@larkinhospital.com", coordinator_number: "(305) 917-0777 X8782",
    med_student_coordinator_name: "Marco Salguero", med_student_coordinator_email: "msalguero@larkinhospital.com",
    med_student_coordinator_number: "305-284-7761", PD: "Michele R. D’Apuzzo, M.D.",
    num_students: 8, max_students: 1, crowded_period_start: "", crowded_period_end: "", schedule_restrictions: "Begin on Monday", booking_date: "Jan", booking_medium: "Send CV and scores to Marco, then will coordinate with Madeleine", curriculum: "See website", merger_status: "Pre-accreditation"})

Residency.create({name: "Midwestern University Chicago", street: "20201 Crawford Ave",
  city: "Olympia Fields", state: "IL", zip_code: "60461", latitude: 41.5228644, longitude: -87.71129529999999,
  website_url: "https://www.midwestern.edu/programs_and_admission/il_osteopathic_medicine/more_about_the_program/master_faculty_series/orthopedic_surgery.html",
  description: "Midwestern University Chicago College of Osteopathic Medicine's Orthopedic Surgery Residency is an AOA approved five year training program designed to provide the resident with advanced and concentrated training in osteopathic orthopedic surgery through both didactic and clinical experiences. At the completion of the program the resident will have obtained the necessary training to qualifiy to sit for the American Osteopathic Board of Orthopedic Surgery certification examination.", coordinator_name: "Sandy Kluk",
  coordinator_email: "sandy.kluk@franciscanalliance.org", coordinator_number: "(708) 747-4000 x81043",
  med_student_coordinator_name: "Gina", med_student_coordinator_email: "luigina.santiago@franciscanalliance.org",
  med_student_coordinator_number: "(708) 747-4000 ext 81681", PD: "",
  num_students: , max_students: , crowded_period_start: "", crowded_period_end: "", schedule_restrictions: "", booking_date: "", booking_medium: "Email/call Gina", curriculum: "See website", merger_status: "Pre-accreditation"})
