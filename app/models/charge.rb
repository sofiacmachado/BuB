class Charge < ApplicationRecord
    belongs_to :user
    belongs_to :order

    validates :user, presence: true
    validates :order, presence: true
    validates :checkout_session_id, presence: true
    validates :currency, presence: true
    validates :amount, presence: true
end