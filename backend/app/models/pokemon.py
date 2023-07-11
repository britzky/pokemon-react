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


    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

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
