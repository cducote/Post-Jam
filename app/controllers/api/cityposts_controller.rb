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

  def create
    @city = City.find(params[:city_id])
    @citypost = @city.posts.create!(city_post_params)
    @cityposts = @city.posts
    render json: @cityposts
  end

  def destroy
    
  end

  private

  def city_post_params
    params.require(:newPost).permit(:title, :body, :user_id, :city_id)
  end
end
