import api.domain.company.repository as Repository
import api.handle_response as Response
from api.functions import verify_user


def get_companies():
    resultado = Repository.get_companies()
    return Response.response_ok(resultado, "Get all companies", 201)

def register_company(data):

    new_company = verify_user(data)
    
    if new_company.get("error") is not None:
        return new_company

    return Repository.register_company(data, #se crea una empresa haciendo referencia a los campos de Company
        data['address'], 
        data['province'], 
        data['cp'], 
        data['cif']
        )
    
def edit_user_company(id ,logged_id):
   
   if (logged_id == id):
      edit = Repository.edit_user_company(id) # se puede coger solo un parametro? 
      return Response.response_ok(edit, "Usuario modifiacado correctamente!", 200) 
   else:
      return Response.response_error("Error al editar usuario!", 400)
 