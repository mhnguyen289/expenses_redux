require 'rails_helper'

RSpec.describe User, type: :model do

  describe 'validations' do

    it 'requires a email and password when created'

    it 'requires that an email is unique'
    
  end

  describe 'relationships' do

    it 'has one cart'

    it 'has many orders'

  end
end
