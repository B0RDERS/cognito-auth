# auth.py
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from jwt import decode, get_unverified_header, InvalidTokenError, PyJWKClient
from starlette.status import HTTP_403_FORBIDDEN
from pydantic import BaseModel

class JWTAuthorizationCredentials(BaseModel):
  jwt_token: str
  header: dict
  claims: dict
  signature: str
  message: str

class JWTBearer(HTTPBearer):
  def __init__(self, jwks_url: str, algorithms: list[str], auto_error: bool = True):
    super().__init__(auto_error=auto_error)
    self.jwks_client = PyJWKClient(jwks_url, lifespan=300)
    self.algorithms = algorithms

  def verify_jwk_token(self, jwt_token: str) -> bool:
    try:
      signing_key = self.jwks_client.get_signing_key_from_jwt(jwt_token).key
      decode(jwt_token, signing_key, algorithms=self.algorithms)
      return True
    except (InvalidTokenError, KeyError):
      raise HTTPException(
        status_code=HTTP_403_FORBIDDEN, detail="JWK token verification failed"
      )

  async def __call__(self, request: Request) -> Optional[JWTAuthorizationCredentials]:
    credentials: HTTPAuthorizationCredentials = await super().__call__(request)

    if credentials:
      if credentials.scheme != "Bearer":
        raise HTTPException(
          status_code=HTTP_403_FORBIDDEN, detail="Wrong authentication method"
        )

      jwt_token = credentials.credentials

      try:
        unverified_header = get_unverified_header(jwt_token)
        unverified_claims = decode(jwt_token, options={"verify_signature": False})

        # Extract the message and signature for optional manual verification (if needed)
        message, signature = jwt_token.rsplit(".", 1)
        jwt_credentials = JWTAuthorizationCredentials(
          jwt_token=jwt_token,
          header=unverified_header,
          claims=unverified_claims,
          signature=signature,
          message=message,
        )
      except InvalidTokenError:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Invalid JWT")

      # Verify the token using the JWKs
      if not self.verify_jwk_token(jwt_token):
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Invalid JWK")

      return jwt_credentials

    return None