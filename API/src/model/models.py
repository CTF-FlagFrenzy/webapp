from sqlalchemy import create_engine, Column, String, Integer, ForeignKey, Text, Table
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base
Base = declarative_base()


# Models for the database schema
class Team(Base):
    __tablename__ = 'Teams'

    ID = Column(Integer, primary_key=True, autoincrement=True)
    Teamname = Column(String(50), nullable=False, unique=True)
    Teamkey = Column(String(75), nullable=False, unique=True)
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
    Difficulty = Column(String(30), default='Easy')
    Static = Column(String(50),nullable=False )
    Chain = Column(String(100), nullable=True )
    Hint1 = Column(Text(400), default=None)
    Hint2 = Column(Text(400), default=None)
    Hint3 = Column(Text(400), default=None)

    made_by_users = relationship("UserMadeChallenge", back_populates="challenge")


class UserMadeChallenge(Base):
    __tablename__ = 'User_made_Challenges'

    User_ID = Column(Integer, ForeignKey('User.ID'), primary_key=True)
    Challenges_ID = Column(Integer, ForeignKey('Challenges.ID'), primary_key=True)
    Firstblood = Column(Integer, default=0)
    Solved = Column(Integer, default=0)

    user = relationship("User", back_populates="challenges")
    challenge = relationship("Challenge", back_populates="made_by_users")


