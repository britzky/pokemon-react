from app import db 

class Pokemon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    abilities = db.Column(db.JSON)
    base_experience = db.Column(db.Integer)
    pokedex_id = db.Column(db.Integer)
    pokemon_stats = db.Column(db.JSON)
    pokemon_sprite = db.Column(db.String)
    pokemon_types = db.Column(db.JSON)
    pokemon_moves = db.Column(db.JSON)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


