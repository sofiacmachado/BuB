class Cart < ApplicationRecord
  belongs_to :session
  has_and_belongs_to_many :books

  validates :session, presence: true
  #validates :books, presence: true
  end