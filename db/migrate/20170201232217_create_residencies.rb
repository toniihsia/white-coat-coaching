class CreateResidencies < ActiveRecord::Migration
  def change
    create_table :residencies do |t|
      t.string :name, null: false
      t.string :street, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :website_url, null: false
      t.text :description, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :coordinator_name
      t.string :coordinator_email
      t.string :coordinator_number
      t.string :med_student_coordinator_name
      t.string :med_student_coordinator_email
      t.string :med_student_coordinator_number
      t.string :PD
      t.integer :num_students
      t.integer :max_students
      t.string :crowded_period_start
      t.string :crowded_period_end
      t.string :schedule_restrictions
      t.date :booking_date
      t.string :booking_medium
      t.string :curriculum
      t.string :merger_status
      t.timestamps null: false
    end
  end
end
