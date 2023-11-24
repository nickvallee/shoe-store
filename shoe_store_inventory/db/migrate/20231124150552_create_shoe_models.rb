class CreateShoeModels < ActiveRecord::Migration[7.1]
  def change
    create_table :shoe_models do |t|
      t.string :name
      t.references :store, null: false, foreign_key: true
      t.integer :inventory

      t.timestamps
    end
  end
end
