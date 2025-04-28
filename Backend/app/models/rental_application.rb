class RentalApplication < ApplicationRecord
  belongs_to :user
  belongs_to :rental_property
  has_many :images, dependent: :destroy
  has_many_attached :documents

  before_create :set_default_status

  private

  def set_default_status
    self.status ||= "Pending"
  end
end
