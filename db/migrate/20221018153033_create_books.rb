class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :isbn
      t.string :genre
      t.decimal :rating
      t.string :summary
      t.string :condition
      t.string :description
      t.integer :price
      t.string :image
      t.belongs_to :user, index: true, foreign_key: true
      
      t.timestamps
    end
  end
end
