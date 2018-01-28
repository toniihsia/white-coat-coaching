class RecreateResidenciesTable < ActiveRecord::Migration
  def change
    drop_table :residencies

    create_table :residencies do |t|
      t.text :discipline
      t.text :name, null: false
      t.text :description
      t.text :address, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.text :state, null: false
      t.text :website_url
      t.text :num_residents
      t.text :num_rotating_students
      t.text :merger_status
      t.text :application_instructions
      t.text :comlex_requirement
      t.text :usmle_requirement
      t.text :rotation_required
      t.text :interview_date
      t.text :interview_count
      t.text :program_director
      t.text :coordinator_name
      t.text :coordinator_email
      t.text :coordinator_number
      t.text :med_student_coordinator_name
      t.text :med_student_coordinator_email
      t.text :med_student_coordinator_number
      t.timestamps null: false
    end
  end
end
