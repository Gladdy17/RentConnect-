class RentalApplicationsController < ApplicationController
    before_action :set_rental_application, only: [:show, :update, :destroy]

    # GET rental_applications
    def index

      @rental_applications = RentalApplication.all
  
      render json: @rental_applications.map { |app|
        app.as_json.merge(
          documents: app.documents.map { |doc| url_for(doc) }
        )
      }, status: :ok
    end
  
    # GET rental_applications/:id
    def show
      render json: @rental_application.as_json.merge(
        documents: @rental_application.documents.map { |doc| url_for(doc) }
      ), status: :ok
    end
  
    # POST rental_applications
    def create
      user_id = rental_application_params[:user_id]
    
      # Prevent more than 3 applications
      if RentalApplication.where(user_id: user_id).count >= 3
        Rails.logger.warn("⚠️ Application limit hit for user #{user_id}")
        render json: { error: "Application limit reached. Please subscribe to apply for more properties." }, status: :forbidden
        return
      end
    
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

    # PUT rental_applications/:id
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
  
    # DELETE rental_applications/:id
    def destroy
      @rental_application.destroy
      head :no_content
    end

    def count_for_user
      if params[:user_id].present?
        count = RentalApplication.where(user_id: params[:user_id]).count
        render json: { application_count: count }
      else
        render json: { error: 'user_id is required' }, status: :bad_request
    end
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
        :rental_property_id
      )
    end
  
    def attach_documents
      return unless params[:documents].present?
  
      params[:documents].each do |doc|
        @rental_application.documents.attach(doc)
      end
    end
end
