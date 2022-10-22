class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :status, index: true, default: 0

      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :book, index: true, foreign_key: true

      t.timestamps
    end
  end
end
