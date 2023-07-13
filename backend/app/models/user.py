from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

team = db.Table('team',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('pokemon_id', db.Integer, db.ForeignKey('pokemon.id'))
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    user_name = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow())
    pokemon = db.relationship(
        'Pokemon', secondary=team, backref='trainers', lazy='dynamic'
    )
    token = db.Column(db.String, unique=True)

    #methods for token
    def get_token(self):
        #get user token
        if self.token:
            return self.token
        
        #if token doesn't exist
        self.token = secrets.token_urlsafe(32)
        return self.token
    
    def check_token(token):
        user = User.query.filter_by(token=token).first()
        if not user:
            return None
        return user


    #hash the password
    def hash_password(self, original_password):
        return generate_password_hash(original_password)
    
    # check the password
    def check_hash_password(self, login_password):
        return check_password_hash(self.password, login_password)
    

    # update user attributes
    def update_profile(self, data):
        self.user_name = data['user_name']
        self.email = data['email']

        #catch pokemon
    def catch(self, pokemon):
        self.pokemon.append(pokemon)
        db.session.commit()
    
    #release pokemon
    def release(self, pokemon):
        db.session.delete(pokemon)
        db.session.commit()
    
    #check team
    def check_team(self, pokemon):
        if pokemon in self.pokemon:
            return True
        else:
            return False
    
    #How many pokemon a user can have
    def max_pokemon(self):
        if len(self.pokemon.all()) >= 6:
            return True
        else:
            return False

    #save to db
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
