class Charge < ApplicationRecord
    belongs_to :order

    validates :order, presence: true
    validates :currency, presence: true
    validates :amount, presence: true
    validates :checkout_session_id, presence: true
end
