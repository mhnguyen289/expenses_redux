class User < ApplicationRecord
  has_many :relationships
  has_many :settlements
  has_many :expenses
  has_many :debts

  validates :username, presence: true, length: { minimum: 6 }, uniqueness: true
  validates :email,    presence: true, length: { minimum: 6 }, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
  validates :password_digest, presence: true

  attr_reader :password

  def as_json(option={})
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.authenticate_credentials(username, password)
    user = User.find_by(username: username)
    if user && user.valid_password?(password)
      user
    else
      nil
    end
  end
end
