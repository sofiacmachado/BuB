class ApplicationController < ActionController::Base
  private

  def ensure_logged_in
    token = cookies.signed[:bub_session_token]
    @session = Session.find_by(token: token)

    if @session
      @user = @session.user
    else
      render json: { error: 'user not logged in' }, status: :unauthorized
    end
  end
end
