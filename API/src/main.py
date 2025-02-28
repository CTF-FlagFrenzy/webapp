from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import (
    create_engine, Column, String, Integer, ForeignKey, Text, Table, Time
)
import asyncio
from zoneinfo import ZoneInfo
from sqlalchemy import extract
from sqlalchemy.sql import cast
import hashlib
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base, aliased
from sqlalchemy.exc import IntegrityError
from typing import Optional
from model.models import User, Team, Challenge, UserMadeChallenge, FlagSubmission, SharedFlagSubmission, TeamPoints, TeamPointsUser
from model.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict
import random
import string
import os
import subprocess
from datetime import datetime, time, date, timezone
from typing import Dict

from datetime import datetime, timedelta

import subprocess
import json

start_time = time(9, 0)  
end_time = time(15, 0) 
allowed_date = date(2025, 3, 20)
vienna_timezone = ZoneInfo("Europe/Vienna")
def is_not_allowed_time():
    current_time = datetime.now(vienna_timezone).time()  
    current_date = datetime.now().date()  
    if current_date == allowed_date and (start_time <= current_time <= end_time):
        return True  


app = FastAPI()

def insert_teampoints():
    db = SessionLocal()
    try:
        teams = db.query(Team).all()  
        
        for team in teams:
            new_teampoints = TeamPointsUser(
                TeamID=team.ID,
                Points=team.Points,
                Teamname=team.Teamname,
                Time=datetime.now(vienna_timezone)
            )
            db.add(new_teampoints)
        
        db.commit()  
    except Exception as e:
        db.rollback()  
        print(f"Fehler beim Einfügen der Team-Punkte: {e}")
    finally:
        db.close()


async def background_task():
    while True:
        now = datetime.now(vienna_timezone).time()
        current_date = datetime.now().date()  
        if current_date == allowed_date and now >= time(9, 0):  
            insert_teampoints()
        await asyncio.sleep(6)  


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(background_task())

# --------------------- MIDDLEWARE -----------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------- SCHEMAS -----------------------

class StaticFlagCreate(BaseModel):
    flag: str
    challenge_id: int

class TeamCreate(BaseModel):
    """
    Schema for creating a new team.
    """
    Teamname: str
    Password: str
    
class TeamUpdate(BaseModel):
    """
    Schema for updating a team.
    """
    Teamname: str
    Password: str
    Points: int


class UserCreate(BaseModel):
    """
    Schema for creating a new user.
    """
    ID: str
    Email: str
    
class UserUpdate(BaseModel):
    """
    Schema for creating a new user.
    """
    Nickname: str
    Avatar: str

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
    FormatedChallengeName: str
    Categorie: str
    Points: int = 100
    Static: str
    Description: str
    Difficulty: str = 'Easy'
    IsStatic: int = 0
    Hint1: Optional[str] = None
    Hint2: Optional[str] = None
    Hint3: Optional[str] = None
    Chain: Optional[int] = None


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
    Solved: int
    
class TeamResponse(BaseModel):
    ID: int
    Teamname: str
    Points: float
    Members: int
    SharedFlag: int
    Disabled: int
    FirstBloods: int
    TeamLeader: str

class TeamPointsCreate(BaseModel):
    TeamID: int
    Points: float
    
class ChallengeResponse(BaseModel):
    ID: int
    ChallengeName: str
    Categorie: str
    Points: int
    Description: str
    Difficulty: str
    Chain: Optional[int] = None
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
    random_number = random.randint(1, 10000)

    # Combine prefix, random string, and suffix
    username = f"{prefix}{suffix}#{random_number}"
    
    return username

def is_challenge_solved_by_team(team_id: int, challenge_id: int, db: Session):
    """
    Check if the referenced challenge is solved by any team member.
    """
    team_members = db.query(User).filter(User.TeamsID == team_id).all()
    for member in team_members:
        solved_challenge = db.query(UserMadeChallenge).filter(
            UserMadeChallenge.User_ID == member.ID,
            UserMadeChallenge.Challenges_ID == challenge_id,
            UserMadeChallenge.Solved == 1
        ).first()
        if solved_challenge:
            return True
    return False

# --------------------- TEAMS -----------------------
@app.get("/teams/", response_model=list[TeamResponse])
def get_teams(db: Session = Depends(get_db)):
    """
    Retrieve all teams from the database.
    """
    teams = db.query(Team).all()
    return teams

