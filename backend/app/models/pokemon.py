from app import db 
from .user import team

class Pokemon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ability = db.Column(db.JSON)
    base_experience = db.Column(db.Integer)
    pokedex_id = db.Column(db.Integer)
    hp_stat = db.Column(db.Integer)
    attack_stat = db.Column(db.Integer)
    defense_stat = db.Column(db.Integer)
    special_attack_stat = db.Column(db.Integer)
    special_defense_stat = db.Column(db.Integer)
    speed_stat = db.Column(db.Integer)
    pokemon_sprite = db.Column(db.String)
    pokemon_type = db.Column(db.JSON)


    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


