from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.models import User
from flask import g

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

#Basic auth functionality
@basic_auth.verify_password
def verify_password(email, password):
    #check if the user exists
    user = User.query.filter_by(email=email).first
    if not user:
        return False
    g.current_user = user
    return user.check_hash_password(password)