class AddAvailabilityToRentalProperties < ActiveRecord::Migration[7.1]
  def change
    add_column :rental_properties, :availability, :boolean
  end
end
