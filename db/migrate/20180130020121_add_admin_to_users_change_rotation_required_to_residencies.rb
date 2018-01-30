class AddAdminToUsersChangeRotationRequiredToResidencies < ActiveRecord::Migration
  def change
    add_column :users, :admin, :boolean, default: false
    remove_column :residencies, :rotation_required, :text
    add_column :residencies, :rotation_required, :boolean
  end
end
