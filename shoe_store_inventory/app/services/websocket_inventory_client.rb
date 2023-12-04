require 'faye/websocket'
require 'eventmachine'
require 'json'

class WebsocketInventoryClient
  def self.run
    EM.run {
      ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

      ws.on :open do |event|
        puts "WebSocket connection opened"
      end

      ws.on :message do |event|
        puts "Received message: #{event.data}"
        data = JSON.parse(event.data)
        store = Store.find_or_create_by(name: data['store'])
        shoe_model = store.shoe_models.find_or_create_by(name: data['model'])
        shoe_model.update(inventory: data['inventory'])
        
        unless data.key?('broadcastMessage')
          data['broadcastMessage'] = "Inventory update for #{shoe_model.name} in #{store.name}"
        end

        ActionCable.server.broadcast('inventory_updates', data)
      end

      ws.on :close do |event|
        puts "WebSocket connection closed with code #{event.code} and reason #{event.reason}"
        EM.stop
      end
    }
  end
end
