class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # before_action :authenticate_token

  def authenticate_token
    render json: {error: "unauthorized"}, status: 401  unless !!current_user
  end

  def current_user
    if auth_request_header_present?
      begin
        decoded = Token.decode(token)
        user = User.find_by_id(decoded["user"])
        if user
          current_user ||= user
        end
      rescue
        puts "Cannot decode or find user"
      end
    else
      puts "Missing request header."
    end
  end

  private

  def auth_request_header_present?
    !!request.env.fetch("HTTP_AUTHORIZATION", "").scan(/Bearer/).flatten.first
  end

  def token
    request.env["HTTP_AUTHORIZATION"].scan(/Bearer (.*)$/).flatten.last
  end
end
