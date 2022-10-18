class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :isbn
      t.string :genre
      t.integer :rating
      t.string :description
      t.string :condition
      t.string :condition_description
      t.integer :price
      t.string :image
      t.belongs_to :user, index: true, foreign_key: true
      
      t.timestamps
    end
  end
end
