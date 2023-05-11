from api.models.index import db, Review, User
from flask import request, jsonify

def get_reviews():
    reviews = Review.query.all()
    all_reviews = list(map(lambda review: review.serialize(), reviews))
    return all_reviews

def post_review(receiver_id, author_id, rating, text,user_name ):
    new_review = Review(receiver_id, author_id, rating, text, user_name) #se crea una instancia de review pasándole los params que traemos desde controller
    db.session.add(new_review)
    db.session.commit()
    return new_review

def get_reviews_by_type_and_id(review_type, user_id):
    user = User.query.get(user_id)
    if not user:
        return []
    if review_type == 'lawyer':
        if not user.lawyer:
            return []
    elif review_type == 'company':
        if not user.company:
            return []
    else:
        return []

    comments = user.received_reviews
    print(f'comments:{comments}')
    all_comments = list(map(lambda comment: comment.serialize(), comments))
    return all_comments


