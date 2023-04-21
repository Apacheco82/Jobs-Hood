from api.models.index import db, User, Company, Roles
from flask import request, jsonify
import bcrypt


def get_companies():
    all_companies = Company.query.all()
    users = User.query.filter(User.roles.has(description='Company')).all()
    companies_serialized = list(map(lambda empresa : empresa.serialize(), all_companies))
    users_serialized = list(map(lambda user: user.serialize(), users))
    return users_serialized

def register_company(data):

    roles = Roles.query.filter_by(description='Company').first() #búsqueda por el campo descripcion de los roles

    hashed = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())

    user = User( #se crea un usuario haciendo referencia a los campos de user
    data['user_name'],
    hashed.decode(),
    data['name'],
    data['last_name'],
    data['email'],
    roles.id #se trae el campo id de la tabla roles para lawyer y se añade al user
    )

   #print("la data", data)

    new_company = Company( #se crea un abogado haciendo referencia a los campos de lawyer
        data['address'], 
        data['city'], 
        data['cp'], 
        data['cif']
        )
        
    user.company.append(new_company) #se añade el abogado al array de user.lawyer

    db.session.add(user) #se añade a la base de datos incluyendo el array del lawyer
    db.session.commit()

    return user