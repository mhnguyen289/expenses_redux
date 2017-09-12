require 'rails_helper'

RSpec.describe Item, type: :model do
  
  describe 'validations' do

    it 'requires a title, inventory count, price and a category' do
      item = Item.new

      expect(item.valid?).to eq([
        "Category must exist",
        "Title can't be blank",
        "inventory can't be blank",
        "Price can't be blank"
      ])
  end
  
  describe 'relationships' do

    it 'belongs to a category'

    it 'has many line items'

    it 'has many order items'

  end
end
