from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
DATABASE_URL = "mysql+pymysql://root@localhost/flagfrenzy"  # Update with your credentials

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
