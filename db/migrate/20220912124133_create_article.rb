class CreateArticle < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|

      t.timestamps
    end
  end
end
