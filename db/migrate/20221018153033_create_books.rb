class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :isbn
      t.string :genre
      t.decimal :rating
      t.string :summary
      t.string :condition
      t.string :description
      t.integer :price
      t.string :image_url
      t.integer :order_status, index: true, default: 0

      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :order, index: true, null: true, foreign_key: true

      t.timestamps
    end
  end
end
