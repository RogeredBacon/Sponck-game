class UsersController < ApplicationController
    def show
        user = User.find(params[:id])
        options = {
            include: [:games]
        }
        render json: UsersSerializer.new(user, options)
    end
end