@app.get("/teams/top10", response_model=list[TeamResponse])
def get_top_teams(db: Session = Depends(get_db)):
    """
    Retrieve the top 10 teams with the most points from the database.
    """
    # Query teams ordered by points in descending order and limit to 10
    top_teams = (
        db.query(Team)
        .order_by(Team.Points.desc())  # Assuming 'Points' is the field representing team points
        .limit(10)
        .all()
    )
    
    if not top_teams:
        raise HTTPException(status_code=404, detail="No teams found")
    
    return top_teams

@app.get("/teams/{team_id}", response_model=TeamResponse)
def get_team(team_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific team by ID.
    """
    team = db.query(Team).filter(Team.ID == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

@app.get("/team/members")
def get_all_teammembers(db: Session = Depends(get_db)):
    """
    Retrieve all members for every team.
    """
    teams = db.query(Team).all()

    if not teams:
        raise HTTPException(status_code=404, detail="No teams found")

    teams_list = []
    for team in teams:
        # Get all members of the respective team
        team_members = db.query(User.ID, User.Nickname).filter(User.TeamsID == team.ID).all()

        # Convert the members to a dictionary format
        members_list = [{"ID": member.ID, "Nickname": member.Nickname} for member in team_members]

        # Add the team with members to the list
        teams_list.append({
            "TeamsID": team.ID,
            "Teamname": team.Teamname,
            "Points": team.Points,
            "Members": members_list
        })

    return teams_list


@app.get("/teams/members/{user_id}")
def get_team_members(user_id: str, db: Session = Depends(get_db)):
    """
    Retrieve the IDs and Nicknames of all members of the team of the given user,
    along with the TeamsID and Teamname of the team.
    """
    # Find the user by ID
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the user belongs to a team
    if not user.TeamsID:
        raise HTTPException(status_code=400, detail="User is not in a team")

    # Retrieve the team information
    team = db.query(Team).filter(Team.ID == user.TeamsID).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    # Retrieve all members of the user's team
    team_members = db.query(User.ID, User.Nickname).filter(User.TeamsID == user.TeamsID).all()

    # Convert the result to a list of dictionaries
    members_list = [{"ID": member.ID, "Nickname": member.Nickname} for member in team_members]

    # Return the response including team details
    return {
        "TeamsID": team.ID,
        "Teamname": team.Teamname,
        "Points": team.Points,
        "Members": members_list
    }



@app.post("/teams/{user_id}", response_model=TeamResponse)
def create_team(user_id: str, team: TeamCreate, db: Session = Depends(get_db)):
    """
    Create a new team with a unique key.
    """
    if is_not_allowed_time():
        raise HTTPException(status_code=403, detail="The Event started")

    existing_team = db.query(Team).filter(Team.TeamLeader == user_id).first()
    if existing_team:
        raise HTTPException(status_code=400, detail="User is already a team leader.")

    hashed_password = hashlib.sha256(team.Password.encode()).hexdigest()
    team_key = generate_random_key()
    db_team = Team(
        Teamkey=team_key, 
        **team.dict(exclude={"Password"}), 
        Password=hashed_password, 
        TeamLeader=user_id
    )
    try:
        db.add(db_team)
        db.commit()
        db.refresh(db_team)
        # Add and commit to the database
        new_teampoints = TeamPoints(
        TeamID=db_team.ID,
        Points=0,
        Teamname=db_team.Teamname,
        Time=datetime.now(vienna_timezone)
    )
        new_teampoints_users = TeamPointsUser(
        TeamID=db_team.ID,
        Points=0,
        Teamname=db_team.Teamname,
        Time=datetime.now(vienna_timezone)
    )
        db.add(new_teampoints_users)
        db.add(new_teampoints)
        db.commit()
        db.refresh(new_teampoints)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400, detail="Team with this name already exists."
        )
    except Exception as ex:
        raise HTTPException(status_code=422, detail=str(ex))
    API_KEY = os.getenv("API_KEY", "default_secure_key")

    command = f"""
    curl -k -X POST "https://challenge.web.ctf.htl-villach.at/teamkey" \
    -H "Authorization: Bearer {API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{{"teamid":"{db_team.ID}", "teamkey":"{db_team.Teamkey}"}}'
    """

    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    print(result)
    return db_team


@app.put("/teams/{team_id}/{user_id}",  response_model=TeamResponse)
def update_team(team_id: int, user_id: str, team_update: TeamUpdate, db: Session = Depends(get_db)):
    """
    Update an existing team's details by ID.
    """
    if is_not_allowed_time():
        raise HTTPException(status_code=403, detail="The Event started")
    team = db.query(Team).filter(Team.ID == team_id).first()
    user = db.query(User).filter(User.ID == user_id).first()
    userTeam = db.query(User).filter(team.ID == user.TeamsID).first()
    sameName = db.query(Team).filter(
    Team.Teamname == team_update.Teamname,
    Team.ID != team_id
    ).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if sameName :
        raise HTTPException(status_code=400, detail="Team already exists")
    if userTeam:
        team.Teamname = team_update.Teamname
        team.Password = hashlib.sha256(team_update.Password.encode()).hexdigest()
        team.Points = team_update.Points
        db.commit()
        db.refresh(team)
    return team


@app.delete("/teams/{team_id}/{user_id}")
def delete_team(team_id: int, user_id: str, db: Session = Depends(get_db)):
    """
    Delete a team by ID and update associated users' TeamsID to null.
    """
    if is_not_allowed_time():
        raise HTTPException(status_code=403, detail="The Event started")

    team = db.query(Team).filter(Team.ID == team_id).first()
    user = db.query(User).filter(User.ID == user_id).first()

    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.TeamLeader != user.ID:
        raise HTTPException(status_code=403, detail="You have no permission to delete this team")

    db.query(TeamPoints).filter(TeamPoints.TeamID == team_id).delete()
    db.query(TeamPointsUser).filter(TeamPointsUser.TeamID == team_id).delete()
    db.query(User).filter(User.TeamsID == team_id).update({User.Points: 0})

    db.query(User).filter(User.TeamsID == team_id).update({User.TeamsID: None})

    db.delete(team)
    db.commit()

    return {"detail": "Team and all related TeamPoints deleted successfully"}


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
    images = ["Anonymous", "Hacker", "Hero", "Queen", "Spy", "Warrior"]
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
def update_user(user_id: str, user_update:UserUpdate, db: Session = Depends(get_db)):
    """
    Update an existing user's details by ID.
    """
    try:
        user = db.query(User).filter(User.ID == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.Nickname = user_update.Nickname
        user.Avatar = user_update.Avatar
      
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
        if is_not_allowed_time():
            raise HTTPException(status_code=403, detail="The Event started")
        user = db.query(User).filter(User.ID == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        team = db.query(Team).filter(Team.Teamname == userInput.Teamname).first()
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")

        if team.Password != hashlib.sha256(userInput.Password.encode()).hexdigest():
            print(team.Password )
            print(hashlib.sha256(userInput.Password.encode()).hexdigest())
            raise HTTPException(status_code=400, detail="Invalid team password")
        existing_team = db.query(Team).filter(Team.TeamLeader == user_id).first()
        if existing_team and existing_team.ID != team.ID:
            raise HTTPException(status_code=400, detail="You cannot join another team while being a Team Leader")
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

@app.get("/challenges/{teams_id}")
def get_challenges(teams_id: int,db: Session = Depends(get_db)):
    """
    Retrieve all challenges, sorted by difficulty, and grouped by category.
    """
    # if not is_not_allowed_time():
    #     raise HTTPException(status_code=403, detail="The Event hasn't started yet")
    team = db.query(Team).filter(Team.ID == teams_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    challenges = db.query(Challenge).all()

    # Define difficulty order for sorting
    difficulty_order = {'Easy': 1, 'Medium': 2, 'Hard': 3, 'Expert': 4}
    challenges.sort(key=lambda ch: difficulty_order.get(ch.Difficulty, 5))

    # Group challenges by category
    categorized_challenges = defaultdict(list)
    for challenge in challenges:
        categorized_challenges[challenge.Categorie].append(challenge)

    # Get all users in the team
    users = db.query(User).filter(User.TeamsID == teams_id).all()
    user_ids = [user.ID for user in users]

    # Get all user-made challenges solved by these users
    solved_challenges = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.User_ID.in_(user_ids),
        UserMadeChallenge.Solved == True  # Assuming there's a Solved column indicating if the challenge is solved
    ).all()
    solved_challenge_ids = {umc.Challenges_ID for umc in solved_challenges}

    # Convert to JSON format with category names as keys and include 'solved' status
    categorized_challenges_json = {}
    for category, challenges in categorized_challenges.items():
        challenges_json = [
            {
                "ID": challenge.ID,
                "ChallengeName": challenge.ChallengeName,
                "Difficulty": challenge.Difficulty,
                "Category": challenge.Categorie,
                "Description": challenge.Description,
                "Chain": challenge.Chain,
                "Points": challenge.Points,
                "IsStatic": challenge.IsStatic,
                "Solved": challenge.ID in solved_challenge_ids
            }
            for challenge in challenges
        ]
        
        # Sort challenges so that solved ones come last
        challenges_json.sort(key=lambda ch: ch['Solved'])

        categorized_challenges_json[category] = challenges_json

    return categorized_challenges_json


@app.get("/challenges/{challenge_id}")
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

    current_time = datetime.now(vienna_timezone).time()
    
    # Define the times when hints are available
    hint1_time = datetime.strptime("10:00", "%H:%M").time()
    hint2_time = datetime.strptime("11:00", "%H:%M").time()
    hint3_time = datetime.strptime("12:00", "%H:%M").time()

    hints = {
        'Hint1': challenge.Hint1 if current_time >= hint1_time else "Hint1 wird um 10 Uhr verfügbar sein.",
        'Hint2': challenge.Hint2 if current_time >= hint2_time else "Hint2 wird um 11 Uhr verfügbar sein.",
        'Hint3': challenge.Hint3 if current_time >= hint3_time else "Hint3 wird um 12 Uhr verfügbar sein."
    }
    
    return hints


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
    challenge.IsStatic = challenge_update.IsStatic
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

    
# --------------------- USER MADE CHALLENGES -----------------------

@app.get("/user-made-challenges/")
def get_users_made_challenges(db: Session = Depends(get_db)):
    """
    Retrieve all user-made challenges.
    """
    user_made_challenges = db.query(UserMadeChallenge).all()
    return user_made_challenges

@app.get("/user-made-challenges/notsolved")
def users_made_challenges_notsolved(db: Session = Depends(get_db)):
    """
    Retrieve all user-made challenges which are not solved, including the Team name.
    """
    user_made_challenges = (
    db.query(
        UserMadeChallenge.User_ID,
        UserMadeChallenge.Challenges_ID,
        UserMadeChallenge.Firstblood,
        UserMadeChallenge.Url,
        Team.Teamname,
        Challenge.ChallengeName  
    )
    .join(User, UserMadeChallenge.User_ID == User.ID)
    .join(Team, User.TeamsID == Team.ID)
    .join(Challenge, UserMadeChallenge.Challenges_ID == Challenge.ID) 
    .filter(UserMadeChallenge.Solved == 0)
    .all()
)

    return [
        {
            "UserID": challenge.User_ID,
            "ChallengeID": challenge.Challenges_ID,
            "Firstblood": challenge.Firstblood,
            "URL": challenge.Url,
            "Teamname": challenge.Teamname,
            "ChallengeName": challenge.ChallengeName  
        }
        for challenge in user_made_challenges
    ]
@app.get("/user-made-challenges/{challenge_id}/solved_by_team/{team_id}")
def is_challenge_solved_by_team_route(challenge_id: int, team_id: int, db: Session = Depends(get_db)):
    if is_challenge_solved_by_team(team_id, challenge_id, db):
        return {"solved": True}
    return {"solved": False}

@app.get("/user-made-challenges/{teams_id}")
def get_user_made_challenges(teams_id: int, db: Session = Depends(get_db)):
    """
    Retrieve all challenges made by users in a specific team.
    """
    # Get all users in the team
    users = db.query(User).filter(User.TeamsID == teams_id).all()
    user_ids = [user.ID for user in users]

    # Get all challenges made by these users
    user_made_challenges = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.User_ID.in_(user_ids)
    ).all()


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
    user_id: str,
    challenge_id: int,
    update_data: UserMadeChallengeUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a specific user-made challenge by user ID and challenge ID.
    """
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")

    if challenge.Chain:
        if not is_challenge_solved_by_team(user.TeamsID, challenge.Chain, db):
            raise HTTPException(status_code=400, detail="Referenced challenge in the chain is not solved yet")

    user_made_challenge = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.User_ID == user_id,
        UserMadeChallenge.Challenges_ID == challenge_id
    ).first()

    if not user_made_challenge:
        raise HTTPException(status_code=404, detail="User-made challenge not found")

    team = db.query(Team).filter(Team.ID == user.TeamsID).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    firstblood = db.query(UserMadeChallenge).filter(UserMadeChallenge.Challenges_ID == challenge_id,
                                                    UserMadeChallenge.Firstblood == 1).first()

    if not firstblood and update_data.Solved == 1:
        user.Points += challenge.Points*0.4
        team.Points += challenge.Points*0.4
        user_made_challenge.Firstblood = 1
        team.FirstBloods += 1
        teampoints = db.query(Team).filter(Team.ID == team.ID).first()
        new_teampoints = TeamPoints(
            TeamID=teampoints.ID,
            Points=teampoints.Points,
            Teamname=team.Teamname,
            Time=datetime.now(vienna_timezone)
        )
        db.add(new_teampoints)
        db.commit()
        db.refresh(new_teampoints)
        db.refresh(team)
        

    user_made_challenge.Solved = update_data.Solved

    db.commit()
    db.refresh(user_made_challenge)
    db.refresh(user)

    return user_made_challenge


