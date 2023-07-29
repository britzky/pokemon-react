from app import db

class Move(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    accuracy = db.Column(db.Integer)
    damage_class = db.Column(db.String)
    effect_chance = db.Column(db.Integer)
    effect_entry = db.Column(db.String)
    flavor_text = db.Column(db.String)
    name = db.Column(db.String)
    power = db.Column(db.Integer)
    stat_changes = db.Column( db.JSON)
    target = db.Column(db.String)
    type = db.Column(db.String)

