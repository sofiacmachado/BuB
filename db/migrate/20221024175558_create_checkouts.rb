class CreateCheckouts < ActiveRecord::Migration[6.1]
  def change
    create_table :checkouts do |t|
      t.decimal :amount, precision: 10, scale: 2
      t.string :currency
      t.string :checkout_session_id
      t.datetime :expires_at

      t.belongs_to :user, foreign_key: true

      t.timestamps
    end

    create_table :books_checkouts, id: false do |t|
      t.belongs_to :book
      t.belongs_to :checkout
    end
  end
end
