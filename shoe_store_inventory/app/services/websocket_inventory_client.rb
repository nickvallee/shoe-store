require 'faye/websocket'
require 'eventmachine'
require 'json'

class WebsocketInventoryClient
  def self.run
    EM.run {
      ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

      ws.on :open do |event|

      end

      ws.on :message do |event|
        data = JSON.parse(event.data)
      

        store = Store.find_or_create_by(name: data['store'])
      
        shoe_model = store.shoe_models.find_or_create_by(name: data['model'])
      
        shoe_model.update(inventory: data['inventory'])
      end
      

      ws.on :close do |event|
        EM.stop
      end
    }
  end
end
