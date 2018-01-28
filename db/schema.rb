# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180128011453) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "residencies", force: :cascade do |t|
    t.text     "discipline"
    t.text     "name",                           null: false
    t.text     "description"
    t.text     "address",                        null: false
    t.float    "latitude",                       null: false
    t.float    "longitude",                      null: false
    t.text     "state",                          null: false
    t.text     "website_url"
    t.text     "num_residents"
    t.text     "num_rotating_students"
    t.text     "merger_status"
    t.text     "application_instructions"
    t.text     "comlex_requirement"
    t.text     "usmle_requirement"
    t.text     "rotation_required"
    t.text     "interview_date"
    t.text     "interview_count"
    t.text     "program_director"
    t.text     "coordinator_name"
    t.text     "coordinator_email"
    t.text     "coordinator_number"
    t.text     "med_student_coordinator_name"
    t.text     "med_student_coordinator_email"
    t.text     "med_student_coordinator_number"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",                                                                                                               null: false
    t.string   "email",                                                                                                                  null: false
    t.string   "password_digest",                                                                                                        null: false
    t.string   "session_token",                                                                                                          null: false
    t.string   "image_url",       default: "http://res.cloudinary.com/dfrrpfeus/image/upload/v1481151098/default-profile-01_affz2k.png", null: false
    t.datetime "created_at",                                                                                                             null: false
    t.datetime "updated_at",                                                                                                             null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
