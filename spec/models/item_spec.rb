require 'rails_helper'

RSpec.describe Item, type: :model do
  
  describe 'validations' do

    it 'requires a title, inventory count, price and a category'
  end
  
  describe 'relationships' do

    it 'belongs to a category'

    it 'has many line items'

    it 'has many order items'
    
  end
end
