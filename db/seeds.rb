puts "usage: [$rails db:purge db:migrate db:seed]"

puts "demo user"
demo_user_one = User.create!(username: "DemoUserOne", password: "DemoUser1Here")
demo_user_two = User.create!(username: "DemoUserTwo", password: "DemoUser2Here")
demo_user_three = User.create!(username: "DemoUserThree", password: "DemoUser3Here")
