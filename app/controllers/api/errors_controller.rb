class Api::ErrorsController < ApplicationController
  def create
    head :ok
  end

  private

  def error_params
    params.require(:error).permit(:message, :url, :error)
  end
end
