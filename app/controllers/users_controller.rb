class UsersController < ApplicationController
    def show
        user = User.find(params[:id])
        render json: user, only: [:id, :username]
    end

    def index
        users = User.all
        render json: users, only: [:id, :username]
    end

    def create
        user = User.create(username: params[:username])
        render json: user, only: [:id, :username]
    end



    # private

    # def user_params
    #     require(params).permit(:username, :id)
    # end
end
