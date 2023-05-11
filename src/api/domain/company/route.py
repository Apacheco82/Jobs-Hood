from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
from api.models.index import db, User, Company
import api.domain.company.controller as Controller
import api.handle_response as Response


company_bp = Blueprint('company_bp', __name__)

@company_bp.route("/", methods= ["GET"])
def get_companies():
    return Controller.get_companies()

@company_bp.route("/", methods= ["POST"])
def register_company():
    data = request.get_json()

    new_company = Controller.register_company(data)

    if isinstance(new_company, User):   
        return Response.response_ok(new_company.serialize(), "New company added successfully", 201)
   
    return new_company

@company_bp.route("/edit/<int:id>", methods=["PUT"])
@jwt_required()
def edit_user_company(id):
    user_logged = get_jwt_identity()
    company =  Controller.edit_user_company(id, user_logged["company"]['id'], user_logged['id']) # la id del company
    if company:
        return Response.response_ok(company.serialize(),  "Usuario editado correctamente!",200)
    else:
        return Response.response_error("Error al guardar los datos!", 400) 