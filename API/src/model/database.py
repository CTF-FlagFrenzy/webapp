from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
user = os.environ.get("MYSQL_USER")
hostname = os.environ.get("MYSQL_HOST")
port = os.environ.get("MYSQL_PORT")
password = os.environ.get("MYSQL_ROOT_PASSWORD")

DATABASE_URL = f"mysql+pymysql://root:{password}@{hostname}:{port}/flagfrenzy" 
print(DATABASE_URL)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
