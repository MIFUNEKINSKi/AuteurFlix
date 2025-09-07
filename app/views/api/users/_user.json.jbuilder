json.extract! user, :id, :email
json.profiles do
  user.profiles.each do |profile|
    json.set! profile.id do
      json.extract! profile, :id, :name
    end
  end
end