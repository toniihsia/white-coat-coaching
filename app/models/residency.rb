class Residency < ActiveRecord::Base
    validates :name, :street, :city, :state, :website_url, :description, presence: true
end
