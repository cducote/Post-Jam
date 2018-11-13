class Api::CommentsController < ApplicationController
  
  def index
    query = "SELECT * FROM comments JOIN users ON comments.user_id=users.id WHERE comments.post_id=#{params[:post_id]};"
    @comments = ActiveRecord::Base.connection.execute(query)
    render json: @comments
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
