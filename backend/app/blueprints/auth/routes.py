from flask import Flask, request, jsonify
from marshmallow.exceptions import ValidationError
from app.models import User
from app.blueprints.auth import auth
from app.schemas.user_schema import UserSchema


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
    


@auth.route('/register', methods=['POST'])
def register():

    new_user = User(
        user_name=validated_data["user_name"],
        email=validated_data["email"],
        password=User.hash_password(validated_data["password"])
    )

    #Save the new use to the database
    new_user.save_to_db()

    return jsonify({"message": "User created successfully"}), 201





    
    

