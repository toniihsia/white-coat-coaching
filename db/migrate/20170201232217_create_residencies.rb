class CreateResidencies < ActiveRecord::Migration
  def change
    create_table :residencies do |t|
      t.string :program, null: false
      t.string :address, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :PD
      t.string :website_url, null: false
      t.string :positions_ranked
      t.string :coordinator_name
      t.string :coordinator_email
      t.string :coordinator_number
      t.string :med_student_coordinator_name
      t.string :med_student_coordinator_email
      t.string :med_student_coordinator_number
      t.string :num_students
      t.string :max_students
      t.string :crowded_period
      t.string :comlex_cutoff
      t.string :week_cycle
      t.string :rotation_schedule
      t.string :booking_medium
      t.string :booking_date
      t.string :applicants_interviewed
      t.string :interview_date
      t.string :interview_selection
      t.string :curriculum
      t.string :merger_status
      t.text :description, null: false
      t.timestamps null: false
    end
  end
end
