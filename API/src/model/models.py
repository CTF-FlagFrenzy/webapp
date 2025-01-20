from sqlalchemy import (
    create_engine, Column, String, Integer, ForeignKey, Text, Table, DateTime
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
    Points = Column(Integer, default=0)
    Members = Column(Integer, nullable=False, default=0)
    SharedFlag = Column(Integer, nullable=False, default=0)

    users = relationship("User", back_populates="team")
    flag_submissions = relationship("FlagSubmission", back_populates="team")
    shared_flag_submissions = relationship("SharedFlagSubmission", foreign_keys="[SharedFlagSubmission.team_id]", back_populates="team")
    team_points = relationship("TeamPoints", back_populates="team")

class User(Base):
    """
    Database model for users.
    """
    __tablename__ = "User"

    ID = Column(String(150), primary_key=True)
    Nickname = Column(String(50), nullable=False)
    Points = Column(Integer, default=0)
    TeamsID = Column(Integer, ForeignKey("Teams.ID"), nullable=True)
    Disabled = Column(Integer, nullable=False, default=0)
    Email = Column(String(50), nullable=False)
    Avatar = Column(String(100), nullable=True, default=None)

    team = relationship("Team", back_populates="users")
    challenges = relationship("UserMadeChallenge", back_populates="user")

class Challenge(Base):
    """
    Database model for challenges.
    """
    __tablename__ = "Challenges"

    ID = Column(Integer, primary_key=True, autoincrement=True)
    ChallengeName = Column(String(100), nullable=False, unique=True)
    FormatedChallengeName = Column(String(100), nullable=False, unique=True)
    Categorie = Column(String(45), nullable=False)
    Hintcount = Column(Integer, default=0)
    Points = Column(Integer, default=100)
    Description = Column(Text, nullable=False)
    Difficulty = Column(String(50), nullable=False)
    Static = Column(Integer, default=0)
    Chain = Column(Integer, default=0)
    Hint1 = Column(Text, nullable=True)
    Hint2 = Column(Text, nullable=True)
    Hint3 = Column(Text, nullable=True)

    made_by_users = relationship("UserMadeChallenge", back_populates="challenge")
    flag_submissions = relationship("FlagSubmission", back_populates="challenge")
    shared_flag_submissions = relationship("SharedFlagSubmission", back_populates="challenge")
    static_flags = relationship("StaticFlag", back_populates="challenge")

class UserMadeChallenge(Base):
    """
    Database model for user-made challenges.
    """
    __tablename__ = "User_made_Challenges"

    User_ID = Column(String(150), ForeignKey("User.ID"), primary_key=True)
    Challenges_ID = Column(Integer, ForeignKey("Challenges.ID"), primary_key=True)
    Firstblood = Column(Integer, default=0)
    Solved = Column(Integer, default=0)

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

class StaticFlag(Base):
    __tablename__ = 'static_flags'

    id = Column(Integer, primary_key=True, index=True)
    flag = Column(String(255), unique=True, nullable=False)
    challenge_id = Column(Integer, ForeignKey("Challenges.ID"), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    challenge = relationship("Challenge", back_populates="static_flags")

class TeamPoints(Base):
    __tablename__ = 'team_points'

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("Teams.ID"), index=True)
    points = Column(Integer, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    team = relationship("Team", back_populates="team_points")