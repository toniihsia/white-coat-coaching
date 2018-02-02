class Residency < ActiveRecord::Base
    validates :name, :street, :state, :longitude, :latitude, presence: true
end
