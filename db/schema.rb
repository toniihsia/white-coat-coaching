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

ActiveRecord::Schema.define(version: 20170206095358) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "residencies", force: :cascade do |t|
    t.string   "name",                                                                                                                                 null: false
    t.string   "street",                                                                                                                               null: false
    t.string   "city",                                                                                                                                 null: false
    t.string   "state",                                                                                                                                null: false
    t.string   "zip_code"
    t.string   "website_url",                                                                                                                          null: false
    t.float    "latitude",                                                                                                                             null: false
    t.float    "longitude",                                                                                                                            null: false
    t.string   "coordinator_name"
    t.string   "coordinator_email"
    t.string   "coordinator_number"
    t.string   "med_student_coordinator_name"
    t.string   "med_student_coordinator_email"
    t.string   "med_student_coordinator_number"
    t.string   "PD"
    t.string   "crowded_period"
    t.string   "schedule_restrictions"
    t.string   "booking_date"
    t.string   "booking_medium"
    t.string   "curriculum"
    t.string   "merger_status"
    t.datetime "created_at",                                                                                                                           null: false
    t.datetime "updated_at",                                                                                                                           null: false
    t.string   "image_url",                      default: "http://res.cloudinary.com/dfrrpfeus/image/upload/v1486201966/hospital-building_dqj2jh.png", null: false
    t.text     "description"
    t.string   "positions_ranked"
    t.string   "comlex_cutoff"
    t.string   "interview_date"
    t.string   "interview_selection"
    t.string   "num_interviewed"
    t.string   "week_cycle"
    t.string   "residents"
    t.string   "num_students"
    t.string   "max_students"
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
