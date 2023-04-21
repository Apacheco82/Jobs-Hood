import bcrypt

def hash_pass(password):
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return hashed

def find_role(description, model):
    role = model.query.filter_by(description=description).first()
    return role

def verificar_usuario(new_user):
    required_fields = {
        'user_name': "El campo usuario debe estar completo",
        'email': "El campo email debe estar completo",
        'password': "El campo contraseña no puede estar vacío",
        'name': "El campo nombre no puede estar vacío"
    }

    for field, error_msg in required_fields.items():
        if new_user[field] is None or new_user[field] == "":
            return {"msg": error_msg, "error": True, "status": 400}

    return new_user