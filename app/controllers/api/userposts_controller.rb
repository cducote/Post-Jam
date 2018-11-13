class Api::UserpostsController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    query = "SELECT * FROM posts JOIN users ON posts.id=users.id WHERE posts.user_id=#{params[:user_id]};"
    @posts = ActiveRecord::Base.connection.execute(query)
    render json: @posts
  end
end
