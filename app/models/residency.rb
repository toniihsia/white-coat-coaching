class Residency < ActiveRecord::Base
    validates :program, :address, :website_url, :description, :latitude, :longitude, presence: true

    has_many :coordinators
    has_many :med_student_coordinators
end
