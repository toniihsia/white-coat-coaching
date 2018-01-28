class Api::ResidenciesController < ApplicationController
  def create
    @residency = Residency.new(residency_params)
    if @residency.save
      render :show
    else
      render :show, status: 422
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
      render :show
    else
      render :show, status: 422
    end
  end

  private
  def residency_params
    params.require(:residency).permit(:discipline, :name, :description, :address,
      :latitude, :longitude, :state, :website_url, :num_residents, :num_rotating_students,
      :merger_status, :application_instructions, :comlex_requirement, :usmle_requirement,
      :rotation_required, :interview_date, :interview_count, :program_director,
      :coordinator_name, :coordinator_email, :coordinator_number, :med_student_coordinator_name,
      :med_student_coordinator_number, :med_student_coordinator_email)
  end
end
