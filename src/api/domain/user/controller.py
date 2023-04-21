import api.domain.user.repository as Repository
import bcrypt
from api.functions import hash_pass, find_role
from flask_jwt_extended import create_access_token # PARA PODER CREAR EL TOKEN

def verificar_usuario(new_user):  # funcion de verificaciones para poder usarla en repetidas ocasiones

   if new_user['user_name'] is  None or new_user['user_name'] == "":
       return{ "msg" : "El campo usuario debe estar completo", "error": True,"status": 400}
   if new_user['email'] is  None or new_user['email'] == "":
      return{ "msg" : "El campo email debe estar completo", "error": True,"status": 400}
   if new_user['password'] is  None or new_user['password'] == "":
      return{ "msg" : "El campo contraseña no puede estar vacío", "error": True,"status": 400}
   if new_user['name'] is  None or new_user['name'] == "":
      return{ "msg" : "El campo nombre no puede estar vacío", "error": True,"status": 400}
   return new_user


def create_user(new_user):
   correct_user = verificar_usuario(new_user)
   if correct_user.get("error") is not None:
      return correct_user
   hashed = hash_pass(new_user['password']) 
   return Repository.create_user(new_user['user_name'],hashed.decode(),new_user['name'],new_user['last_name'],new_user['email']) 





