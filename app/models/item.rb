class Item < ApplicationRecord
  belongs_to :category

  validates :title, :inventory, :price, presence :true
end
