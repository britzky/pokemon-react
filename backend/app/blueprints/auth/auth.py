from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.models import User
from flask import g, Blueprint

auth = Blueprint('auth', __name__)

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

#Basic auth functionality
@basic_auth.verify_password
def verify_password(email, password):
    #check if the user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return False
    g.current_user = user
    return user.check_hash_password(password)

#Verify Token Functionality
@token_auth.verify_token
def verify_token(token):
    user = User.check_token(token)
    if not user:
        return False
    g.current_user = user
    return user