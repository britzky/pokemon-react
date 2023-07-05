from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

team = db.Table('team',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('pokemon_id', db.Integer, db.ForeignKey('pokemon.id'))
)

class User(db.model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String, nulllable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow())
    pokemon = db.relationship(
        'Pokemon', secondary=team, backref='trainers', lazy='dynamic'
    )

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

    #save to db
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
