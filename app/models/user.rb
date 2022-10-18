class User < ApplicationRecord
    has_many :sessions
    has_many :properties

  end