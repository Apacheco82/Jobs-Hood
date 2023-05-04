import api.domain.question_comment.repository as Repository
import api.handle_response as Response

def get_comments():
    resultado = Repository.get_comments()
    return Response.response_ok(resultado, "Get all comments", 201)

