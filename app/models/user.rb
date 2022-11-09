class User < ApplicationRecord
  has_many :sessions
  has_many :books
  has_many :orders

  validates :username, presence: true, length: { minimum: 3, maximum: 15 }
  validates :password, presence: true, length: { minimum: 8, maximum: 15 }
  validates :email, presence: true, length: { minimum: 5, maximum: 30 }

  validates_uniqueness_of :username
  validates_uniqueness_of :email

  after_validation :hash_password

  private

  def hash_password
    self.password = BCrypt::Password.create(password)
  end
end
