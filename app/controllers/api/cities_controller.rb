class Api::CitiesController < ApplicationController

  def index
    @cities = City.all
    render json: @cities
  end

  def show
    @city = City.find(params[:id])
    render json: @city
    @posts = City.find(params[:id]).posts
  end

  def create
    @city = City.create(city_params)
    render json: @city
  end

  def destroy
    @city = City.find(params[:id]).destroy
    render status: 200
  end

  def update
    @city = City.find(params[:id]).update(city_params)
    render json: @city
  end

  private
  def city_params
    params.require(:city).permit(:name, :city_img)
  end
end

