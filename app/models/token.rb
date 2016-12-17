require 'jwt'

class Token
  def self.jwt(payload)
    JWT.encode(payload, hmac_secret, 'HS256')
  end

  def self.decode(token)
    JWT.decode(token, hmac_secret, true, { algorithm: 'HS256' }).first
  end

  # todo : add new hmac_secret to production server env variable
  def self.hmac_secret
    "\x8D\x1A\x16\v\xDE0\xE0\t\x92\x99"
    #ENV["hmac_secret"]
  end
end
