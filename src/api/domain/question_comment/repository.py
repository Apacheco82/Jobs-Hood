from api.models.index import db, Question, Question_comment
from flask import request, jsonify


def get_single_comment(id):
    question = Question_comment.query.get(id)
    return question

def post_question_comment(user_id, question_id, text):
    new_comment = Question_comment(id_question=question_id, lawyer_id=user_id, text=text)
    db.session.add(new_comment)
    db.session.commit()
    return new_comment
