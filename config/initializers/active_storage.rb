# Use proxy URLs by default (streams directly instead of 302 redirect)
Rails.application.config.active_storage.resolve_model_to_route = :rails_storage_proxy
