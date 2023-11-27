class InventoryChannel < ApplicationCable::Channel
  def subscribed
    stream_from "inventory_updates"
  end

  def add_inventory(data)
    store = Store.find(data["storeId"])
    shoe_model = store.shoe_models.find_by(name: data["shoeModelName"])

    shoe_model.inventory += 1
    shoe_model.save 
    incremented_inventory = shoe_model.inventory

    ActionCable.server.broadcast('inventory_updates', {
      storeId: store.id,
      shoeModelName: shoe_model.name,
      inventory: incremented_inventory,
      broadcastMessage: "stock increase for #{shoe_model.name} in #{store.name}"
    })
  end

  def decrease_inventory(data)
    store = Store.find(data["storeId"])
    shoe_model = store.shoe_models.find_by(name: data["shoeModelName"])

    shoe_model.inventory -= 1 if shoe_model.inventory > 0
    shoe_model.save 
    decremented_inventory = shoe_model.inventory

    broadcast_message = if decremented_inventory < 5
      "stock decrease for #{shoe_model.name} in #{store.name}: LOW STOCK"
    else
      "stock decrease for #{shoe_model.name} in #{store.name}"
    end

    ActionCable.server.broadcast('inventory_updates', {
      storeId: store.id,
      shoeModelName: shoe_model.name,
      inventory: decremented_inventory,
      broadcastMessage: broadcast_message
    })
  end

  def unsubscribed

  end
end

