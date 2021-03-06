json.extract! residency, :id, :discipline, :name, :website_url, :description, :street, :city, :state, :zip_code, :num_residents, :num_rotating_students, :merger_status, :latitude, :longitude, :application_instructions, :comlex_requirement, :usmle_requirement, :rotation_required, :interview_date, :interview_count, :program_director
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
json.address do
  json.street residency.street
  json.city residency.city
  json.state residency.state
  json.zip_code residency.zip_code
end
json.errors residency.errors.full_messages
