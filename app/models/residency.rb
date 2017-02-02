class Residency < ActiveRecord::Base
    validates :name, :street, :city, :state, :website_url, :description, presence: true

    has_many :coordinators
    has_many :med_student_coordinators
end
