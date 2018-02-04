class Api::SignupEmailsController < ApplicationController

  def create
    @signup_email = SignupEmail.new(signup_email_params)
    if @signup_email.save
      head :ok
    else
      render json: @signup_email.errors.full_messages, status: 422
    end
  end

  private
  def signup_email_params
    params.require(:signup_email).permit(:email)
  end
end
