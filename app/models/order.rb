class Order < ApplicationRecord
  belongs_to :user
  has_many :books

  validates :user, presence: true
end
