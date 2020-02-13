class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games, include: [:user], except: [:created_at, :updated_at]
    end

    def show
        game = Game.find(params[:id])
        # user = User.select { |user| user.id = params[:user_id]}
        render json: game, include: [:user], except: [:created_at, :updated_at]
    end

    def create
        game = Game.create(username: params[:user, :score])
        render json: game, except: [:created_at, :updated_at]
    end
end
