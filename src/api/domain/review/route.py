from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, Review, User
import api.domain.review.controller as Controller
from api.domain.user.controller import get_user_private
import api.handle_response as Response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt



review_bp = Blueprint('api/review', __name__)

@review_bp.route("/", methods =["GET"])
def get_reviews():
    return Controller.get_reviews()

@review_bp.route("/", methods =["POST"])
@jwt_required()
def post_review():
    data = request.get_json()
    info_token = get_jwt()
    user = info_token['sub']
    user_logged = get_user_private(user)
    if isinstance(user_logged, User): 
        new_review = Controller.post_review(user_logged.serialize(), data)
        if isinstance(new_review, Review):
            return Response.response_ok(new_review.serialize(), "Review creada", 201)

    #return Response.response_error("no es un usuario correcto", 400)