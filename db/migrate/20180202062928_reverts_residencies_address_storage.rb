class RevertsResidenciesAddressStorage < ActiveRecord::Migration
  def change
    rename_column :residencies, :address, :street
    add_column :residencies, :city, :text
    add_column :residencies, :zip_code, :text
  end
end
