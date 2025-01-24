from pydantic_settings import SettingsConfigDict, BaseSettings

class Settings(BaseSettings):
  JWKS_URL: str
  model_config = SettingsConfigDict(env_file=".env", extra='allow')

settings = Settings()
