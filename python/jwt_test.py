import jwt
from datetime import datetime, timedelta

payload = {
    'message': 'hello sir',
    'user_id': 12,
    'exp': (datetime.now() + timedelta(hours=2)).timestamp(),
    'iac': datetime.now().timestamp(),
}
print(payload)
print('encoding')
jwt_token = jwt.encode(
    payload=payload,
    key='secret',
    algorithm='HS256'
)
print(jwt_token)
print('decoding')
decoded_payload = jwt.decode(
    jwt=jwt_token,
    key='secret',
    algorithms='HS256'
)
print(decoded_payload)
