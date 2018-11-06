class Api::CommentsController < ApplicationController
  
  def index
    @post = Post.find(params[:id])
    @post_comments = Post.find(params[:id]).comments
    render json: @post_comments
  end
end
