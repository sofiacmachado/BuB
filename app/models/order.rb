class Order < ApplicationRecord
    belongs_to :user
    belongs_to :book
    belongs_to :order_status
    has_one :charge

    validates :user, presence: true
    validates :book, presence: true
    validates :order_status, presence: true
end
