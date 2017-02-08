class Api::ResidenciesController < ApplicationController
  def create
    debugger
    params.residency.each |residency| do
    residency = Residency.new(residency_params)
    if residency.save
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

  def show
    @residency = Residency.find_by_id(params[:id])

    if @residency.nil?
      render json: @user.errors.full_messages
    else
      render "api/residencies/show"
    end
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
    params.require(:residency).permit(:name, :street, :city, :state, :zip_code, :website_url, :description, :latitude, :longitude, :coordinator_name, :coordinator_email, :coordinator_number, :med_student_coordinator_name, :med_student_coordinator_number, :med_student_coordinator_email, :PD, :num_students, :max_students, :crowded_period,
    :schedule_restrictions, :booking_date, :booking_medium, :curriculum, :merger_status, :image_url, :positions_ranked, :comlex_cutoff, :interview_date, :interview_selection, :num_interviewed, :week_cycle, :residents)
  end
end
