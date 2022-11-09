class CreateCharges < ActiveRecord::Migration[6.1]
  def change
    create_table :charges do |t|
      t.decimal :amount, precision: 10, scale: 2
      t.string :currency
      t.string :checkout_session_id
      t.boolean :complete, default: false

      t.belongs_to :order, foreign_key: true

      t.timestamps
    end
  end
end
