json.extract! residency, :name, :website_url, :description, :PD, :num_students, :max_students, :curriculum, :merger_status
json.address do
  json.street residency.street
  json.city residency.city
  json.state residency.state
  json.zip_code residency.zip_code
  json.lat residency.latitude
  json.long residency.longitude
end
json.coordinator do
  json.name residency.coordinator_name
  json.email residency.coordinator_email
  json.phone_number residency.coordinator_number
end
json.med_student_coordinator do
  json.name residency.med_student_coordinator_name
  json.email residency.med_student_coordinator_email
  json.phone_number residency.med_student_coordinator_number
end
json.crowded_period do
  json.start_date residency.crowded_period_start
  json.end_date residency.crowded_period_end
end
json.rotation do
  json.schedule_restrictions residency.schedule_restrictions
  json.booking_date residency.booking_date
  json.booking_medium residency.booking_medium
end
