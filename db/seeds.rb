# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

User.delete_all

Game.delete_all

u1 = User.create(username: Faker::Name.unique.first_name)
u2 = User.create(username: Faker::Name.unique.first_name)
u3 = User.create(username: Faker::Name.unique.first_name)
u4 = User.create(username: Faker::Name.unique.first_name)

g1 = Game.create(user: u1, score: rand(0..200))
g2 = Game.create(user: u2, score: rand(0..300))
g3 = Game.create(user: u3, score: rand(0..400))
g4 = Game.create(user: u4, score: rand(0..100))
g5 = Game.create(user: u1, score: rand(0..500))
g6 = Game.create(user: u2, score: rand(0..1000))

6.times { Game.create(user: User.find(rand(1..4)), score: rand(0..500)) }
