class BookOrder < ApplicationRecord
  belongs_to :book
  belongs_to :order

  validates :book, presence: true
  validates :order, presence: true
end
