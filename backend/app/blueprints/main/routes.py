from flask import request, jsonify
from app.models import Pokemon, User
from app.models.user import team
from app.schemas.pokemon_schema import PokemonSchema
from . import main
from ..auth.auth import token_auth
import logging

logger = logging.getLogger(__name__)

pokemon_schema = PokemonSchema()
def get_user_pokemon_data():
    user_pokemon_data = request.get_json()
    try:
        pokemon_data = pokemon_schema.load(user_pokemon_data)
        return pokemon_data
    except ValueError as err:
        raise ValueError(err.messages)

def create_pokemon_response(pokemon, message, status_code):
    response = {
        "message": message,
        "pokemon": {
            "id": pokemon.id,
            "name": pokemon.name,
            "ability": pokemon.ability,
            "base_experience": pokemon.base_experience,
            "pokedex_id": pokemon.pokedex_id,
            "hp_stat": pokemon.hp_stat,
            "attack_stat": pokemon.attack_stat,
            "defense_stat": pokemon.defense_stat,
            "special_attack_stat": pokemon.special_attack_stat,
            "special_defense_stat": pokemon.special_defense_stat,
            "speed_stat": pokemon.speed_stat,
            "pokemon_sprite": pokemon.pokemon_sprite,
            "pokemon_type": pokemon.pokemon_type
        },
    }
    return jsonify(response), status_code


@main.route('/pokemon', methods=['GET', 'POST'])
@token_auth.login_required
def pokemon():
    try:
        pokemon_data, errors, error_code = get_user_pokemon_data()

        if errors is not None:
            return errors, error_code
        
        if pokemon_data is None:
            logger.error("Data validation failed")
            return jsonify({"message": "Pokemon failed"}), 400
        
        new_pokemon = Pokemon(
            name=pokemon_data["name"],
            ability=pokemon_data["ability"],
            base_experience=pokemon_data["base_experience"],
            pokedex_id=pokemon_data["pokedex_id"],
            hp_stat=pokemon_data["hp_stat"],
            attack_stat=pokemon_data["attack_stat"],
            defense_stat=pokemon_data["defense_stat"],
            special_attack_stat=pokemon_data["special_attack_stat"],
            special_defense_Stat=pokemon_data["special_defense_stat"],
            speed_stat=pokemon_data["speed_stat"],
            pokemon_sprite=pokemon_data["pokemon_sprite"],
            pokemon_type=pokemon_data["pokemon_type"],
        )

        new_pokemon.save_to_db()
    except Exception as e:
        logger.error(f"Exception occured: {e}")
        return jsonify({"message": "An error occured"}), 500