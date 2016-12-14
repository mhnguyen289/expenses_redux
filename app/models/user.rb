class User < ApplicationRecord
  has_many :products
  has_and_belongs_to_many :topics, join_table: :users_topics

  validates :username, presence: true, length: { minimum: 6 }, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
  validates :password_digest, presence: true

  attr_reader :password

  def as_json(option={})
    #super([methods: ])
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
