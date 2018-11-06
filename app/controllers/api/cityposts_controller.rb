class Api::CitypostsController < ApplicationController
  
  def index
    @city = City.find(params[:city_id])
    @city_posts = City.find(params[:city_id]).posts
    render json: @city_posts
  end
end
