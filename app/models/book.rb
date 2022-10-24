class Book < ApplicationRecord
  belongs_to :user
  belongs_to :order, optional: true

  enum order_status: {
    ordered: 0,
    shipping: 1,
    received: 2,
  }, _prefix: true

  validates :title, presence: true, length: { maximum: 70 }
  validates :author, presence: true, length: { maximum: 70 }
  validates :isbn, presence: true, numericality: { only_integer: true }
  validates :genre, presence: true
  validates :rating, presence: true, numericality: { less_than: 5 }
  validates :summary, presence: true, length: { maximum: 2000 }
  validates :condition, presence: true
  validates :description, presence: true, length: { maximum: 800 }
  validates :price, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 99999 } # in EUR
  validates :user, presence: true
end