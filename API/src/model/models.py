from sqlalchemy import (
    create_engine, Column, String, Integer, ForeignKey, Text, Table, DateTime, Float
)
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

# --------------------- MODELS -----------------------
class Team(Base):
    """
    Database model for teams.
    """
    __tablename__ = "Teams"
    
    ID = Column(Integer, primary_key=True, autoincrement=True)
    Teamname = Column(String(50), nullable=False, unique=True)
    Password = Column(String(256), nullable=False)
    Teamkey = Column(String(75), nullable=False, unique=True)
    Points = Column(Float, default=0)
    Members = Column(Integer, nullable=False, default=0)
    SharedFlag = Column(Integer, nullable=False, default=0)
    Disabled = Column(Integer, nullable=False, default=0)
    FirstBloods = Column(Integer, nullable=False, default=0)
    TeamLeader = Column(String(150), ForeignKey("User.ID"), nullable=False)

    leader = relationship("User", back_populates="leader_of_team", foreign_keys="[Team.TeamLeader]", uselist=False)

    users = relationship("User", back_populates="team", foreign_keys="[User.TeamsID]")
    currentPoints = relationship("TeamPoints", back_populates="team", foreign_keys="[TeamPoints.TeamID]")
    flag_submissions = relationship("FlagSubmission", back_populates="team")
    shared_flag_submissions = relationship("SharedFlagSubmission", foreign_keys="[SharedFlagSubmission.team_id]", back_populates="team")
    
class TeamPoints(Base):
    """
    Database model for team points.
    """
    __tablename__ = "TeamPoints"

    ID = Column(Integer, primary_key=True, autoincrement=True)
    TeamID = Column(Integer, ForeignKey('Teams.ID'), nullable=False)
    Time = Column(DateTime, nullable=False)
    Points = Column(Float, nullable=False)
    Teamname = Column(String(50), nullable=False)

    team = relationship("Team", back_populates="currentPoints")
    
class User(Base):
    """
    Database model for users.
    """
    __tablename__ = "User"

    ID = Column(String(150), primary_key=True)
    Nickname = Column(String(50), nullable=False)
    Points = Column(Float, default=0)
    TeamsID = Column(Integer, ForeignKey("Teams.ID"), nullable=True)
    Email = Column(String(50), nullable=False)
    Avatar = Column(String(100), nullable=True, default=None)

    leader_of_team = relationship("Team", back_populates="leader", foreign_keys="[Team.TeamLeader]", uselist=False)
    team = relationship("Team", back_populates="users", foreign_keys="[User.TeamsID]")
    challenges = relationship("UserMadeChallenge", back_populates="user")


class Challenge(Base):
    """
    Database model for challenges.
    """
    __tablename__ = "Challenges"

    ID = Column(Integer, primary_key=True, autoincrement=True)
    ChallengeName = Column(String(100), nullable=False, unique=True)
    FormatedChallengeName =  Column(String(100), nullable=False)
    Categorie = Column(String(45), nullable=False)
    Points = Column(Integer, default=100)
    Description = Column(Text(1000), nullable=False)
    Difficulty = Column(String(30), default="Easy")
    Static = Column(String(50), nullable=False)
    Chain = Column(Integer, nullable=True, default=None)
    Hint1 = Column(Text(400), nullable=True, default=None)
    Hint2 = Column(Text(400), nullable=True, default=None)
    Hint3 = Column(Text(400), nullable=True, default=None)
    IsStatic = Column(Integer, nullable=False, default=0)

    made_by_users = relationship("UserMadeChallenge", back_populates="challenge")
    flag_submissions = relationship("FlagSubmission", back_populates="challenge")
    shared_flag_submissions = relationship("SharedFlagSubmission", back_populates="challenge")

class UserMadeChallenge(Base):
    """
    Database model for user-made challenges.
    """
    __tablename__ = "User_made_Challenges"

    User_ID = Column(String(150), ForeignKey("User.ID"), primary_key=True)
    Challenges_ID = Column(Integer, ForeignKey("Challenges.ID"), primary_key=True)
    Firstblood = Column(Integer, default=0)
    Solved = Column(Integer, default=0)
    Url = Column(String(256))

    user = relationship("User", back_populates="challenges")
    challenge = relationship("Challenge", back_populates="made_by_users")

class FlagSubmission(Base):
    __tablename__ = 'flag_submissions'

    id = Column(Integer, primary_key=True, index=True)
    flag = Column(String(255), index=True)
    challenge_id = Column(Integer, ForeignKey("Challenges.ID"), index=True)
    team_id = Column(Integer, ForeignKey("Teams.ID"), index=True)
    status = Column(String(50), index=True)
    submission_time = Column(DateTime(timezone=True), server_default=func.now())

    challenge = relationship("Challenge", back_populates="flag_submissions")
    team = relationship("Team", back_populates="flag_submissions")

class SharedFlagSubmission(Base):
    __tablename__ = 'shared_flag_submissions'

    id = Column(Integer, primary_key=True, index=True)
    flag = Column(String(255), index=True)
    challenge_id = Column(Integer, ForeignKey("Challenges.ID"), index=True)
    team_id = Column(Integer, ForeignKey("Teams.ID"), index=True)
    original_team_id = Column(Integer, ForeignKey("Teams.ID"), index=True)
    submission_time = Column(DateTime(timezone=True), server_default=func.now())

    challenge = relationship("Challenge", back_populates="shared_flag_submissions")
    team = relationship("Team", foreign_keys=[team_id], back_populates="shared_flag_submissions")
    original_team = relationship("Team", foreign_keys=[original_team_id])

# class StaticFlag(Base):
#     __tablename__ = 'static_flags'

#     id = Column(Integer, primary_key=True, index=True)
#     flag = Column(String(255), unique=True, nullable=False)
#     challenge_id = Column(Integer, ForeignKey("Challenges.ID"), index=True, nullable=False)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())

#     challenge = relationship("Challenge", back_populates="static_flags")

