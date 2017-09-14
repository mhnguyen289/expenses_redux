require 'rails_helper'

RSpec.describe Cart, type: :model do
  
  describe 'validations' do 

    it 'requires a user upon creation' do 
      cart = build(:cart, user: nil)

      expect(cart.valid?).to eq(false)
      expect(cart.errors.full_messages).to eq(["User must exist"])
    end
  end 

  describe 'relationships' do 

    it 'has many line items that are destroyed upon deletion of cart' do 
      cart = create(:cart)
      item = create(:item)
      line_item = cart.line_items.create(quantity: 1, item: item)

      expect(cart.line_items.first.id).not_to eq(nil)

      cart.destroy
      line_item = LineItem.find_by(id: line_item.id)
      
      expect(line_item).to eq(nil)
    end

    it 'has many items through line items' do 
      cart = create(:cart)
      item = create(:item)
      line_item = cart.line_items.create(quantity: 1, item: item)

      expect(cart.items.count).to eq(1)
    end

    it 'belongs to a user' do 
      cart = create(:cart)
      
      expect(cart.user.email).to eq("minh.nguyen@shipt.com")
    end
  end
  end