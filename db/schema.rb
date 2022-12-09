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

ActiveRecord::Schema.define(version: 2022_10_30_135126) do

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
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "books", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.string "isbn"
    t.string "genre"
    t.decimal "rating"
    t.string "summary"
    t.string "condition"
    t.string "description"
    t.integer "price"
    t.string "image_url"
    t.integer "order_status", default: 0
    t.integer "user_id"
    t.integer "order_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_books_on_order_id"
    t.index ["order_status"], name: "index_books_on_order_status"
    t.index ["user_id"], name: "index_books_on_user_id"
  end

  create_table "books_carts", id: false, force: :cascade do |t|
    t.integer "book_id"
    t.integer "cart_id"
    t.index ["book_id"], name: "index_books_carts_on_book_id"
    t.index ["cart_id"], name: "index_books_carts_on_cart_id"
  end

  create_table "books_checkouts", id: false, force: :cascade do |t|
    t.integer "book_id"
    t.integer "checkout_id"
    t.index ["book_id"], name: "index_books_checkouts_on_book_id"
    t.index ["checkout_id"], name: "index_books_checkouts_on_checkout_id"
  end

  create_table "carts", force: :cascade do |t|
    t.integer "session_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["session_id"], name: "index_carts_on_session_id"
  end

  create_table "checkouts", force: :cascade do |t|
    t.decimal "amount", precision: 10, scale: 2
    t.string "currency"
    t.string "checkout_session_id"
    t.datetime "expires_at"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_checkouts_on_user_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "token"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "books", "orders"
  add_foreign_key "books", "users"
  add_foreign_key "carts", "sessions"
  add_foreign_key "checkouts", "users"
  add_foreign_key "orders", "users"
  add_foreign_key "sessions", "users"
end
