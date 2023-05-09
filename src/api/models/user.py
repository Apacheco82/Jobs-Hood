from api.models.db import db
from datetime import datetime


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    avatar = db.Column(db.String(250), nullable=True)
    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(250), unique=True, nullable=False)
    roles_id = db.Column(db.Integer, db.ForeignKey("roles.id"))
    roles = db.relationship("Roles", back_populates="user") 
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    company = db.relationship("Company", foreign_keys=[company_id], uselist=False)
    lawyer_id = db.Column(db.Integer, db.ForeignKey('lawyer.id'))
    lawyer = db.relationship("Lawyer", foreign_keys=[lawyer_id], uselist=False)
    favs = db.relationship("Favorites", back_populates= "user")
    written_reviews = db.relationship("Review", back_populates="author", foreign_keys="Review.author_id")
    received_reviews = db.relationship("Review", back_populates="receiver", foreign_keys="Review.receiver_id")
    written_questions = db.relationship("Question", back_populates="user", foreign_keys="Question.user_id")
    received_questions = db.relationship("Question", back_populates="lawyer", foreign_keys="Question.lawyer_id")
    written_answers = db.relationship("Question_comment", back_populates="lawyer", foreign_keys="Question_comment.lawyer_id")
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user_name, password, name, last_name, email, roles_id):
        self.user_name = user_name
        self.password = password
        self.name = name
        self.last_name = last_name
        self.email = email
        self.roles_id = roles_id
   

    def __repr__(self):
        return  '%r' % self.user_name #para las relaciones, en lugar de mostrar el id



    def serialize(self):
        return {
        "id": self.id,
        "avatar": self.avatar,
        "user_name" : self.user_name,
        "name" : self.name,
        "last_name" : self.last_name,
        "email" : self.email,
        "roles_id": self.roles_id,
        "role": self.roles.description,
        "written_reviews": list(map(lambda written_review : written_review.serialize(), self.written_reviews)),
        "received_reviews" : list(map(lambda received_review : received_review.serialize(), self.received_reviews)),
        "written_questions": list(map(lambda written_question : written_question.serialize(), self.written_questions)),
        "received_questions" : list(map(lambda received_question : received_question.serialize(), self.received_questions)),
        "written_answers": list(map(lambda written_answer: written_answer.serialize(), self.written_answers)),
        "company": self.company.serialize() if self.company else None,
        "lawyer": self.lawyer.serialize()if self.lawyer else None,
        "data_create":self.data_create
        }

