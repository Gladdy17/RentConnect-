# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
Feedback.destroy_all
RentalApplication.destroy_all
RentalProperty.destroy_all
User.destroy_all

# Create sample users
admin_user = User.create!(
  email: "admin@example.com",
  password: "password123",
  first_name: "Admin",
  last_name: "User",
  role: 1 # Assuming role 1 is admin
)

jane_user = User.create!(
  email: "jane.doe@example.com",
  password: "securepass",
  first_name: "Jane",
  last_name: "Doe"
)

john_user = User.create!(
  email: "john.smith@example.com",
  password: "anotherpass",
  first_name: "John",
  last_name: "Smith"
)

# Create sample rental properties
RentalProperty.create!(
  title: "Cozy Apartment in Downtown",
  description: "A beautiful and cozy apartment located in the heart of downtown.",
  address: "123 Main Street, New York, NY 10001",
  sq_feet: 850,
  bedrooms: 2,
  bathrooms: 1,
  property_types: "Apartment",
  fees: 1200.00,
  utilities_included: true,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Spacious Family Home",
  description: "A spacious home perfect for families, with a large backyard.",
  address: "456 Elm Street, Los Angeles, CA 90001",
  sq_feet: 2000,
  bedrooms: 4,
  bathrooms: 3,
  property_types: "House",
  fees: 2500.00,
  utilities_included: false,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Modern Studio Apartment",
  description: "A modern studio apartment with all the amenities you need.",
  address: "789 Oak Avenue, Chicago, IL 60601",
  sq_feet: 500,
  bedrooms: 1,
  bathrooms: 1,
  property_types: "Studio",
  fees: 900.00,
  utilities_included: true,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Luxury Condo with Ocean View",
  description: "A luxurious condo with breathtaking ocean views.",
  address: "101 Ocean Drive, Miami, FL 33139",
  sq_feet: 1500,
  bedrooms: 3,
  bathrooms: 2,
  property_types: "Condo",
  fees: 3500.00,
  utilities_included: true,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Rustic Cabin in the Woods",
  description: "A peaceful cabin surrounded by nature.",
  address: "789 Pine Lane, Asheville, NC 28801",
  sq_feet: 1200,
  bedrooms: 2,
  bathrooms: 2,
  property_types: "Cabin",
  fees: 1800.00,
  utilities_included: false,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Urban Loft in the City",
  description: "A stylish loft in the heart of the city.",
  address: "321 Market Street, San Francisco, CA 94103",
  sq_feet: 1000,
  bedrooms: 1,
  bathrooms: 1,
  property_types: "Loft",
  fees: 2800.00,
  utilities_included: true,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Suburban Townhouse",
  description: "A cozy townhouse in a quiet suburban neighborhood.",
  address: "654 Maple Avenue, Austin, TX 78701",
  sq_feet: 1400,
  bedrooms: 3,
  bathrooms: 2,
  property_types: "Townhouse",
  fees: 2200.00,
  utilities_included: false,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Penthouse Suite",
  description: "A luxurious penthouse suite with panoramic city views.",
  address: "987 Skyline Blvd, Seattle, WA 98101",
  sq_feet: 2000,
  bedrooms: 4,
  bathrooms: 3,
  property_types: "Penthouse",
  fees: 5000.00,
  utilities_included: true,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Charming Cottage",
  description: "A charming cottage with a beautiful garden.",
  address: "222 Rosewood Lane, Portland, OR 97201",
  sq_feet: 1100,
  bedrooms: 2,
  bathrooms: 1,
  property_types: "Cottage",
  fees: 1500.00,
  utilities_included: false,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Modern Duplex",
  description: "A modern duplex with spacious living areas.",
  address: "333 Cedar Street, Denver, CO 80201",
  sq_feet: 1600,
  bedrooms: 3,
  bathrooms: 2,
  property_types: "Duplex",
  fees: 2400.00,
  utilities_included: true,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Historic Brownstone",
  description: "A historic brownstone with classic architecture.",
  address: "444 Beacon Street, Boston, MA 02108",
  sq_feet: 1800,
  bedrooms: 3,
  bathrooms: 2,
  property_types: "Brownstone",
  fees: 3200.00,
  utilities_included: false,
  user_id: admin_user.id
)

RentalProperty.create!(
  title: "Cozy Basement Apartment",
  description: "A cozy basement apartment with modern amenities.",
  address: "555 Elmwood Drive, Philadelphia, PA 19103",
  sq_feet: 700,
  bedrooms: 1,
  bathrooms: 1,
  property_types: "Apartment",
  fees: 800.00,
  utilities_included: true,
  user_id: admin_user.id
)

# Create sample feedbacks
Feedback.create!([
  {
    message: "Great communication and timely responses!",
    rating: 4,
    author_id: admin_user.id,
    recipient_id: jane_user.id
  },
  {
    message: "Very respectful and clean tenant.",
    rating: 5,
    author_id: jane_user.id,
    recipient_id: admin_user.id
  },
  {
    message: "Had some delays in payment but communicated well.",
    rating: 3,
    author_id: john_user.id,
    recipient_id: admin_user.id
  },
  {
    message: "Smooth renting experience, highly recommended.",
    rating: 4,
    author_id: admin_user.id,
    recipient_id: john_user.id
  }
])


# Create a Demo Tenant for testing purposes
demo_user = User.find_or_initialize_by(email: "demo@example.com")
demo_user.update!(
  password: "password",
  first_name: "Demo",
  last_name: "User",
  role: "tenant"
)
puts "✅ Demo tenant user created or updated: #{demo_user.email}"