@app.delete("/user-made-challenges/{user_id}/{challenge_id}")
def delete_user_made_challenge(user_id: str, challenge_id: int, db: Session = Depends(get_db)):
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

# --------------------- TEAM POINTS -----------------------

@app.get("/teamPoints/{user_id}")
def get_teampoints_users(user_id:str, db: Session = Depends(get_db)):
    """
    Retrieve all teamPoints over time with a time limit for classes.
    """
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")   
    
    if "2" in user_id or "1" in user_id:
        teamPoints = db.query(TeamPointsUser).filter(
            cast(TeamPointsUser.Time, Time) < "11:00:00"
        ).all()
    else:
        teamPoints = db.query(TeamPointsUser).filter(
            cast(TeamPointsUser.Time, Time) < "14:30:00"
        ).all()
    return teamPoints

@app.get("/teamPoints")
def get_all_teampoints(db: Session = Depends(get_db)):
    """
    Retrieve all teamPoints over time.
    """
    teamPoints = db.query(TeamPoints).all()
    return teamPoints


@app.post("/teamPoints/")
def create_team_points(teampoints: TeamPointsCreate, db: Session = Depends(get_db)):
    # Validate the time format
    team = db.query(Team).filter(Team.ID == teampoints.TeamID).first()
    
     
    # Create a new TeamPoints object
    new_teampoints = TeamPoints(
        TeamID=teampoints.TeamID,
        Points=teampoints.Points,
        Teamname=team.Teamname,
        Time=datetime.now(vienna_timezone)
    )
    
    # Add and commit to the database
    db.add(new_teampoints)
    db.commit()
    db.refresh(new_teampoints)
    
    return new_teampoints

