class Api::PostsController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    @posts = @user.posts
    render json: @posts
  end

  # def show
  #   @post = User.find(params[:user_id]).first
  # end
end
