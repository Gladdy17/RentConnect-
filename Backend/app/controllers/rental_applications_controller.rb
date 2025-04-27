class RentalApplicationsController < ApplicationController
  before_action :set_rental_application, only: [:show, :update, :destroy]

  # GET /rental_applications
  def index
    if params[:user_id]
      @rental_applications = RentalApplication.includes(:rental_property).where(user_id: params[:user_id]).order(created_at: :desc)
    else
      @rental_applications = RentalApplication.all
    end
  
    render json: @rental_applications.map { |app|
      app.as_json.merge(
        documents: app.documents.map { |doc| url_for(doc) },
        rental_property: {
          title: app.rental_property&.title
        }
      )
    }, status: :ok
  end

  # GET /rental_applications/:id
  def show
    render json: @rental_application.as_json.merge(
      documents: @rental_application.documents.map { |doc| url_for(doc) }
    ), status: :ok
  end

  # POST /rental_applications
  def create
    @rental_application = RentalApplication.new(rental_application_params)

    if @rental_application.save
      attach_documents
      render json: {
        message: "Rental application created successfully",
        rental_application: @rental_application.as_json.merge(
          documents: @rental_application.documents.map { |doc| url_for(doc) }
        )
      }, status: :created
    else
      render json: { errors: @rental_application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /rental_applications/:id
  def update
    if @rental_application.update(rental_application_params)
      attach_documents
      render json: {
        message: "Rental application updated successfully",
        rental_application: @rental_application.as_json.merge(
          documents: @rental_application.documents.map { |doc| url_for(doc) }
        )
      }, status: :ok
    else
      render json: { errors: @rental_application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /rental_applications/:id
  def destroy
    @rental_application.destroy
    head :no_content
  end

  private

  def set_rental_application
    @rental_application = RentalApplication.find(params[:id])
  end

  def rental_application_params
    params.require(:rental_application).permit(
      :first_name,
      :last_name,
      :age,
      :current_address,
      :province,
      :city,
      :country,
      :employment_status,
      :employer_name,
      :years_working_at_employer,
      :payment_type,
      :user_id,
      :rental_property_id,
      documents: []
    )
  end

  def attach_documents
    return unless params[:documents].present?

    params[:documents].each do |doc|
      @rental_application.documents.attach(doc)
    end
  end
end