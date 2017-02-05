class AddHospPicUrl < ActiveRecord::Migration
  def change
    add_column :residencies, :image_url, :string, null: false, default: 'http://res.cloudinary.com/dfrrpfeus/image/upload/v1486201966/hospital-building_dqj2jh.png'
  end
end
