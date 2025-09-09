# Railway deployment configuration
Rails.application.configure do
  # Set default eager_load if not already set by environment
  if config.eager_load.nil?
    config.eager_load = Rails.env.production?
  end
  
  # Set secret_key_base from environment variable for Railway
  if ENV['SECRET_KEY_BASE'].present?
    config.secret_key_base = ENV['SECRET_KEY_BASE']
  elsif Rails.env.production? && config.secret_key_base.blank?
    # Generate a secret key for production if not set
    # In production, you should set SECRET_KEY_BASE environment variable
    require 'securerandom'
    config.secret_key_base = SecureRandom.hex(64)
  end
end
