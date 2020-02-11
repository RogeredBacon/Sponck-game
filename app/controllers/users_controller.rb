class UsersController < ApplicationController
    def show
        user = User.find(params[:id])
        render json: user, only: [:id, :username, games: []]
    end


end
