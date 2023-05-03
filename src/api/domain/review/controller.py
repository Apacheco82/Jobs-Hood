import api.domain.review.repository as Repository
import api.handle_response as Response

def get_reviews():
    resultado = Repository.get_reviews()
    return Response.response_ok(resultado, "Get all reviews", 201)

def post_review(user, data):
    if user['role'] == "User":
        return Repository.post_review(data['receiver_id'], data['author_id'], data['rating'], data['text'])
    return Response.response_error("Usuario no es de tipo user", 404)