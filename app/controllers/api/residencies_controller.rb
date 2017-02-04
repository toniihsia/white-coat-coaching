class Api::ResidenciesController < ApplicationController
  def create
    @residency = Residency.new(residency_params)
    if @residency.save
      @residencies = Residency.all
      render :index
    else
      render json: @residency.errors.full_messages, status: 422
    end
  end

  def destroy
    @residency = Residency.find_by_id(params[:id])
    @residency.delete
    @residencies = Residency.all
    render :index
  end

  def index
    @residencies = Residency.all
  end

  def update
    @residency = Residency.find_by_id(params[:id])
    if @residency.update(residency_params)
      @residencies = Residency.all
      render :index
    else
      render json: @residency.errors.full_messages, status: 422
    end
  end

  private
  def residency_params
    params.require(:residency).permit(:name, :street, :city, :state, :website_url, :description, :coordinator, :med_student_coordinator, :PD, :num_students, :max_students, :crowded_period_start, :crowded_period_end, :schedule_restrictions, :booking_date, :booking_medium, :curriculum, :merger_status)
  end
end
