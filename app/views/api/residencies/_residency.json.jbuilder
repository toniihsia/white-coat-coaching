json.extract! residency, :id, :name, :image_url, :website_url, :description, :PD, :num_students, :max_students, :curriculum, :merger_status, :latitude, :longitude, :crowded_period, :positions_ranked, :comlex_cutoff, :week_cycle, :residents
json.address do
  json.street residency.street
  json.city residency.city
  json.state residency.state
  json.zip_code residency.zip_code
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
json.rotation do
  json.schedule_restrictions residency.schedule_restrictions
  json.booking_date residency.booking_date
  json.booking_medium residency.booking_medium
end
json.interview do
  json.interview_date residency.interview_date
  json.interview_selection residency.interview_selection
  json.num_interviewed residency.num_interviewed
end
