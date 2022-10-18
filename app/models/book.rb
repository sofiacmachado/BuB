class Book < ApplicationRecord
    belongs_to :user
  
    validates :title, presence: true, length: { maximum: 70 }
    validates :author, presence: true, length: { maximum: 70 }
    validates :isbn, presence: true, numericality: { only_integer: true }
    validates :genre, presence: true
    validates :rating, presence: true, numericality: { less_than: 5 }
    validates :description, presence: true, length: { maximum: 2000 }
    validates :condition, presence: true
    validates :condition_description, presence: true, length: { maximum: 800 }
    validates :price, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 99999 } # in EUR
    validates :user, presence: true
  end