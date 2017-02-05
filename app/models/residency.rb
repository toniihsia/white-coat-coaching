class Residency < ActiveRecord::Base
    validates :name, :street, :city, :zip_code, :website_url, :description, :latitude, :longitude, presence: true

    has_many :coordinators
    has_many :med_student_coordinators
end
