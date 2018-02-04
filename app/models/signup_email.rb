class SignupEmail < ActiveRecord::Base
  validates :email, uniqueness: true
end
