class Book < ApplicationRecord
  belongs_to :user
  belongs_to :order, optional: true
  has_and_belongs_to_many :checkouts
  has_one_attached :image

  enum order_status: {
    Ordered: 0,
    Shipping: 1,
    Received: 2
  }, _prefix: true

  validates :title, presence: true, length: { maximum: 70 }
  validates :author, presence: true, length: { maximum: 70 }
  validates :genre, presence: true
  validates :rating, presence: true, numericality: { less_than: 6 }
  validates :summary, presence: true, length: { maximum: 2000 }
  validates :condition, presence: true
  validates :description, presence: true, length: { maximum: 800 }
  validates :price, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 99_999 } # in EUR
  validates :user, presence: true
end
