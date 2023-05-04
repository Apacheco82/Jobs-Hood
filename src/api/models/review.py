from api.models.db import db
from datetime import datetime


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver = db.relationship('User', foreign_keys=[receiver_id], back_populates='received_reviews') #receptor
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    author = db.relationship('User', foreign_keys=[author_id], back_populates='written_reviews') #autor
    rating = db.Column(db.Integer(), nullable=False)
    text = db.Column(db.Text)
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, receiver_id, author_id, rating, text):
        self.receiver_id = receiver_id
        self.author_id = author_id
        self.rating = rating
        self.text = text


    def serialize(self):
        return {
            "id" : self.id,
            'receiver_id': self.receiver_id,
            'author_id': self.author_id,
            'rating': self.rating,
            'text': self.text,
            "data_create":self.data_create
        }


