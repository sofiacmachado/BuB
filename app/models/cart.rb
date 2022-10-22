class Cart < ApplicationRecord
  belongs_to :session
  has_many :books

  validates :session, presence: true
  #validates :books, presence: true
  end