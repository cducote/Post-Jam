class Api::CommentsController < ApplicationController
  
  def index
    @city = City.find(params[:city_id])
    @post = Post.find(params[:post_id])
    @post_comments = Post.find(params[:post_id]).comments
    render json: @post_comments
  end

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create!(comment_params)
    @comments = @post.comments
    render json: @comments
  end

  private

  def comment_params
    params.require(:newComment).permit(:body, :post_id, :user_id)
  end
end
