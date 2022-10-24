class Order < ApplicationRecord
    belongs_to :user
    has_many :books

    validates :user, presence: true
    validates :currency, presence: true
    validates :amount, presence: true
end
