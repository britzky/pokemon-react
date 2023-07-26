from app import db 

class Move(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    pokemon_id = db.Column(db.Integer, db.ForeignKey('pokemon.id'), nullable=False)
    move_info = db.relationship('MoveInfo', backref='move', lazy=True)

class MoveInfo(db.Model):
    id = db.Column(db.Integer, priimary_key=True)

class Pokemon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    abilities = db.Column(db.JSON)
    base_experience = db.Column(db.Integer)
    pokedex_id = db.Column(db.Integer)
    pokemon_stats = db.Column(db.JSON)
    pokemon_sprite = db.Column(db.String)
    pokemon_types = db.Column(db.JSON)
    moves = db.relationship(
        'Move', secondary=pokemon_moves, lazy='dynamic'
    )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


