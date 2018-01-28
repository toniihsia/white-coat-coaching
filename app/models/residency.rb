class Residency < ActiveRecord::Base
    validates :name, :address, :state, :longitude, :latitude, presence: true
end
