# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161214212011) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "debts", force: :cascade do |t|
    t.decimal "debt_amount", precision: 8, scale: 2, null: false
    t.integer "borrower_id",                         null: false
    t.integer "expense_id",                          null: false
  end

  create_table "expenses", force: :cascade do |t|
    t.decimal  "expense_amount", precision: 8, scale: 2, null: false
    t.string   "title",                                  null: false
    t.integer  "paid_by_id",                             null: false
    t.datetime "expense_date"
  end

  create_table "relationships", force: :cascade do |t|
    t.integer "a_user_id", null: false
    t.integer "b_user_id", null: false
    t.index ["a_user_id", "b_user_id"], name: "index_relationships_on_a_user_id_and_b_user_id", unique: true, using: :btree
  end

  create_table "settlements", force: :cascade do |t|
    t.decimal "settled_amount", precision: 8, scale: 2, null: false
    t.integer "from_id",                                null: false
    t.integer "to_id",                                  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username",        null: false
    t.string "email",           null: false
    t.string "password_digest", null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

  add_foreign_key "debts", "expenses"
  add_foreign_key "debts", "users", column: "borrower_id"
  add_foreign_key "expenses", "users", column: "paid_by_id"
  add_foreign_key "relationships", "users", column: "a_user_id"
  add_foreign_key "relationships", "users", column: "b_user_id"
  add_foreign_key "settlements", "users", column: "from_id"
  add_foreign_key "settlements", "users", column: "to_id"
end
