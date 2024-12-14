from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import (
    create_engine, Column, String, Integer, ForeignKey, Text, Table
)
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base
from sqlalchemy.exc import IntegrityError
from typing import Optional
from model.models import User, Team, Challenge, UserMadeChallenge
from model.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict
import random
import string

app = FastAPI()

# --------------------- MIDDLEWARE -----------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------- SCHEMAS -----------------------

class TeamCreate(BaseModel):
    """
    Schema for creating a new team.
    """
    Teamname: str
    Password: str


class UserCreate(BaseModel):
    """
    Schema for creating a new user.
    """
    ID: str
    Email: str

class TeamJoin(BaseModel):
    """
    Schema for teamjoin .
    """
    Teamname: str
    Password: str
    
class ChallengeCreate(BaseModel):
    """
    Schema for creating a new challenge.
    """
    ChallengeName: str
    Categorie: str
    Points: int = 100
    Static: str
    Description: str
    Difficulty: str = 'Easy'
    Hint1: Optional[str] = None
    Hint2: Optional[str] = None
    Hint3: Optional[str] = None
    Chain: Optional[str] = None


class UserMadeChallengeCreate(BaseModel):
    """
    Schema for creating a new user-made challenge.
    """
    User_ID: str
    Challenges_ID: int


class UserMadeChallengeUpdate(BaseModel):
    """
    Schema for updating a user-made challenge.
    """
    Firstblood: int
    Solved: int
    
class TeamResponse(BaseModel):
    ID: int
    Teamname: str
    Points: int
    Members: int

class ChallengeResponse(BaseModel):
    ID: int
    ChallengeName: str
    Categorie: str
    Hintcount: int
    Points: int
    Description: str
    Difficulty: str
    Chain: Optional[str] = None
    class Config:
        from_attributes = True
   

# --------------------- DEPENDENCIES -----------------------

def get_db():
    """
    Dependency to get a SQLAlchemy DB session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def generate_random_key(length: int = 24) -> str:
    """
    Generate a random alphanumeric key of the given length.
    """
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def generate_random_username(length=8):
    """
    Generates a random username.
    
    :param length: The length of the random part of the name. Default is 8 characters.
    :return: A randomly generated username.
    """
    # Lists of possible prefixes and suffixes for more variation
    prefixes = ["Cool", "Dark", "Fast", "Lucky", "Swift", "Epic", "Nova"]
    suffixes = [" Hunter", " Rider", " Slayer", " Master", " Player", " Wizard", " Shadow"]
    
    # Randomly select a prefix and suffix
    prefix = random.choice(prefixes)
    suffix = random.choice(suffixes)
    

    # Combine prefix, random string, and suffix
    username = f"{prefix}{suffix}"
    
    return username

# --------------------- TEAMS -----------------------
@app.get("/teams/", response_model=list[TeamResponse])
def get_teams(db: Session = Depends(get_db)):
    """
    Retrieve all teams from the database.
    """
    teams = db.query(Team).all()
    return teams


@app.get("/teams/{team_id}", response_model=TeamResponse)
def get_team(team_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific team by ID.
    """
    team = db.query(Team).filter(Team.ID == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

@app.get("/teams/members/{user_id}")
def get_team_members(user_id: str, db: Session = Depends(get_db)):
    """
    Retrieve the IDs and Nicknames of all members of the team of the given user.
    """
    # Find the user by ID
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the user belongs to a team
    if not user.TeamsID:
        raise HTTPException(status_code=400, detail="User is not in a team")

    # Retrieve all members of the user's team
    team_members = db.query(User.ID, User.Nickname).filter(User.TeamsID == user.TeamsID).all()

    # Convert the result to a list of dictionaries
    members_list = [{"ID": member.ID, "Nickname": member.Nickname} for member in team_members]

    return members_list


@app.post("/teams/", response_model=TeamResponse)
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    """
    Create a new team with a unique key.
    """
    team_key = generate_random_key()
    db_team = Team(Teamkey=team_key, **team.dict())
    try:
        db.add(db_team)
        db.commit()
        db.refresh(db_team)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400, detail="Team with this name already exists."
        )
    except Exception as ex:
        raise HTTPException(status_code=422, detail=str(ex))
    return db_team


