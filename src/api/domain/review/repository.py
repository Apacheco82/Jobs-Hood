from api.models.index import db, Review
from flask import request, jsonify

def get_reviews():
    reviews = Review.query.all()
    all_reviews = list(map(lambda review: review.serialize(), reviews))
    return all_reviews

def post_review(receiver_id, author_id, rating, text):
    new_review = Review(receiver_id, author_id, rating, text) #se crea una instancia de review pasándole los params que traemos desde controller
    db.session.add(new_review)
    db.session.commit()
    return new_review
