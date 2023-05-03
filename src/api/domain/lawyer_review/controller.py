import api.domain.lawyer_review.repository as Repository
import api.handle_response as Response

def get_reviews():
    resultado = Repository.get_lawyer_reviews()
    return Response.response_ok(resultado, "Get all reviews", 201)