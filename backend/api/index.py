from fastapi import FastAPI
from mangum import Mangum  # Lambda adapter for ASGI
from api.main import app

handler = Mangum(app)