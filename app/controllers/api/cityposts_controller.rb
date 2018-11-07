class Api::CitypostsController < ApplicationController
  
  def index
    @city = City.find(params[:city_id])
    @city_posts = City.find(params[:city_id]).posts
    render json: @city_posts
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

end