# --------------------- DEPLOY -----------------------
@app.get("/deploy/{user_id}/{challenge_id}")
def get_deploy_challenge(user_id: str, challenge_id: int, db: Session = Depends(get_db)):
    """
    Retrieve deployment details for a specific challenge and user.
    """
    try:
        challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
        user = db.query(User).filter(User.ID == user_id).first()
        user_made_challenge = db.query(UserMadeChallenge).filter(
            UserMadeChallenge.User_ID == user_id,
            UserMadeChallenge.Challenges_ID == challenge_id).first()
        if not challenge:
            raise HTTPException(status_code=404, detail="Challenge was not found")
        if not user:
            raise HTTPException(status_code=404, detail="User was not found")

        API_KEY = os.getenv("API_KEY", "default_secure_key")
        team = db.query(Team).filter(Team.ID == user.TeamsID).first()
        team_id = str(team.ID)

        command = f"""
        curl -k -X POST "https://challenge.web.ctf.htl-villach.at/deploy" \
        -H "Authorization: Bearer {API_KEY}" \
        -H "Content-Type: application/json" \
        -d '{{"teamid":"{team_id}", "challenge":"{challenge.FormatedChallengeName}"}}'
        """
        
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        parsed_data = json.loads(result.stdout.strip())
        url = parsed_data["url"]
        user_made_challenge.Url = url
        db.commit()
        db.refresh(user_made_challenge)
        return result.stdout.strip()
    except Exception as ex:
        return {"error": str(ex)}

