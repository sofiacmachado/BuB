class Order < ApplicationRecord
  belongs_to :user
  has_many :books
  has_many :charges

  validates :user, presence: true

  def paid
    charges.pluck(:complete).include?(true)
  end
end
