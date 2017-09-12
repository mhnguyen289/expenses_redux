
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

 
end