# --------------------- DEPROVISION -----------------------
@app.post("/deprovision/{user_id}/{challenge_id}")
def deprovision_challenge(user_id: str, challenge_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.ID == user_id).first()
    team = db.query(Team).filter(Team.ID == user.TeamsID).first()
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    API_KEY = os.getenv("API_KEY", "default_secure_key")
    command = f"""
    curl -k -X POST "https://challenge.web.ctf.htl-villach.at/deprovision" \
    -H "Authorization: Bearer {API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{{"teamid":"{team.ID}", "challenge":"{challenge.FormatedChallengeName}"}}'
    """
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    user_made_challenge = db.query(UserMadeChallenge).filter(
        UserMadeChallenge.User_ID == user.ID,
        UserMadeChallenge.Challenges_ID == challenge.ID
    ).first()
    if not user_made_challenge:
        raise HTTPException(status_code=404, detail="User-made challenge not found")

    db.delete(user_made_challenge)
    db.commit()
    return result

# --------------------- ANTI CHEAT -----------------------


def generate_flag(team_key, challenge_flag):
    combined = challenge_flag + team_key
    return hashlib.sha256(combined.encode()).hexdigest()

def calculate_points(base_points, current_time):
    start_time = datetime.strptime("09:00", "%H:%M")
    end_time = datetime.strptime("15:00", "%H:%M")
    total_minutes = (end_time - start_time).seconds // 60  
    
    elapsed_minutes = (current_time - start_time).seconds // 60
    elapsed_minutes = max(0, min(elapsed_minutes, total_minutes))  

    initial_points = base_points * 1.6  
    decay_rate = (initial_points - base_points) / total_minutes  

    current_points = max(base_points, initial_points - decay_rate * elapsed_minutes)
    return round(current_points, 2)

