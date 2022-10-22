class Order < ApplicationRecord
    belongs_to :user
    belongs_to :book
    has_many :charges 
  
    validates :user, presence: true
    validates :book, presence: true
  
    end
  end