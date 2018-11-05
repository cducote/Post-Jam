class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :pic
      t.integer :age
      t.string :location
      t.string :main_instrument
      t.string :skills
      t.string :gear
      t.string :influences
      t.text :bio

      t.timestamps
    end
  end
end
