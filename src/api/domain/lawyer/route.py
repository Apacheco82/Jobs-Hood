from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Lawyer
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
import api.domain.lawyer.controller as Controller
import api.handle_response as Response
import bcrypt

lawyer_bp = Blueprint('lawyer_bp', __name__)


@lawyer_bp.route("/", methods= ["GET"])
def get_lawyers():
    return Controller.get_lawyers()

@lawyer_bp.route("/", methods= ["POST"])
def register_lawyer():
    data = request.get_json()

    new_lawyer = Controller.register_lawyer(data)

    if isinstance(new_lawyer, User):   
        return Response.response_ok(new_lawyer.serialize(), "Lawyer created successfully", 201)
   
    return new_lawyer

@lawyer_bp.route("/edit", methods=["PUT"])
@jwt_required()
def edit_user_lawyer():
    user_logged = get_jwt_identity()
    info = request.get_json()
    user  =  Controller.edit_user_lawyer(user_logged["id"],info)
    if user:
        return Response.response_ok(user.serialize_user(),  "Usuario editado correctamente!",200)
    else:
        return Response.response_error("Error al guardar los datos!", 400) 