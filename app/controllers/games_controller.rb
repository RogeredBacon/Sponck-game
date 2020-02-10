class GamesController < ApplicationController
    def index
        games = Game.all
        render json: GameSerializer.new(games)
    end
end
