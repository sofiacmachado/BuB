class Order < ApplicationRecord
    belongs_to :user
    belongs_to :book
    has_one :charge

    enum status: {
      unpaid: 0,
      shipping: 1,
      shipped: 2,
      received: 3,
      cancelled: 4,
      returned: 5,
    }, _prefix: true

    validates :user, presence: true
    validates :book, presence: true
    validates :order_status, presence: true
end
