import api.domain.review.repository as Repository
from api.domain.user.repository import get_single_user
import api.handle_response as Response

def get_reviews():
    resultado = Repository.get_reviews()
    return Response.response_ok(resultado, "Get all reviews", 201)

def post_review(user, data):
    if user['role'] == "User": #se comprueba que el usuario logado es de tipo user, por eso le pasamos user_logged.serialize() en route como param
        receiver = get_single_user(data['receiver_id'])
        receiver_serialized = receiver.serialize()
        if receiver_serialized['role'] != "User": 
            return Repository.post_review(data['receiver_id'], data['author_id'], data['rating'], data['text']) #pasamos los campos necesarios a repository
        return Response.response_error("no puedes hacer reseñas a otro usuario", 400)
    return Response.response_error("Usuario no es de tipo user", 404) #si el usuario no era de tipo user no le dejamos hacer el post