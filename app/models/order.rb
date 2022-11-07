class Order < ApplicationRecord
  belongs_to :user
  has_many :book_orders
  has_many :books, through: :book_orders
  has_many :charges

  validates :user, presence: true

  def paid
    charges.pluck(:complete).include?(true)
  end
end
