
from api.models.index import db, User, Roles, Company, Lawyer
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

    return user

def edit_user(user, info):
    
    user.user_name = info['user_name']     
    user.name = info['name']
    user.last_name = info['last_name']
    user.email = info['email']
    user.avatar = info['secure_url']
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
            user.user_name = info['email']
         
    return user

def check_worker(user_name, email):
    user_name = User.query.filter_by(user_name = user_name).first()
    email = User.query.filter_by(email = email).first()
    if user_name is not None:
        return Response.response_error("El nombre de usuario ya existe", 400)
    elif email is not None:
        return Response.response_error("El email ya está registrado", 400)
    else: return { "msg" : "Usuario correcto","error": False, "status": 200}

def check_lawyer( email, col_number):
    email = User.query.filter_by(email = email).first()
    col_number = Lawyer.query.filter_by(col_number = col_number).first()
   
    if email is not None:
        return Response.response_error("El email ya está registrado", 400)
    elif col_number is not None:
        return Response.response_error("El número de colegiado ya está registrado", 400)
    else: return { "msg" : "Usuario correcto","error": False, "status": 200}

def check_company( email, cif):
   
    email = User.query.filter_by(email = email).first()
    cif = Company.query.filter_by(cif = cif).first()
    
    if email is not None:
        return Response.response_error("El email ya está registrado", 400)
    elif cif is not None:
        return Response.response_error("El CIF ya está registrado", 400)
    else: return { "msg" : "Usuario correcto","error": False, "status": 200}

def check_roles_edit(email):
    email = User.query.filter_by(email = email).first()
    if email is not None:
        return Response.response_error("El email ya está registrado", 400)
    else: return { "msg" : "Usuario correcto","error": False, "status": 200}