@app.put("/teams/{team_id}", response_model=TeamResponse)
def update_team(team_id: int, team_update: TeamCreate, db: Session = Depends(get_db)):
    """
    Update an existing team's details by ID.
    """
    team = db.query(Team).filter(Team.ID == team_id).first()
    sameName = db.query(Team).filter(Team.Teamname == team_update.Teamname).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if sameName:
        raise HTTPException(status_code=400, detail="Team already exists")

    team.Teamname = team_update.Teamname
    team.Password = team_update.Password
    db.commit()
    db.refresh(team)
    return team


@app.delete("/teams/{team_id}")
def delete_team(team_id: int, db: Session = Depends(get_db)):
    """
    Delete a team by ID and update associated users' TeamsID to null.
    """
    team = db.query(Team).filter(Team.ID == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    # Set TeamsID to null for all users in the team
    users_in_team = db.query(User).filter(User.TeamsID == team_id).all()
    for user in users_in_team:
        user.TeamsID = None

    db.delete(team)
    db.commit()
    return {"detail": "Team deleted successfully and associated users' team ID set to null"}

# --------------------- USERS -----------------------
@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    """
    Retrieve all users from the database.
    """
    users = db.query(User).all()
    return users


@app.get("/users/{user_id}")
def get_user(user_id: str, db: Session = Depends(get_db)):
    """
    Retrieve a specific user by ID.
    """
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user.
    """
    nickname = generate_random_username()
    images = ["Anonymous.png", "Hacker.png", "Hero.png", "logo.png", "Queen.png", "Spy.png", "Warrior.png"]
    avatar = random.choice(images)
    db_user = User(Nickname=nickname, Avatar=avatar, **user.dict())
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400, detail="User with this nickname already exists."
        )
    except Exception as ex:
        raise HTTPException(status_code=422, detail=str(ex))
    return db_user


@app.put("/users/{user_id}")
def update_user(user_id: str, user_nickname:str, user_avatar:str, db: Session = Depends(get_db)):
    """
    Update an existing user's details by ID.
    """
    try:
        user = db.query(User).filter(User.ID == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.Nickname = user_nickname
        user.Avatar = user_avatar
      
        db.commit()
        db.refresh(user)
        return user
    except IntegrityError:
        raise HTTPException(status_code=400, detail="This nickname already exists.")
    except Exception as ex:
        db.rollback()
        raise HTTPException(status_code=422, detail=str(ex))


@app.put("/users/team/{user_id}")
def update_user_team(
    user_id: str, userInput:TeamJoin, db: Session = Depends(get_db)
):
    """
    Assign or update the team membership of a user, validating the team password.
    """
    try:
        user = db.query(User).filter(User.ID == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        team = db.query(Team).filter(Team.Teamname == userInput.Teamname).first()
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")

        if team.Password != userInput.Password:
            raise HTTPException(status_code=400, detail="Invalid team password")

        if user.TeamsID:
            old_team = db.query(Team).filter(Team.ID == user.TeamsID).first()
            if old_team and old_team.Members > 0:
                old_team.Members -= 1

        if team.Members >= 4:
            raise HTTPException(status_code=400, detail="Team already has 4 members")

        team.Members += 1
        user.TeamsID = team.ID

        db.commit()
        db.refresh(user)  
        db.refresh(user)  

        db.refresh(user)

        return {"message": "User updated successfully", "user": user}
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        db.rollback()
        raise HTTPException(status_code=500, detail="An unexpected error occurred")


@app.put("/users/disabled/{user_id}")
def update_user_disabled(user_id: str, user_disable: int, db: Session = Depends(get_db)):
    """
    Enable or disable a user's account.
    """
    try:
        user = db.query(User).filter(User.ID == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.Disabled = user_disable

        db.commit()
        db.refresh(user)
        return user
    except IntegrityError:
        raise HTTPException(status_code=400, detail="This nickname already exists.")
    except Exception as ex:
        db.rollback()
        raise HTTPException(status_code=422, detail=str(ex))


@app.put("/users/points/{user_id}")
def update_user_points(user_id: str, points: int, db: Session = Depends(get_db)):
    """
    Update a user's and their team's points.
    """
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    team = db.query(Team).filter(Team.ID == user.TeamsID).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    team.Points += points
    user.Points += points

    db.commit()
    db.refresh(user)
    return {"detail": "User points updated successfully", "new_points": user.Points}


@app.delete("/users/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):
    """
    Delete a user by ID and clean up related data.
    """
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user_made_challenges = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.User_ID == user_id
    ).all()
    for umc in user_made_challenges:
        db.delete(umc)

    if user.TeamsID:
        team = db.query(Team).filter(Team.ID == user.TeamsID).first()
        if team:
            team.Members -= 1

    db.delete(user)
    db.commit()
    return {"detail": "User deleted successfully"}

# --------------------- CHALLENGES -----------------------

@app.get("/challenges/")
def get_challenges(db: Session = Depends(get_db)):
    """
    Retrieve all challenges, sorted by difficulty, and grouped by category.
    """
    challenges = db.query(Challenge).all()

    difficulty_order = {'Easy': 1, 'Medium': 2, 'Hard': 3, 'Expert': 4}
    challenges.sort(key=lambda ch: difficulty_order.get(ch.Difficulty, 5))

    categorized_challenges = defaultdict(list)
    for challenge in challenges:
        challenge_data = ChallengeResponse.from_orm(challenge)
        categorized_challenges[challenge.Categorie].append(challenge_data)

    categorized_challenges_json = {
        category: [challenge.dict() for challenge in challenge_list]
        for category, challenge_list in categorized_challenges.items()
    }

    return categorized_challenges_json


@app.get("/challenges/{challenge_id}", response_model=ChallengeResponse)
def get_challenge(challenge_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific challenge by ID.
    """
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return challenge


@app.get("/challenges/hints/{challenge_id}")
def get_challenge_hints(challenge_id: int, db: Session = Depends(get_db)):
    """
    Retrieve hints for a specific challenge by ID.
    """
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return {
        'Hint1': challenge.Hint1,
        'Hint2': challenge.Hint2,
        'Hint3': challenge.Hint3
    }


@app.post("/challenges/", response_model=ChallengeResponse)
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


@app.put("/challenges/{challenge_id}", response_model=ChallengeResponse)
def update_challenge(
    challenge_id: int, challenge_update: ChallengeCreate, db: Session = Depends(get_db)
):
    """
    Update an existing challenge by ID.
    """
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")

    # Update fields
    challenge.ChallengeName = challenge_update.ChallengeName
    challenge.Categorie = challenge_update.Categorie
    challenge.Points = challenge_update.Points
    challenge.Description = challenge_update.Description
    challenge.Difficulty = challenge_update.Difficulty
    challenge.Static = challenge_update.Static
    challenge.Chain = challenge_update.Chain
    challenge.Hint1 = challenge_update.Hint1
    challenge.Hint2 = challenge_update.Hint2
    challenge.Hint3 = challenge_update.Hint3

    try:
        db.commit()
        db.refresh(challenge)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400, detail="Challenge with this name already exists."
        )
    except Exception as ex:
        db.rollback()
        raise HTTPException(status_code=422, detail=str(ex))
    return challenge


