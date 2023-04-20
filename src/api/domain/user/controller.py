import api.domain.user.repository as Repository
import bcrypt
from flask_jwt_extended import create_access_token # PARA PODER CREAR EL TOKEN

# def verificar_usuario(new_user):  # funcion de verificaciones para poder usarla en repetidas ocasiones

#    if new_user['user_name'] is  None or new_user['user_name'] == "":
#        return{ "msg" : "El campo usuario debe estar completo", "error": True,"status": 400}
#    if new_user['email'] is  None or new_user['email'] == "":
#       return{ "msg" : "El campo email debe estar completo", "error": True,"status": 400}
#    if new_user['password'] is  None or new_user['password'] == "":
#       return{ "msg" : "El campo contraseña no puede estar vacío", "error": True,"status": 400}
#    return new_user


def create_user(new_user):
   correct_user = Repository.create_user(new_user)

   return correct_user