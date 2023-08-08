from flask import Flask, request, jsonify, make_response, g
from marshmallow.exceptions import ValidationError
from app.models import User
from . import auth
from app.schemas.user_schema import UserSchema
from .auth import basic_auth, token_auth
from functools import wraps
import logging

logger = logging.getLogger(__name__)

#Initialize User schema
user_schema = UserSchema()
def get_validated_user_data():
    user_data = request.get_json()

    # validate and deserialize the input data
    try:
        validated_data = user_schema.load(user_data)
    except ValidationError as err:
        return None, jsonify(err.messages), 400
    return validated_data, None, None
    
#Create httponly cookie for user
def create_user_response(user, message, status_code):
    response = make_response({
        "message": message,
        "user": {
            "id": user.id,
            "user_name": user.user_name,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "created_on": user.created_on
        }
    }, status_code)
    response.set_cookie('token', user.token, httponly=True, secure=True, samesite="Strict")
    return response

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.current_user is None:
            return jsonify({"message": "Token is required"}), 401
        return f(*args, **kwargs)
    return decorated_function

token_auth.login_required = login_required


@auth.route('/register', methods=['POST'])
def register():
    try:
        validated_data, errors, error_code = get_validated_user_data()

        if errors is not None:
            return errors, error_code
        
        if validated_data is None:
            logger.error("Data validation failed")
            return jsonify({"message": "Data validation failed"}), 400

        new_user = User(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            user_name=validated_data["user_name"],
            email=validated_data["email"],
        )
        new_user.password = new_user.hash_password(validated_data["password"])

        #Generate a token for the new user
        new_user.token = new_user.get_token()

        #Save the new use to the database
        new_user.save_to_db()
        return create_user_response(new_user, "Logged in sucessfully", 201)
    except Exception as e:
        logger.error(f"Exception occurred: {e}")
        return jsonify({"messgage": "An error occurred"}), 500


@auth.route('/api/signin', methods=["POST"])
def signin():
    try:
        user_data = request.get_json()

        if not user_data:
            return jsonify({"message": "Bad Request"}), 400
        
        user_name = user_data.get('user_name')
        password = user_data.get('password')

        #check if the user exists by either username or email
        user = User.query.filter_by(user_name=user_name).first()

        if not user:
            return jsonify({"message": "Invalid username/email or password"})
        
        #check if users password is correct
        if not user.check_hash_password(password):
            return jsonify({"message": "Invalid username/email or password"})

        user.token = user.get_token()
        user.save_to_db()

        return create_user_response(user, "Logged in sucessfully", 200)
    except Exception as e:
        logger.error(f"Excepon occured: {e}")
        return jsonify({"message": "An error occured"}), 500


@auth.route('/verify')
@token_auth.login_required
def verify():
    return jsonify({"message": "Token is valid", "user_id": g.current_user.id}), 200

@auth.route('/logout', methods=["POST"])
@token_auth.login_required
def logout():
    g.current_user.delete_token()
    response = make_response("Logout")
    response.set_cookie('token', expires=0)
    return response










    
    

