class Residency < ActiveRecord::Base
    validates :name, :street, :city, :state, :website_url, :description, :longitude, :latitude, presence: true
end
