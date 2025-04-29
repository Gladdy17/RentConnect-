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
  role: 1
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

# Demo Tenant User
demo_user = User.create!(
  email: "demo@example.com",
  password: "password",
  first_name: "Demo",
  last_name: "User",
  role: 0
)

# Demo Landlord User
landlord_user = User.create!(
  email: "landlord@example.com",
  password: "password",
  first_name: "Landlord",
  last_name: "Example",
  role: 1
)

RentalProperty.create!([
  {
    title: "Cozy Apartment Downtown",
    description: "A beautiful 2 bedroom apartment in the heart of the city.",
    address: "123 Main St, Vancouver, BC",
    sq_feet: 850,
    bedrooms: 2,
    bathrooms: 1,
    property_types: "Apartment",
    fees: 2200,
    utilities_included: true,
    user_id: landlord_user.id,
    latitude: 49.2827,
    longitude: -123.1207
  },
  {
    title: "Modern Condo with Ocean View",
    description: "Luxury condo overlooking the bay, with all amenities included.",
    address: "789 Beach Rd, Halifax, NS",
    sq_feet: 950,
    bedrooms: 2,
    bathrooms: 2,
    property_types: "Condo",
    fees: 3200,
    utilities_included: true,
    user_id: landlord_user.id,
    latitude: 44.6488,
    longitude: -63.5752
  },
  {
    title: "Spacious Family Home",
    description: "Perfect for families, close to parks and schools.",
    address: "456 Oak Avenue, Toronto, ON",
    sq_feet: 2200,
    bedrooms: 4,
    bathrooms: 3,
    property_types: "House",
    fees: 3600,
    utilities_included: false,
    user_id: landlord_user.id,
    latitude: 43.6510,
    longitude: -79.3470
  },
  {
    title: "Bright Loft in Montreal",
    description: "Trendy loft space near downtown core.",
    address: "654 Sainte-Catherine St, Montreal, QC",
    sq_feet: 700,
    bedrooms: 1,
    bathrooms: 1,
    property_types: "Loft",
    fees: 1800,
    utilities_included: true,
    user_id: landlord_user.id,
    latitude: 45.5017,
    longitude: -73.5673
  },
  {
    title: "Suburban Bungalow",
    description: "Quiet neighborhood, large backyard.",
    address: "987 Maple Dr, Calgary, AB",
    sq_feet: 1600,
    bedrooms: 3,
    bathrooms: 2,
    property_types: "House",
    fees: 2800,
    utilities_included: false,
    user_id: landlord_user.id,
    latitude: 51.0447,
    longitude: -114.0719
  },
  {
    title: "Luxury Penthouse",
    description: "Top-floor penthouse suite with private rooftop terrace.",
    address: "321 Bay Street, Toronto, ON",
    sq_feet: 2000,
    bedrooms: 3,
    bathrooms: 3,
    property_types: "Penthouse",
    fees: 7500,
    utilities_included: true,
    user_id: landlord_user.id,
    latitude: 43.6487,
    longitude: -79.3854
  },
  {
    title: "Cozy Suburban House",
    description: "Family home with a backyard.",
    address: "200 Maple Ave, Suburbia",
    sq_feet: 1800,
    bedrooms: 3,
    bathrooms: 2,
    property_types: "House",
    fees: 2400,
    utilities_included: false,
    user_id: landlord_user.id,
    latitude: 43.6532,
    longitude: -79.3832  
  },
  {
    title: "Modern Studio Loft",
    description: "Stylish loft close to amenities.",
    address: "300 King St, Uptown",
    sq_feet: 600,
    bedrooms: 1,
    bathrooms: 1,
    property_types: "Studio",
    fees: 1200,
    utilities_included: true,
    user_id: landlord_user.id,
    latitude: 43.7000,
    longitude: -79.4000 
},
])

puts "✅ Sample rental properties created"

# Create rental applications for testing (match your renter form)
RentalApplication.create!(
  first_name: "Alice",
  last_name: "Smith",
  age: 28,
  current_address: "123 Main Street",
  province: "BC",
  city: "Vancouver",
  country: "Canada",
  employment_status: "Employed",
  employer_name: "DevCo Ltd.",
  years_working_at_employer: 2,
  payment_type: "Credit",
  rental_property_id: RentalProperty.find_by(title: "Cozy Apartment Downtown").id,
  user_id: demo_user.id
)

RentalApplication.create!(
  first_name: "Bob",
  last_name: "Johnson",
  age: 35,
  current_address: "456 Elm Street",
  province: "ON",
  city: "Toronto",
  country: "Canada",
  employment_status: "Self-Employed",
  employer_name: "Bob's Plumbing",
  years_working_at_employer: 5,
  payment_type: "Credit",
  rental_property_id: RentalProperty.find_by(title: "Cozy Apartment Downtown").id,
  user_id: demo_user.id
)

puts "✅ Sample rental applications created"

# Sample feedback (optional, can be skipped if focus is only rental)
Feedback.create!([
  {
    message: "Great communication and timely responses!",
    rating: 4,
    author_id: admin_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "Very respectful and clean tenant.",
    rating: 5,
    author_id: jane_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "Had some delays in payment but communicated well.",
    rating: 3,
    author_id: john_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "Smooth renting experience, highly recommended.",
    rating: 4,
    author_id: admin_user.id,
    recipient_id: demo_user.id
  }
])

# Create sample feedbacks
Feedback.create!([
  {
    message: "Great communication and timely responses!",
    rating: 5,
    author_id: jane_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "The property was well-maintained, but there were some delays in communication.",
    rating: 4,
    author_id: jane_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "Had a pleasant experience overall. Would recommend!",
    rating: 5,
    author_id: jane_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "The landlord was helpful, but the property needed some repairs.",
    rating: 3,
    author_id: jane_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "Very professional and easy to work with.",
    rating: 5,
    author_id: jane_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "The property was as described, but there were some minor issues.",
    rating: 4,
    author_id: jane_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "Excellent experience! The landlord went above and beyond.",
    rating: 5,
    author_id: jane_user.id,
    recipient_id: demo_user.id
  },
  {
    message: "The landlord was responsive, but the property could have been cleaner.",
    rating: 3,
    author_id: jane_user.id,
    recipient_id: demo_user.id
  }
])

puts "✅ Feedbacks created"
