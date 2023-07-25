from flask import request, jsonify, g
from app.models import Pokemon, User
from app.models.user import team
from marshmallow.exceptions import ValidationError
from app.schemas.pokemon_schema import PokemonSchema
from . import main
from ..auth.auth import token_auth
import logging

logger = logging.getLogger(__name__)

pokemon_schema = PokemonSchema()
def get_user_pokemon_data():
    try:
        user_pokemon_data = request.get_json()
    except Exception as e:
        return None, {"message": "Error getting JSON from request"}
    try:
        pokemon_data = pokemon_schema.load(user_pokemon_data)
        return pokemon_data, None
    except ValidationError as err:
        print(f"ValidationError: {err.messages}")
        return None, err.messages

def create_pokemon_dict(pokemon):
        pokemon_dict = {
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
        }
        return pokemon_dict


@main.route('/catch', methods=['POST'])
@token_auth.login_required
def catch():
    try:
        pokemon_data, errors = get_user_pokemon_data()

        if errors is not None:
            return jsonify(errors), 400
        
        if pokemon_data is None:
            logger.error("Data validation failed")
            return jsonify({"message": "Pokemon failed"}), 400
        
        name = pokemon_data['name']
        existing_pokemon = Pokemon.query.join(User.pokemon).filter(User.id == g.current_user.id, Pokemon.name == name).first()

        if existing_pokemon is not None:
            if g.current_user.check_team(existing_pokemon):
                return jsonify({"message": f"You already have a {name.title()}", "status": "warning"}), 400
        elif g.current_user.max_pokemon():
            return jsonify({"message": "Your team is already full!", "status": "danger"}), 400
        else:
            if existing_pokemon is None:
                try:
                    new_pokemon = Pokemon(
                        name=pokemon_data["name"],
                        ability=pokemon_data["ability"],
                        base_experience=pokemon_data["base_experience"],
                        pokedex_id=pokemon_data["pokedex_id"],
                        hp_stat=pokemon_data["hp_stat"],
                        attack_stat=pokemon_data["attack_stat"],
                        defense_stat=pokemon_data["defense_stat"],
                        special_attack_stat=pokemon_data["special_attack_stat"],
                        special_defense_stat=pokemon_data["special_defense_stat"],
                        speed_stat=pokemon_data["speed_stat"],
                        pokemon_sprite=pokemon_data["pokemon_sprite"],
                        pokemon_type=pokemon_data["pokemon_type"],
                    )
                    new_pokemon.save_to_db()
                    g.current_user.catch(new_pokemon)
                    return jsonify({"message": f"You have caught a {name.title()}", "status": "success"})
                except Exception as e:
                    logger.error(f"Exception occured: {e}")
                    return jsonify({"message": "An error occured", "status": "danger"}), 500
            else:
                return jsonify({"message": f"You already have a {name}", "status": "warning"}), 200
    except Exception as e:
        logger.error(f"Exception occured: {e}")
        return jsonify({"message": "An error occured"}), 500
    
@main.route('/team')
@token_auth.login_required
def team():
        try:
            user_pokemon = g.current_user.pokemon.all()
            response = []
            for pokemon in user_pokemon:
                pokemon_dict = create_pokemon_dict(pokemon)
                response.append(pokemon_dict)
            return jsonify(response), 200
        except Exception as e:
            logger.error(f"Exception occurred: {e}")
            return jsonify({"message": "An error occurred"}), 500
        
@main.route('/trainers')
@token_auth.login_required
def trainers():
    try:
        users = User.query.all()
        response = []
        for user in users:
            if user != g.current_user:
                user_pokemon = [create_pokemon_dict(pokemon) for pokemon in user.pokemon.all()]
                response.append({
                    "username": user.user_name,
                    "id": user.id,
                    "pokemon": user_pokemon
                })
        return jsonify(response), 200
    except Exception as e:
        logger.error(f"Exception occurred: {e}")
        return jsonify({"message": "An error occurred"}), 500
    
@main.route('/battle', methods=['POST'])
@token_auth.login_required
def battle():
    
    
@main.route('/release', methods=['POST'])
@token_auth.login_required
def release():
    try:
        # Get the pokemon id from the request
        pokemon_id = request.get_json().get('pokemon_id')
        # find the pokemon by id
        selected_pokemon = Pokemon.query.get(pokemon_id)

        if not selected_pokemon:
            return jsonify({"message": "Pokmeon not found"}), 404
        
        #release the pokemon
        g.current_user.release(selected_pokemon)
        
        return jsonify({"message": f"You let go of {selected_pokemon.name}", "status": "success"}), 200
    except Exception as e:
        logger.error(f"Exception occurred: {e}")
        return jsonify({"message": "Failed to release pokemon"}), 500
        


    


             
