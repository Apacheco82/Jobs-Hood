from api.models.index import db, Question, Question_comment
from flask import request, jsonify


def get_comments():
    comments = Question_comment.query.all()
    all_comments = list(map(lambda comment : comment.serialize(), comments))
    return all_comments