class SessionsController < ApplicationController
  def login
  end

  def authenticate
    user = User.find_by(name: params[:username])
    if !(user && user.authenticate(params[:password]))
      session[:user_id] = nil
    else
      puts 'you have logged in'
      session[:user_id] = user.id
      render json: user, only: [:id, :username, :games]
    end
  end

  def logout
    session.delete(:user_id)
  end
end
