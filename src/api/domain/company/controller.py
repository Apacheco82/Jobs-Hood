import api.domain.company.repository as Repository
import api.handle_response as Response


def get_companies():
    resultado = Repository.get_companies()
    return Response.response_ok(resultado, "Get all companies", 201)

def register_company(data):

    if data['email'] is None or data['email'] == '':
        return Response.response_error('Email not valid', 400)

    if data['user_name'] is None or data['user_name'] == '':
        return Response.response_error('user not valid', 400)

    if 'password' not in data or len(data['password']) < 8:
        return Response.response_error('Password must have at least 8 characters', 400)

    if resultado is not None:
        return Response.response_ok(resultado.serialize(), "Company added successfully", 201)
    else:
        return Response.response_error("Error creating the company", 400)