"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Company, Favorites,Lawyer_review, Lawyer_review_comment, Lawyer_review, Lawyer, Question_comment, Question, Review_comment,Review, Roles
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['GET'])
def handle_hello():
    
    all_users = User.query.all()
    user_serialized = list( 
        map(lambda user: user.serialize(), all_users))
    response = {
            "result": {
                "users": user_serialized
            }
        }
    return response, 200