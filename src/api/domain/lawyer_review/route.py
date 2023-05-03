from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, Lawyer_review
import api.domain.lawyer_review.controller as Controller
import api.handle_response as Response


lawyer_review_bp = Blueprint('api/lawyer_review', __name__)

@lawyer_review_bp.route("/", methods =["GET"])
def get_lawyer_reviews():
    return Controller.get_reviews()
