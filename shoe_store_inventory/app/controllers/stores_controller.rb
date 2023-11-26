# app/controllers/stores_controller.rb
class StoresController < ApplicationController
  before_action :set_store, only: [:show, :update, :destroy]

  # GET /stores
  def index
    @stores = Store.all.includes(:shoe_models)
    render json: @stores, include: :shoe_models
  end

  # GET /stores/:id
  def show
    render json: @store, include: :shoe_models
  end

  # POST /stores
  def create
    @store = Store.new(store_params)
    if @store.save
      render json: @store, status: :created, include: :shoe_models
    else
      render json: @store.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stores/:id
  def update
    if @store.update(store_params)
      render json: @store, include: :shoe_models
    else
      render json: @store.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stores/:id
  def destroy
    @store.destroy
  end

  private

  def set_store
    @store = Store.find(params[:id])
  end

  def store_params
    params.require(:store).permit(:name)
  end
end