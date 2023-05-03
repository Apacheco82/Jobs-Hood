from api.models.index import db, Lawyer_review
from flask import request, jsonify

def get_lawyer_reviews():
    lawyer_reviews = Lawyer_review.query.all()
    all_lawyer_reviews = list(map(lambda lawyer_reviews: lawyer_reviews.serialize(), lawyer_reviews))
    return all_lawyer_reviews 