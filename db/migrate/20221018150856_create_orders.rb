class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :checkout_session_id
      t.string :currency
      t.decimal :amount, precision: 10, scale: 2

      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
