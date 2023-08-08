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
            "abilities": pokemon.abilities,
            "base_experience": pokemon.base_experience,
            "pokedex_id": pokemon.pokedex_id,
            "pokemon_stats": pokemon.pokemon_stats,
            "pokemon_sprite": pokemon.pokemon_sprite,
            "pokemon_types": pokemon.pokemon_types,
            "pokemon_moves": pokemon.pokemon_moves
        }
        return pokemon_dict

@main.route('/api/catch', methods=['POST'])
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
                        abilities=pokemon_data["abilities"],
                        base_experience=pokemon_data["base_experience"],
                        pokedex_id=pokemon_data["pokedex_id"],
                        pokemon_stats=pokemon_data["pokemon_stats"],
                        pokemon_sprite=pokemon_data["pokemon_sprite"],
                        pokemon_types=pokemon_data["pokemon_types"],
                        pokemon_moves=pokemon_data["pokemon_moves"],
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
    
@main.route('/api/release', methods=['POST'])
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
    
@main.route('/api/team')
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
        
@main.route('/api/trainers')
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
    
@main.route('/api/battle', methods=['POST'])
@token_auth.login_required
def battle():
    type_affinity = {
        'normal': {
            'strong': [],
            'weak': ['rock', 'steel'],
            'no_effect': ['ghost']
        },
        'fire': {
            'strong': ['grass', 'ice', 'bug', 'steel'],
            'weak': ['fire', 'water', 'rock', 'dragon'],
            'no_effect': []
        },
        'water': {
            'strong': ['fire', 'ground', 'rock'],
            'weak': ['water', 'grass', 'dragon'],
            'no_effect': []
        },
        'electric': {
            'strong': ['water', 'flying'],
            'weak': ['electric', 'grass', 'dragon'],
            'no_effect': ['ground']
        },
        'grass': {
            'strong': ['water', 'ground', 'rock'],
            'weak': ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
            'no_effect': []
        },
        'ice': {
            'strong': ['grass', 'ground', 'flying', 'dragon'],
            'weak': ['fire', 'water', 'ice', 'steel'],
            'no_effect': []
        },
        'fighting': {
            'strong': ['normal', 'ice', 'rock', 'dark', 'steel'],
            'weak': ['poison', 'flying', 'psychic', 'bug', 'fairy'],
            'no_effect': ['ghost']
        },
        'poison': {
            'strong': ['grass', 'fairy'],
            'weak': ['poison', 'ground', 'rock', 'ghost'],
            'no_effect': ['steel']
        },
        'ground': {
            'strong': ['fire', 'electric', 'poison', 'rock', 'steel'],
            'weak': ['grass', 'bug'],
            'no_effect': ['flying']
        },
        'flying': {
            'strong': ['grass', 'fighting', 'bug'],
            'weak': ['electric', 'rock', 'steel'],
            'no_effect': []
        },
        'psychic': {
            'strong': ['fighting', 'poison'],
            'weak': ['psychic', 'steel'],
            'no_effect': ['dark']
        },
        'bug': {
            'strong': ['grass', 'psychic', 'dark'],
            'weak': ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
            'no_effect': []
        },
        'rock': {
            'strong': ['fire', 'ice', 'flying', 'bug', 'dark'],
            'weak': ['fighting', 'ground', 'steel'],
            'no_effect': []
        },
        'ghost': {
            'strong': ['psychic', 'ghost'],
            'weak': ['dark'],
            'no_effect': ['normal']
        },
        'dragon': {
            'strong': ['dragon'],
            'weak': ['dark'],
            'no_effect': ['fairy']
        },
        'dark': {
            'strong': ['psychic', 'ghost',],
            'weak': ['fighting', 'dark', 'fariy'],
            'no_effect': []
        },
        'steel': {
            'strong': ['ice', 'rock', 'fairy'],
            'weak': ['fire', 'water', 'electric', 'dark'],
            'no_effect': []
        },
        'fairy': {
            'strong': ['fighting', 'dragon', 'dark'],
            'weak': ['fire', 'poison', 'steel' ],
            'no_effect': []
        },        
    }
    try:
        #get the users pokemon id from the request
        user_pokemon_id = request.get_json().get('user_mon_id')
        #get the trainers pokemon id from the request
        trainer_pokemon_id = request.get_json().get('trainer_mon_id')
        #get users pokemon
        user_pokemon = Pokemon.query.get(user_pokemon_id)
        #get trainers pokemon
        trainer_pokemon = Pokemon.query.get(trainer_pokemon_id)
        #check users pokemon type

        
    except Exception as e:
        logger.error(f"Exception occured: {e}")
        return jsonify({"message": "Couldn't get pokemon info"}), 500
    
        


    


             
