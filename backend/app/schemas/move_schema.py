from marshmallow import Schema, fields

class StatChangeSchema(Schema):
    amount = fields.Int()
    stat = fields.Str()

class MoveSchema(Schema):
    id = fields.Int(required=True)
    accuracy = fields.Int()
    damage_class = fields.Str()
    effect_chance = fields.Int()
    effect_entry = fields.Str()
    flavor_text = fields.Str()
    name = fields.Str()
    power = fields.Int()
    stat_changes = fields.List(fields.Nested(StatChangeSchema))
    target = fields.Str()
    type = fields.Str()
