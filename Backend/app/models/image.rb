class Image < ApplicationRecord
  belongs_to :rental_property
  belongs_to :rental_application
  belongs_to :uploaded_by, class_name: 'user', foreign_key: 'uploaded_by_id'
  has_one_attached :file
end
