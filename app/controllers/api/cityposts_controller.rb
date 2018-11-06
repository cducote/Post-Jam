class Api::CitypostsController < ApplicationController
  
  def index
    @city = City.find(params[:city_id])
    @city_posts = City.find(params[:city_id]).posts
    render json: @city_posts
  end

  def show
    @post = Post.find(params[:id])
    @post_comments = Post.find(params[:id]).comments
    render json: @post_comments
  end

  private

  def comments_with_user_names(post_id)
    Comment.where(post_id: post_id).as_json.map do |comment|
      user = User.find_by_id(comment['user_id'])
      comment.merge('user_name' => user['name'])
    end
  end

  def comment_params
    params.require(:comment).permit(:body, :user_id, :post_id)
  end

end
