# config/initializers/websocket_inventory_client.rb

Rails.application.config.after_initialize do
    Thread.new do
      WebsocketInventoryClient.run
    end
  end
  