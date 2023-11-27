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
      inventory: incremented_inventory
    })
  end

  def unsubscribed

  end
end
