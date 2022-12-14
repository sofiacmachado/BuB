class Session < ApplicationRecord
  belongs_to :user
  has_one :cart, dependent: :destroy

  validates :user, presence: true

  before_validation :generate_session_token

  private

  def generate_session_token
    self.token = SecureRandom.urlsafe_base64
  end
end
