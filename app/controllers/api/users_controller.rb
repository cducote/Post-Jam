class Api::UsersController < ApplicationController
  
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
    @posts = User.find(params[:id]).posts
  end

  def create
    @user = User.create(user_params)
    render json: @user
  end

  def destroy
    @user = User.find(params[:id]).destroy
    render status: 200
  end

  def update
    @user = User.find(params[:id]).update(user_params)
    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:name, :pic, :age, :location, :main_instrument, :skills, :gear, :influences, :bio)
  end
end
