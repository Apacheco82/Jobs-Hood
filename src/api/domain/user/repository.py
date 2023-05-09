
from api.models.index import db, User, Roles
from flask import request
from api.functions import find_role, hash_pass
import bcrypt
import api.handle_response as Response

def get_users():
    users = User.query.all()
    all_users = list(map(lambda user: user.serialize(), users))
    return all_users


def create_user(user_name,password,name,last_name,email):
    roles = find_role("User", Roles)
    new_user = User(user_name,password,name,last_name,email,roles.id)
    db.session.add(new_user)
    db.session.commit()
    return new_user


def create_user_by_role(user_name,password,name,last_name,email, roles_id):
    user_by_role = User(user_name,password,name,last_name,email, roles_id)
    return user_by_role

def  get_user_private(email):
   return User.query.filter_by(email = email).one()

def get_single_user(id):
    user = User.query.get(id)
    return user

def edit_user(id):
    user = User.query.get(id)
    if user is None:
     return Response.response_error("Usuario no encontrado!", 404)
    else:
        info = request.get_json()
        user.user_name = info['user_name']
        password = hash_pass(info['password'])
        user.password = password.decode()
        user.name = info['name']
        user.last_name = info['last_name']
        user.email = info['email']
        db.session.commit()

    return user.serialize_user()