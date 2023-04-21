import bcrypt

def hash_pass(password):
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return hashed

def find_role(description, model):
    role = model.query.filter_by(description=description).first()
    return role