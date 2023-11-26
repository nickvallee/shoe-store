class ShoeModelsController < ApplicationController
    before_action :set_store
  
    # GET /stores/:store_id/shoe_models
    def index
      @shoe_models = @store.shoe_models
      render json: @shoe_models
    end
  
    private
  
    def set_store
      @store = Store.find(params[:store_id])
    end
  end
  