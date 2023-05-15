
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Roles
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
import api.domain.user.controller as Controller
import api.handle_response as Response

api = Blueprint('api/user', __name__)


@api.route("/", methods= ["GET"])
def get_users():
    return Controller.get_users()

@api.route('/worker', methods=['POST'])
def create_user():
        body = request.get_json()
        new_user = Controller.create_user(body)   
        if isinstance(new_user, User):   
            return Response.response_ok(new_user.serialize(), "Usuario registrado correctamente!", 201)
        return new_user #para que recoja el error de la funcion validar_usuario

@api.route('/login', methods=['POST'])
def login_users():
    body = request.get_json()
    token = Controller.login_users(body)
    if token.get('token'):
        return jsonify(token), 200
    return jsonify(token), token['status']


@api.route('/profile', methods =['GET'])
@jwt_required()
def get_user_private():
    info_token = get_jwt()
    user = info_token['sub']
    user_response = Controller.get_user_private(user)
    if isinstance(user_response, User):   # si el nuevo usuario es una instancia del model USER (pertenece?) responde un serializado si no ,responde el mensaje de erro
        return jsonify(user_response.serialize()), 200
    return jsonify(user_response), user_response['status']

@api.route("/<int:id>", methods= ["GET"])
def get_single_user(id):
    if not isinstance(id, int):
        return Response.response_error("Not valid", 404) 
    user = Controller.get_single_user(id)
    return Response.response_ok(user.serialize(), "tu usuario, gracias", 200)



@api.route('/update_avatar', methods=['PUT'])
@jwt_required()
def update_avatar():
    try:
        user = get_jwt_identity()
        print(user)        
        avatar = request.files['avatar'] # Es el avatar que pasamos en el form.append en el handleClick 
        print(avatar)
        user_update = Controller.update_avatar(user, avatar)
        print("USER UPDATE",user_update)
        return Response.response_ok(user_update.serialize(), "Avatar actualizado", 200)
        
    except Exception as error:
        print('Error', error)
        return Response.response_error("Error al actualizar el avatar", 400)


@api.route("/edit", methods=["PUT"])
@jwt_required()
def edit_user():
    user_logged = get_jwt_identity()
    info = request.get_json()
    user = Controller.edit_user(user_logged["id"],info)
   
    if user:
        return Response.response_ok(user.serialize_only_user() , "Usuario editado correctamente!",200)
    else:
       return Response.response_error("Error al guardar los datos!", 400) 
