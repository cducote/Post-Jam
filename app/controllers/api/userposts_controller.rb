class Api::UserpostsController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    @user_posts = User.find(params[:user_id]).posts
    render json: @user_posts
  end
end
