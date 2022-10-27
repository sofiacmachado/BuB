class Order < ApplicationRecord
    belongs_to :user
    has_many :books
    has_many :charges

    validates :user, presence: true

    def paid
        self.charges.pluck(:complete).include?(true)
    end

end
