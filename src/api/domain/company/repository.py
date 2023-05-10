from api.models.index import db, User, Company, Roles
from api.domain.user.controller import create_user_by_role
from flask import request, jsonify
import bcrypt
from api.functions import hash_pass, find_role


def get_companies():
    all_companies = Company.query.all()
    users = User.query.filter(User.roles.has(description='Company')).all()
    companies_serialized = list(map(lambda empresa : empresa.serialize(), all_companies))
    users_serialized = list(map(lambda user: user.serialize(), users))
    return users_serialized

def register_company(data, address, province, cp, cif):

    roles = find_role('Company', Roles)

    user = create_user_by_role(data, roles.id)

    new_company = Company(address, province, cp, cif)
        
    user.company = new_company

    db.session.add(user)
    db.session.commit()

    return user

def edit_user_company(id):
    user = User.query.get(id)
    company = Company.query.get(id) # por id o por modelo ? 
  #donde poner el commit 
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

    if user.roles =='Company':
        data = request.get_json()
        company.address = data['address']
        company.province = data['province']
        company.cp = data['cp']
        company.cif = data['cif']
    else:
        return Response.response_error("Fallo al modificar datos de la empresa!",400)


    return user
