class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :score
  has_many :users
end
