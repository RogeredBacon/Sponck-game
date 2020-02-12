class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games, except: [:created_at, :updated_at]
    end

    def show
        game = Game.find(params[:id])
        render json: game, except: [:created_at, :updated_at]
    end

    def create
        game = Game.create(username: params[:user, :score])
        render json: user, except: [:created_at, :updated_at]
    end
end
