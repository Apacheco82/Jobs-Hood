from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Lawyer
import api.domain.company.controller as Controller
import api.handle_response as Response
import bcrypt

lawyer_bp = Blueprint('lawyer_bp', __name__)


@company_bp.route("/", methods= ["GET"])
def get_lawyers():
    return Controller.get_lawyers()

@company_bp.route("/", methods= ["POST"])
def register_lawyer():
    data = request.get_json()

    new_lawyer = Controller.register_lawyer(data)

    if isinstance(new_lawyer, User):   
        return Response.response_ok(new_lawyer.serialize(), "Lawyer created successfully", 201)
   
    return Response.response_error("Error, lawyer couldn't be created", 401)