class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :score
  belongs_to :user
end
