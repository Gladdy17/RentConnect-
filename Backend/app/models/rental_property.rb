class RentalProperty < ApplicationRecord
  belongs_to :user
  has_many_attached :images, dependent: :destroy


    # Geocoder configuration
    geocoded_by :address
    after_validation :geocode, if: :will_save_change_to_address?

  
    # Combine address parts into a single string for geocoding
    def full_address
      [street, city, province, country].compact.join(', ')
    end
  
    # This makes geocoding run only when any address part changes
    def will_save_change_to_full_address?
      will_save_change_to_street? || will_save_change_to_city? ||
      will_save_change_to_province? || will_save_change_to_country?
    end
    def images_urls
      images.map(&:url)
    end
end
