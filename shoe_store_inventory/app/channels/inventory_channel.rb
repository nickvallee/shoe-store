class InventoryChannel < ApplicationCable::Channel
  def subscribed
    stream_from "inventory_updates"
  end

  def add_inventory(data)
    puts "ADD INVENTORY"
    puts data
    store = Store.find_or_create_by(name: data["store"])
    shoe_model = store.shoe_models.find_or_create_by(name: data["model"])

    shoe_model.inventory += 1
    shoe_model.save 
    incremented_inventory = shoe_model.inventory


    puts "before broad cast!!"


    ActionCable.server.broadcast('inventory_updates', {
      store: store.name,
      model: shoe_model.name,
      inventory: incremented_inventory,
      broadcastMessage: "stock increase for #{shoe_model.name} in #{store.name}"
    })
  end

  def decrease_inventory(data)
    store = Store.find_or_create_by(name: data["store"])
    shoe_model = store.shoe_models.find_or_create_by(name: data["model"])

    shoe_model.inventory -= 1 if shoe_model.inventory > 0
    decremented_inventory = shoe_model.inventory

    broadcast_message = if decremented_inventory < 5
      "stock decrease for #{shoe_model.name} in #{store.name}: LOW STOCK"
    else
      "stock decrease for #{shoe_model.name} in #{store.name}"
    end

    ActionCable.server.broadcast('inventory_updates', {
      store: store.name,
      model: shoe_model.name,
      inventory: decremented_inventory,
      broadcastMessage: broadcast_message
    })
  end

  def unsubscribed

  end
end