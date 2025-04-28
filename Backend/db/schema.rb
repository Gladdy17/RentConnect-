# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_04_26_214058) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "feedbacks", force: :cascade do |t|
    t.text "message"
    t.bigint "author_id", null: false
    t.bigint "recipient_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "rating"
    t.index ["author_id"], name: "index_feedbacks_on_author_id"
    t.index ["recipient_id"], name: "index_feedbacks_on_recipient_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "image_url"
    t.bigint "rental_property_id"
    t.bigint "rental_application_id"
    t.integer "uploaded_by_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rental_application_id"], name: "index_images_on_rental_application_id"
    t.index ["rental_property_id"], name: "index_images_on_rental_property_id"
  end

  create_table "rental_applications", force: :cascade do |t|
    t.string "status"
    t.bigint "user_id", null: false
    t.bigint "rental_property_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.integer "age"
    t.string "current_address"
    t.string "province"
    t.string "city"
    t.string "country"
    t.string "employment_status"
    t.string "employer_name"
    t.integer "years_working_at_employer"
    t.string "payment_type"
    t.integer "property_id"
    t.string "phone_number"
    t.string "email"
    t.integer "income"
    t.text "references"
    t.string "employer"
    t.integer "monthly_income"
    t.index ["rental_property_id"], name: "index_rental_applications_on_rental_property_id"
    t.index ["user_id"], name: "index_rental_applications_on_user_id"
  end

  create_table "rental_properties", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "address"
    t.integer "sq_feet"
    t.integer "bedrooms"
    t.integer "bathrooms"
    t.string "property_types"
    t.decimal "fees"
    t.boolean "utilities_included"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "latitude"
    t.float "longitude"
    t.index ["user_id"], name: "index_rental_properties_on_user_id"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.string "plan"
    t.boolean "active"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.integer "role", default: 0, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "feedbacks", "users", column: "author_id"
  add_foreign_key "feedbacks", "users", column: "recipient_id"
  add_foreign_key "images", "rental_applications"
  add_foreign_key "images", "rental_properties"
  add_foreign_key "images", "users", column: "uploaded_by_id"
  add_foreign_key "rental_applications", "rental_properties"
  add_foreign_key "rental_applications", "users"
  add_foreign_key "rental_properties", "users"
  add_foreign_key "subscriptions", "users"
end
