# http://www.thegreatcodeadventure.com/jwt-auth-in-rails-from-scratch/

require 'jwt'

class Token
  def self.jwt(payload)
    JWT.encode(payload, hmac_secret, 'HS256')
  end

  def self.decode(token)
    JWT.decode(token, hmac_secret, true, { algorithm: 'HS256' }).first
  end

  def self.hmac_secret
    ENV["hmac_secret"]
  end
end
