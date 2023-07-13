from marshmallow import Schema, fields, validate

class PokemonSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    ability = fields.List(fields.Str(), required=True)
    base_experience = fields.Int(required=True)
    pokedex_id = fields.Int(required=True)
    hp_stat = fields.Int(required=True)
    attack_stat = fields.Int(required=True)
    defense_stat = fields.Int(required=True)
    special_attack_stat = fields.Int(required=True)
    special_defense_stat = fields.Int(required=True)
    speed_stat = fields.Int(required=True)
    pokemon_sprite = fields.Str(required=True)
    pokemon_type = fields.List(fields.Str(), required=True)
    