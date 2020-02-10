class GamesController < ApplicationController
    def index
        games = Game.all
        options = {
            include: [:uers]
        }
        render json: GameSerializer.new(games, users)
    end
end
