class Api::ErrorsController < ApplicationController
  def create
    Error.create(error_params)
    head :ok
  end

  private

  def error_params
    params.require(:error).permit(:message, :url, :error)
  end
end
