class Checkout < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :books

  validates :user, presence: true
  validates :currency, presence: true
  validates :amount, presence: true
  validates :checkout_session_id, presence: true
  validates :expires_at, presence: true

  def has_expired
    self.expires_at <= DateTime.current
  end
end