@app.post("/submit_flag/{user_id}/{challenge_id}")
async def submit_flag(user_id: str, challenge_id: int, flag: str, db: Session = Depends(get_db)):

    # Fetch the user, team, and challenge from the database
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        return {"status": "User not found"}
    
    team = db.query(Team).filter(Team.ID == user.TeamsID).first()
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()

    if not team or not challenge:
        return {"status": "Not found"}
    if team.Disabled == 1:
        return {"status": "disabled"}
    # Generate the flag
    if challenge.IsStatic == 0:
        generated_flag = generate_flag(team.Teamkey, challenge.Static)
    else:
        return {"status": "static flag"}

    print(f"Generated flag: {generated_flag}")

    # Normalize the submitted flag by removing spaces
    normalized_flag = flag.replace(" ", "")

    # Validate the submitted flag
    if normalized_flag == "FF{" + generated_flag + "}":
        submission = db.query(FlagSubmission).filter(FlagSubmission.challenge_id == challenge_id, FlagSubmission.team_id == team.ID, FlagSubmission.status == "successful" ).first()
        print(submission)
        if not submission:
            status = 'successful'
            # Log the successful flag submission
            submission_time = datetime.now(vienna_timezone).replace(tzinfo=None)
            new_submission = FlagSubmission(flag=flag, challenge_id=challenge_id, team_id=team.ID, status=status, submission_time=submission_time)
            db.add(new_submission)
            # Calculate points based on submission time
            calculate_point = calculate_points(challenge.Points, submission_time)
            print(f"Calculated points: {calculate_point}")
            user.Points += calculate_point
            team.Points += calculate_point

            db.commit()
            print(f"Logged flag submission: {new_submission}")

            API_KEY = os.getenv("API_KEY", "default_secure_key")
            command = f"""
            curl -k -X POST "https://challenge.web.ctf.htl-villach.at/deprovision" \
            -H "Authorization: Bearer {API_KEY}" \
            -H "Content-Type: application/json" \
            -d '{{"teamid":"{team.ID}", "challenge":"{challenge.FormatedChallengeName}"}}'
            """
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            print(result)
            teampoints = db.query(Team).filter(Team.ID == team.ID).first()
            new_teampoints = TeamPoints(
                TeamID=teampoints.ID,
                Points=teampoints.Points,
                Teamname=team.Teamname,
                Time=datetime.now(vienna_timezone)
            )
            db.add(new_teampoints)
            db.commit()
            db.refresh(new_teampoints)
            db.refresh(team)
        else:
            status = 'already submitted'
    else:
        # Check if the flag already exists in the database
        existing_submission = db.query(FlagSubmission).filter(FlagSubmission.flag == flag, FlagSubmission.status == "successful").first()
        if existing_submission and existing_submission.team_id != team.ID:
            status = 'shared'
            # Log the shared flag submission in the new table
            new_shared_submission = SharedFlagSubmission(
                flag=flag,
                team_id=team.ID,
                challenge_id=challenge_id,
                original_team_id=existing_submission.team_id,
                submission_time=datetime.now(vienna_timezone)
            )
            db.add(new_shared_submission)

            team.SharedFlag += 1
            if team.SharedFlag == 2:
                team.Disabled = 1
                team.Points = 0
            db.commit()
            db.refresh(team)
        else:
            # Apply penalty for incorrect submission
            new_submission = FlagSubmission(flag=flag, challenge_id=challenge_id, team_id=team.ID, status="invalid", submission_time=datetime.now(vienna_timezone))
            db.add(new_submission)
            db.commit()
            incorrect_submissions = db.query(FlagSubmission).filter(
                FlagSubmission.team_id == team.ID,
                FlagSubmission.challenge_id == challenge_id,
                FlagSubmission.status == 'invalid'
            ).count()
            print(incorrect_submissions)
            penalty_percentage = 0
            next_penalty_percentage = 0
            if incorrect_submissions >= 3:
                if incorrect_submissions < 5:
                    penalty_percentage = 5
                    next_penalty_percentage = 10
                elif incorrect_submissions < 7:
                    penalty_percentage = 10
                    next_penalty_percentage = 20
                elif incorrect_submissions < 9:
                    penalty_percentage = 20
                    next_penalty_percentage = 30
                else:
                    penalty_percentage = 30
                    next_penalty_percentage = 30

            penalty_points = challenge.Points * (penalty_percentage / 100)
            user.Points -= penalty_points
            team.Points -= penalty_points
            teampoints = db.query(Team).filter(Team.ID == team.ID).first()
            new_teampoints = TeamPoints(
                TeamID=teampoints.ID,
                Points=teampoints.Points,
                Teamname=team.Teamname,
                Time=datetime.now(vienna_timezone)
            )
            db.add(new_teampoints)
            db.commit()
            db.refresh(new_teampoints)
            db.refresh(team)
            db.refresh(user)

            status = 'invalid'
            
            return {
                "status": status,
                "message": f"Flag is invalid! Next penalty will be {next_penalty_percentage}% of the challenge points."
            }

    return {"status": status}


