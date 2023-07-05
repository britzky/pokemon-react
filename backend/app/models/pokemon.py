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
    pokemon_type = db.Column(db.String)

    def from_dict(self, data):
        self.name = data['name']
        self.ability = data['ability']
        self.base_experience = data['base_experience']
        self.pokedex_id = data['pokedex_id']
        self.hp_stat = data['hp_stat']
        self.attack_stat = data['attack_stat']
        self.defense_stat = data['defense_stat']
        self.special_attack_stat = data['special_attack_stat']
        self.special_defense_stat = data['special_defense_stat']
        self.speed_stat = data['speed_stat']
        self.pokemon_sprite = data['pokemon_sprite']
        self.pokemon_type = data['pokemon_type']

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
