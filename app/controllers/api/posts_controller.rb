class Api::PostsController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    @city = City.find(params[:city_id])
    @user_posts = @user.posts
    @city_posts = @city.posts
    render json: @posts

  end

  # def show
  #   @post = User.find(params[:user_id]).first
  # end
end