@app.get("/admin_panel")
async def admin_panel(db: Session = Depends(get_db)):
    # Fetch valid flag submissions with challenge and team names
    valid_flags = (
        db.query(FlagSubmission, Team.Teamname, Challenge.ChallengeName)
        .join(Team, FlagSubmission.team_id == Team.ID)
        .join(Challenge, FlagSubmission.challenge_id == Challenge.ID)
        .filter(FlagSubmission.status == 'successful')
        .all()
    )
    
    # Structure valid flags with names
    valid_flags_data = [
        {
            "flag": flag,
            "team_name": team_name,
            "challenge_name": challenge_name
        }
        for flag, team_name, challenge_name in valid_flags
    ]
    
    # Alias the Teams table to avoid duplicate alias error
    original_team = aliased(Team)
    
    # Fetch shared flag submissions with team and original team names
    shared_flags = (
        db.query(SharedFlagSubmission, Team.Teamname, Challenge.ChallengeName, original_team.Teamname.label("original_team_name"), Team.SharedFlag)
        .join(Team, SharedFlagSubmission.team_id == Team.ID)
        .join(Challenge, SharedFlagSubmission.challenge_id == Challenge.ID)
        .join(original_team, SharedFlagSubmission.original_team_id == original_team.ID)
        .all()
    )
    
    # Structure shared flags with names
    shared_flags_data = [
        {
            "flag": shared_flag,
            "team_name": team_name,
            "challenge_name": challenge_name,
            "original_team_name": original_team_name,
            "shared_flags": shared
        }
        for shared_flag, team_name, challenge_name, original_team_name, shared in shared_flags
    ]
    
    return {
        "valid_flags": valid_flags_data,
        "shared_flags": shared_flags_data
    }