@app.delete("/challenges/{challenge_id}")
def delete_challenge(challenge_id: int, db: Session = Depends(get_db)):
    """
    Delete a challenge by ID and related UserMadeChallenge entries.
    """
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")

    # Delete related UserMadeChallenge entries
    user_made_challenges = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.Challenges_ID == challenge_id
    ).all()
    for umc in user_made_challenges:
        db.delete(umc)

    db.delete(challenge)
    db.commit()
    return {"detail": "Challenge deleted successfully"}


@app.put("/challenges/hintcount/{challenge_id}")
def update_challenge_hintcount(challenge_id: int, db: Session = Depends(get_db)):
    """
    Increment the hint count for a specific challenge by ID.
    """
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")

    challenge.Hintcount += 1

    db.commit()
    db.refresh(challenge)
    return {
        "detail": "Challenge hint count updated successfully",
        "new_hintcount": challenge.Hintcount,
    }
    
# --------------------- USER MADE CHALLENGES -----------------------

@app.get("/user-made-challenges/")
def get_user_made_challenges(db: Session = Depends(get_db)):
    """
    Retrieve all user-made challenges.
    """
    user_made_challenges = db.query(UserMadeChallenge).all()
    return user_made_challenges


@app.get("/user-made-challenges/{user_id}/{challenge_id}")
def get_user_made_challenge(user_id: int, challenge_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific user-made challenge by user ID and challenge ID.
    """
    user_made_challenge = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.User_ID == user_id,
        UserMadeChallenge.Challenges_ID == challenge_id
    ).first()
    if not user_made_challenge:
        raise HTTPException(status_code=404, detail="User-made challenge not found")
    return user_made_challenge


@app.get("/user-made-challenges/{user_id}")
def get_user_made_challenges_by_user(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieve all challenges made by a specific user.
    """
    user_made_challenges = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.User_ID == user_id
    ).all()
    if not user_made_challenges:
        raise HTTPException(status_code=404, detail="User-made challenges not found")
    return user_made_challenges


