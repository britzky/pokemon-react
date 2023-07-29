from marshmallow import Schema, fields

class StatChangeSchema(Schema):
    amount = fields.Int(allow_none=True)
    stat = fields.Str(allow_none=True)

class MoveSchema(Schema):
    accuracy = fields.Int(allow_none=True)
    damage_class = fields.Str()
    effect_chance = fields.Int(allow_none=True)
    effect_entry = fields.Str()
    flavor_text = fields.Str()
    name = fields.Str()
    power = fields.Int(allow_none=True)
    stat_changes = fields.List(fields.Nested(StatChangeSchema))
    target = fields.Str()
    type = fields.Str()
