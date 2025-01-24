import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from auth import JWTBearer, JWTAuthorizationCredentials
from config import settings

app = FastAPI()

jwks_url = settings.JWKS_URL
auth = JWTBearer(jwks_url=jwks_url, algorithms=["RS256"])

@app.get("/protected")
def protected_route(credentials: JWTAuthorizationCredentials = Depends(auth)):
    return {"message": f"Hello, {credentials.claims['username']}"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=3001, reload=True)