@app.post("/user-made-challenges/")
def create_user_made_challenge(user_made_challenge: UserMadeChallengeCreate, db: Session = Depends(get_db)):
    """
    Create a new user-made challenge.
    """
    db_user_made_challenge = UserMadeChallenge(**user_made_challenge.dict())
    try:
        db.add(db_user_made_challenge)
        db.commit()
        db.refresh(db_user_made_challenge)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400, detail="This user-challenge combination already exists."
        )
    except Exception as ex:
        raise HTTPException(status_code=422, detail=str(ex))
    return db_user_made_challenge


@app.put("/user-made-challenges/{user_id}/{challenge_id}")
def update_user_made_challenge(
    user_id: int,
    challenge_id: int,
    update_data: UserMadeChallengeUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a specific user-made challenge by user ID and challenge ID.
    """
    user_made_challenge = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.User_ID == user_id,
        UserMadeChallenge.Challenges_ID == challenge_id
    ).first()
    if not user_made_challenge:
        raise HTTPException(status_code=404, detail="User-made challenge not found")

    # Update fields
    user_made_challenge.Firstblood = update_data.Firstblood
    user_made_challenge.Solved = update_data.Solved

    db.commit()
    db.refresh(user_made_challenge)
    return user_made_challenge


@app.delete("/user-made-challenges/{user_id}/{challenge_id}")
def delete_user_made_challenge(user_id: int, challenge_id: int, db: Session = Depends(get_db)):
    """
    Delete a specific user-made challenge by user ID and challenge ID.
    """
    user_made_challenge = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.User_ID == user_id,
        UserMadeChallenge.Challenges_ID == challenge_id
    ).first()
    if not user_made_challenge:
        raise HTTPException(status_code=404, detail="User-made challenge not found")

    db.delete(user_made_challenge)
    db.commit()
    return {"detail": "User-made challenge deleted successfully"}


@app.get("/deploy/{user_id}/{challenge_id}")
def get_deploy_challenge(user_id: int, challenge_id: int, db: Session = Depends(get_db)):
    """
    Retrieve deployment details for a specific challenge and user.
    """
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    user = db.query(User).filter(User.ID == user_id).first()

    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge was not found")
    if not user:
        raise HTTPException(status_code=404, detail="User was not found")

    team = db.query(Team).filter(Team.ID == user.TeamsID).first()

    return {
        "challengeName": challenge.ChallengeName,
        "challengeCategory": challenge.Categorie,
        "challengeStatic": challenge.Static,
        "teamName": team.Teamname if team else None,
        "teamKey": team.Teamkey if team else None,
    }