class Api::ResidenciesController < ApplicationController
  before_filter :require_admin, except: [:show, :index]

  def create
    residencies_hash = params[:residency].map{|k,v| v}.as_json
    residencies_hash.each{|r| r["rotation_required"] = r["rotation_required"].include?("y") if r["rotation_required"].present? }
    @residencies = residencies_hash.map{|r| Residency.new(r)}

    discipline = @residencies.first.discipline
    if @residencies.all?{|r| r.valid? && r.discipline == discipline}
      ActiveRecord::Base.transaction do
        @residencies = Residency.create(residencies_hash)
        Residency.where(discipline: discipline).where.not(id: @residencies).destroy_all
      end
      render :index
    else
      @residencies[0..-2].select{|r| r.errors.present?}.each{|r| @residencies.last.errors.add(r.name, ": #{r.errors.full_messages}")}
      render :index, status: 422
    end
  end

  def destroy_multiple
    @residencies = Residency.where.not(id: params[:ids])
    Residency.where(id: params[:ids]).destroy_all
    render :index
  end

  def destroy
    @residency = Residency.find_by_id(params[:id])
    @residency.delete
    @residencies = Residency.all
    render :index
  end

  def index
    discipline = params[:discipline] || "orthopedic"
    @residencies = Residency.where(discipline: discipline).order(:name)
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
    params.require(:residency).permit(:discipline, :name, :description, :street,
      :latitude, :longitude, :state, :website_url, :num_residents, :num_rotating_students,
      :merger_status, :application_instructions, :comlex_requirement, :usmle_requirement,
      :rotation_required, :interview_date, :interview_count, :program_director,
      :coordinator_name, :coordinator_email, :coordinator_number, :med_student_coordinator_name,
      :med_student_coordinator_number, :med_student_coordinator_email, :city, :zip_code)
  end

  def require_admin
    render json: {error: "Not admin"}, status: 403 if !current_user.try(:admin)
  end
end
