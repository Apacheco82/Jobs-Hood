import api.domain.lawyer.repository as Repository
import api.handle_response as Response
from api.functions import verificar_usuario



def get_lawyers():
    resultado = Repository.get_lawyers()
    return Response.response_ok(resultado, "Get all lawyers", 201)

def register_lawyer(data):

    new_lawyer = verificar_usuario(data)
    
    if new_lawyer.get("error") is not None:
        return new_lawyer

    return Repository.register_lawyer(data,
    data['address'], 
    data['city'], 
    data['cp'], 
    data['col_number']
    )