from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Company
import api.domain.company.controller as Controller


company_bp = Blueprint('company_bp', __name__)

@company_bp.route("/user/company", methods= ["GET"])
def get_companies():
    return Controller.get_companies()

@company_bp.route("/user/company", methods= ["POST"])
def register_company():
    data = request.get_json()
    return Controller.register_company(data)