
from api.models.index import db, User, Roles
from flask import request, jsonify
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

def update_avatar(id, avatar):
    user = User.query.get(id)
    user.avatar = avatar['secure_url']
    db.session.commit()

def edit_user(user,info):
    
    user.user_name = info['user_name']     
    user.name = info['name']
    user.last_name = info['last_name']
    user.email = info['email']
    user.avatar = info['avatar']

    db.session.commit()
         
    return user

def edit_user_by_role(id,info):
    user = User.query.get(id)
    if user is None:
        return Response.response_error("Usuario no encontrado!", 404)
    else:    
            user.name = info['name']
            user.email = info['email']
         
    return user


