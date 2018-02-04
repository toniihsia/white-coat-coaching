class AddSignupEmailsTable < ActiveRecord::Migration
  def change
    create_table :signup_emails do |t|
      t.text :email, unique: true
      t.boolean :notified, default: false
      t.timestamps
    end
  end
end
