from marshmallow import Schema, fields
from . import MoveSchema

class StatSchema(Schema):
    base_stat = fields.Int(required=True)
    stat_name = fields.Str(required=True)

class PokemonSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    abilities = fields.List(fields.Str(), required=True)
    base_experience = fields.Int(required=True)
    pokedex_id = fields.Int(required=True)
    pokemon_stats = fields.List(fields.Nested(StatSchema), required=True)
    pokemon_sprite = fields.Str(required=True)
    pokemon_types = fields.List(fields.Str(), required=True)
    pokemon_moves = fields.Nested(MoveSchema, many=True)
    