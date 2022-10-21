class Order < ApplicationRecord
    belongs_to :user
    belongs_to :book
    belongs_to :cart
    has_many :charges 
  
    validates :user, presence: true
    validates :book, presence: true
    validates :cart, presence: true
  
    end
  end