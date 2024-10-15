from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
user = os.environ.get("MYSQL_USER")
database = os.environ.get("MYSQL_DATABASE")
password = os.environ.get("MYSQL_PASSWORD")
hostname = os.environ.get("MYSQL_HOST")
port = os.environ.get("MYSQL_PORT")

DATABASE_URL = f"mysql+pymysql://{user}@{hostname}:{port}/flagfrenzy" 
print(DATABASE_URL)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
