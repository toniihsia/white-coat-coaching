class CreateErrors < ActiveRecord::Migration
  def change
    create_table :errors do |t|
      t.text :message
      t.text :url
      t.text :error
      t.timestamps null: false
    end
  end
end