@app.post("/validate_flag/{challenge_id}/{user_id}")
async def validate_static_flag(flag: str, user_id:str, challenge_id: int, db: Session = Depends(get_db)):
    # Fetch the static flag from the database
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id, Challenge.IsStatic == 1).first()
    if challenge is None:
        return {"status": "invalid", "message": "Challenge is not a static flag"}
    # Normalize the submitted flag by removing spaces
    normalized_flag = flag.replace(" ", "")
    user = db.query(User).filter(User.ID == user_id).first()
    team = db.query(Team).filter(Team.ID == user.TeamsID).first()

    # Validate the submitted flag
    if 'FF{' + challenge.Static + '}' == normalized_flag:
        # Fetch the user and team associated with the flag submission
    
        submission = db.query(FlagSubmission).filter(FlagSubmission.challenge_id == challenge_id, FlagSubmission.team_id == team.ID, FlagSubmission.status == "successful" ).first()
        print(submission)
        if not submission:
            submission_time = datetime.now(vienna_timezone).replace(tzinfo=None)
            print(submission_time)
            # Calculate points based on submission time
            calculate_point = calculate_points(challenge.Points, submission_time)
            print(f"Calculated points: {calculate_point}")
            user.Points += calculate_point
            team.Points += calculate_point

            # Log the successful flag submission
            new_submission = FlagSubmission(flag=flag, challenge_id=challenge_id, team_id=team.ID, status='successful', submission_time=submission_time)
            db.add(new_submission)
            db.commit()
            API_KEY = os.getenv("API_KEY", "default_secure_key")

            command = f"""
            curl -k -X POST "https://challenge.web.ctf.htl-villach.at/deprovision" \
            -H "Authorization: Bearer {API_KEY}" \
            -H "Content-Type: application/json" \
            -d '{{"teamid":"{user.TeamsID}", "challenge":"{challenge.FormatedChallengeName}"}}'
            """

            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            print(result)
            teampoints = db.query(Team).filter(Team.ID == team.ID).first()
            new_teampoints = TeamPoints(
                TeamID=teampoints.ID,
                Points=teampoints.Points,
                Teamname=team.Teamname,
                Time=datetime.now(vienna_timezone)
            )
            db.add(new_teampoints)
            db.commit()
            db.refresh(new_teampoints)
            db.refresh(team)
            return {"status": "successful", "message": "Flag is valid!"}
        else:
            return {"status": "already submitted", "message": "Flag is already submitted!"}
    else:
        new_submission = FlagSubmission(flag=flag, challenge_id=challenge_id, team_id=team.ID, status="invalid", submission_time=datetime.now(vienna_timezone))
        db.add(new_submission)
        db.commit()
            # Apply penalty for incorrect submission
        incorrect_submissions = db.query(FlagSubmission).filter(
            FlagSubmission.team_id == team.ID,
            FlagSubmission.challenge_id == challenge_id,
            FlagSubmission.status == 'invalid'
        ).count()

        penalty_percentage = 0
        next_penalty_percentage = 0
        if incorrect_submissions >= 3:
            if incorrect_submissions < 5:
                penalty_percentage = 5
                next_penalty_percentage = 10
            elif incorrect_submissions < 7:
                penalty_percentage = 10
                next_penalty_percentage = 20
            elif incorrect_submissions < 9:
                penalty_percentage = 20
                next_penalty_percentage = 30
            else:
                penalty_percentage = 30
                next_penalty_percentage = 30

        penalty_points = challenge.Points * (penalty_percentage / 100)
        user.Points -= penalty_points
        team.Points -= penalty_points
        teampoints = db.query(Team).filter(Team.ID == team.ID).first()
        new_teampoints = TeamPoints(
            TeamID=teampoints.ID,
            Points=teampoints.Points,
            Teamname=team.Teamname,
            Time=datetime.now(vienna_timezone)
        )
        db.add(new_teampoints)
        db.commit()
        db.refresh(new_teampoints)
        db.refresh(team)
        db.refresh(user)

        status = 'invalid'
            
        return {
            "status": status,
            "message": f"Flag is invalid! Next penalty will be {next_penalty_percentage}% of the challenge points."            }

