require 'rails_helper'

RSpec.describe Category, type: :model do
  
  describe 'validations' do

    it 'requires a title' do 
      category = build(:category, title: nil)

      expect(category.valid?).to eq(false)
      expect(category.errors.full_messages).to eq([
        "Title can't be blank"
      ])
    end
  end

  describe 'relationships' do 

    it 'has many items' do 
      category = create(:category)
      category.items.create(
        title: "Legendary Link Hoodie", 
        inventory: 1, 
        price: "54.99"
      )

      expect(category.items.count).to eq(1)
    end
  end
end