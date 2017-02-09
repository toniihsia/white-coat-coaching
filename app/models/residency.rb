class Residency < ActiveRecord::Base
    validates :name, :street, :city, :state, :website_url, :longitude, :latitude, presence: true
end
