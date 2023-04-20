from api.models.index import db, User, Roles
import bcrypt

def create_user(body):
    hashed = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt(14))    
    roles = Roles.query.filter_by(description='User').first()
    new_user = User(body['user_name'],hashed.decode(),body['name'],body['last_name'],body['email'],roles.id)
    db.session.add(new_user)
    db.session.commit()
    return new_user.serialize()