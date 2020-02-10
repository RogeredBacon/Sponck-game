class User < ApplicationRecord
    has_secure_password
    has_many :games
    validates :username, uniqueness: true
    validates :username, :password, presence: true
    validates :password, length: { in: 5..10 }, format: { with: /[a-zA-Z0-9]/, message: "Please only include numbers and letters in your password"}
    # validate :validate_password

    # def validate_password
    #     errors.add(:password, :invalid_characters, not_allowed: "<%!@#%*()_-+=")
    # end

    
end
