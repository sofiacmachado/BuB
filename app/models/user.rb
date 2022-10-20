class User < ApplicationRecord
    has_many :sessions
    has_many :books
    has_many :orders

  end