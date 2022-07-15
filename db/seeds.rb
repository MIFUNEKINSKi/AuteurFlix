# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Profile.destroy_all

User.create(id: 1, email: 'demo@user.com', password: 'password')
User.create(id: 2, email: 'hamlet@appacademy.com', password: 'dummy')
User.create(id: 3, email: 'dan@gmail.com', password: 'password')
User.create(id: 4, email: 'john@gmail.com', password: 'password')

Profile.create(user_id: 3, name: 'tante elle')
Profile.create(user_id: 3, name: 'pram')
Profile.create(user_id: 3, name: 'living room')


