class Post < ApplicationRecord
  attr_reader :user_info
  validates :title, length: { maximum: 200, too_long:"Max chars 200"}, presence: true
  validates :body, presence: true

  belongs_to :user, optional: true
  belongs_to :city
  has_many :comments

  def set_user_info user
    @user_info = user
  end
end
