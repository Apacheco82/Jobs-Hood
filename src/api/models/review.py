from api.models.db import db
from datetime import datetime


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    company_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    company_user = db.relationship('User', foreign_keys=[company_user_id], back_populates='received_reviews') #receptor

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', foreign_keys=[user_id], back_populates='written_reviews') #autor

    rating = db.Column(db.Integer(), nullable=False)
    text = db.Column(db.Text)
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, company_user_id, user_id, rating, text):
        self.company_user_id = company_user_id
        self.user_id = user_id
        self.rating = rating
        self.text = text


    def serialize(self):
        return {
            "id" : self.id,
            'company_user_id': self.company_user_id,
            'user_id': self.user_id,
            'rating': self.rating,
            'text': self.text,
            "data_create":self.data_create
        }

