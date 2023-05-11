from api.models.index import db, User, Company, Roles
from api.domain.user.controller import create_user_by_role
from api.domain.user.repository import edit_user_by_role
from flask import request, jsonify
import bcrypt
from api.functions import hash_pass, find_role
import api.handle_response as Response


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
    roles = find_role('Company', Roles)
    user = edit_user_by_role(id, roles.id)
    company = Company.query.get(id)
    if company is None:
        return Response.response_error("Empresa no encontrada!",404)
    else:
        info = request.get_json()
        company.address = info['address']
        company.province = info['province']
        company.cp = info['cp']
        company.cif = info['cif']

    return company

    user.company = company

    db.session.add(user)
    db.session.commit()

    return user

