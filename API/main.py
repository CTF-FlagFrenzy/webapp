from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer, ForeignKey, Text, Table
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base
from sqlalchemy.exc import IntegrityError
from typing import Optional

# MySQL connection setup
DATABASE_URL = "mysql+pymysql://root@localhost/flagfrenzy"  # Update with your credentials

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

# Models for the database schema
class Team(Base):
    __tablename__ = 'Teams'

    ID = Column(Integer, primary_key=True, autoincrement=True)
    Teamname = Column(String(50), nullable=False, unique=True)
    Teamkey = Column(String(75), nullable=False)
    Points = Column(Integer, default=0)
    Members = Column(Integer, nullable=False, default=0)
    
    users = relationship("User", back_populates="team")


class User(Base):
    __tablename__ = 'User'

    ID = Column(Integer, primary_key=True, autoincrement=True)
    Nickname = Column(String(50), nullable=False)
    Name = Column(String(200), nullable=False)
    Points = Column(Integer, default=0)
    Class = Column(String(45), nullable=False)
    TeamsID = Column(Integer, ForeignKey('Teams.ID'), nullable=True)
    Disabled = Column(Integer, nullable=False, default=0)
    Email = Column(String(50), nullable=False)

    team = relationship("Team", back_populates="users")
    challenges = relationship("UserMadeChallenge", back_populates="user")


class Challenge(Base):
    __tablename__ = 'Challenges'

    ID = Column(Integer, primary_key=True, autoincrement=True)
    ChallengeName = Column(String(100), nullable=False, unique=True)
    Categorie = Column(String(45), nullable=False)
    Hintcount = Column(Integer, default=0)
    Points = Column(Integer, default=100)
    Description = Column(Text(1000), nullable=False)

    solved_by_users = relationship("UserMadeChallenge", back_populates="challenge")


class UserMadeChallenge(Base):
    __tablename__ = 'User_made_Challenges'

    User_ID = Column(Integer, ForeignKey('User.ID'), primary_key=True)
    Challenges_ID = Column(Integer, ForeignKey('Challenges.ID'), primary_key=True)
    Firstblood = Column(Integer, default=0)
    Solved = Column(Integer, default=0)

    user = relationship("User", back_populates="challenges")
    challenge = relationship("Challenge", back_populates="solved_by_users")

# Create database tables
Base.metadata.create_all(bind=engine)

# Pydantic models for data validation
class TeamCreate(BaseModel):
    Teamname: str
    Teamkey: str
  

class UserCreate(BaseModel):
    Nickname: str
    Name: str
    Class: str
    Email: str

class ChallengeCreate(BaseModel):
    ChallengeName: str
    Categorie: str
    Points: int = 100
    Description: str

class UserMadeChallengeCreate(BaseModel):
    User_ID: int
    Challenges_ID: int

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API endpoints with exception handling

@app.post("/teams/")
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    db_team = Team(**team.dict())
    try:
        db.add(db_team)
        db.commit()
        db.refresh(db_team)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Team with this name already exists.")
    except Exception as ex:
        raise HTTPException(status_code=422, detail=str(ex))
    return db_team


@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User with this nickname already exists.")
    except Exception as ex:
        raise HTTPException(status_code=422, detail=str(ex))
    return db_user


@app.post("/challenges/")
def create_challenge(challenge: ChallengeCreate, db: Session = Depends(get_db)):
    db_challenge = Challenge(**challenge.dict())
    try:
        db.add(db_challenge)
        db.commit()
        db.refresh(db_challenge)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Challenge with this name already exists.")
    except Exception as ex:
        raise HTTPException(status_code=422, detail=str(ex))
    return db_challenge


@app.post("/user-made-challenges/")
def create_user_made_challenge(user_made_challenge: UserMadeChallengeCreate, db: Session = Depends(get_db)):
    db_user_made_challenge = UserMadeChallenge(**user_made_challenge.dict())
    try:
        db.add(db_user_made_challenge)
        db.commit()
        db.refresh(db_user_made_challenge)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="This user-challenge combination already exists.")
    except Exception as ex:
        raise HTTPException(status_code=422, detail=str(ex))
    return db_user_made_challenge
