from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer, ForeignKey, Text, Table
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base
from sqlalchemy.exc import IntegrityError
from typing import Optional
from model.models import User, Team, Challenge, UserMadeChallenge
from model.database import SessionLocal

app = FastAPI()


# --------------------- SCHEMAS -----------------------

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
    
class UserMadeChallengeUpdate(BaseModel):
    Firstblood: int
    Solved: int



# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# --------------------- TEAMS -----------------------

# Get all teams
@app.get("/teams/")
def get_teams(db: Session = Depends(get_db)):
    teams = db.query(Team).all()
    return teams

# Get a team by ID
@app.get("/teams/{team_id}")
def get_team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.ID == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

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

# Update a team by ID
@app.put("/teams/{team_id}")
def update_team(team_id: int, team_update: TeamCreate, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.ID == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    team.Teamname = team_update.Teamname
    team.Teamkey = team_update.Teamkey
    db.commit()
    db.refresh(team)
    return team

# Delete a team by ID and update associated users' TeamsID to null
@app.delete("/teams/{team_id}")
def delete_team(team_id: int, db: Session = Depends(get_db)):
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

# Get all users
@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

# Get a user by ID
@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

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

# Update a user by ID and manage team membership
@app.put("/users/{user_id}")
def update_user(user_id: int, user_update: UserCreate, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.ID == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        user.Nickname = user_update.Nickname
        user.Name = user_update.Name
        user.Class = user_update.Class
        user.Email = user_update.Email

        
       
        db.commit()
        db.refresh(user)
        return user

    except IntegrityError:
        raise HTTPException(status_code=400, detail='This Nickname already exists.')
    except Exception as ex:
        db.rollback()  
        raise HTTPException(status_code=422, detail=str(ex))

@app.put("/users/team/{user_id}")
def update_user(user_id: int, teamkey: str, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.ID == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        team = db.query(Team).filter(Team.Teamkey == teamkey).first()
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")
        
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

        return {"message": "User updated successfully", "user": user}
    
    
    except Exception as ex:
        db.rollback()  
        raise HTTPException(status_code=422, detail=str(ex))


@app.put("/users/points/{user_id}")
def put_user_points(user_id: int, points: int, db: Session = Depends(get_db)):
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


# Delete a user by ID
@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Delete all entries in User_made_Challenges related to this user
    user_made_challenges = db.query(UserMadeChallenge).filter(UserMadeChallenge.User_ID == user_id).all()
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

# Get all challenges
@app.get("/challenges/")
def get_challenges(db: Session = Depends(get_db)):
    challenges = db.query(Challenge).all()
    return challenges

# Get a challenge by ID
@app.get("/challenges/{challenge_id}")
def get_challenge(challenge_id: int, db: Session = Depends(get_db)):
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return challenge

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

# Update a challenge by ID
@app.put("/challenges/{challenge_id}")
def update_challenge(challenge_id: int, challenge_update: ChallengeCreate, db: Session = Depends(get_db)):
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    
    challenge.ChallengeName = challenge_update.ChallengeName
    challenge.Categorie = challenge_update.Categorie
    challenge.Points = challenge_update.Points
    challenge.Description = challenge_update.Description
    db.commit()
    db.refresh(challenge)
    return challenge

# Delete a challenge by ID
@app.delete("/challenges/{challenge_id}")
def delete_challenge(challenge_id: int, db: Session = Depends(get_db)):
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    # Delete all entries in User_made_Challenges related to this challenge
    user_made_challenges = db.query(UserMadeChallenge).filter(UserMadeChallenge.Challenges_ID == challenge_id).all()
    for umc in user_made_challenges:
        db.delete(umc)
    db.delete(challenge)
    db.commit()
    return {"detail": "Challenge deleted successfully"}

@app.put("/challenges/hintcount/{challenge_id}")
def put_challenge_hintcount(challenge_id: int,  db: Session = Depends(get_db)):
    challenge = db.query(Challenge).filter(Challenge.ID == challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    
    challenge.Hintcount += 1

    db.commit()
    db.refresh(challenge)
    return {"detail": "Challenge hintcount updated successfully", "new_hintcount": challenge.Hintcount}

# --------------------- USER MADE CHALLENGES -----------------------

# Get all user-made challenges
@app.get("/user-made-challenges/")
def get_user_made_challenges(db: Session = Depends(get_db)):
    user_made_challenges = db.query(UserMadeChallenge).all()
    return user_made_challenges

# Get a user-made challenge by user ID and challenge ID
@app.get("/user-made-challenges/{user_id}/{challenge_id}")
def get_user_made_challenge(user_id: int, challenge_id: int, db: Session = Depends(get_db)):
    user_made_challenge = db.query(UserMadeChallenge).filter(UserMadeChallenge.User_ID == user_id, UserMadeChallenge.Challenges_ID == challenge_id).first()
    if not user_made_challenge:
        raise HTTPException(status_code=404, detail="User-made challenge not found")
    return user_made_challenge

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

# Update a user-made challenge by user ID and challenge ID
@app.put("/user-made-challenges/{user_id}/{challenge_id}")
def update_user_made_challenge(user_id: int, challenge_id: int, update_data: UserMadeChallengeCreate, db: Session = Depends(get_db)):
    user_made_challenge = db.query(UserMadeChallenge).filter(UserMadeChallenge.User_ID == user_id, UserMadeChallenge.Challenges_ID == challenge_id).first()
    if not user_made_challenge:
        raise HTTPException(status_code=404, detail="User-made challenge not found")
    
    user_made_challenge.Firstblood = update_data.Firstblood
    user_made_challenge.Solved = update_data.Solved
    db.commit()
    db.refresh(user_made_challenge)
    return user_made_challenge

# Delete a user-made challenge by user ID and challenge ID
@app.delete("/user-made-challenges/{user_id}/{challenge_id}")
def delete_user_made_challenge(user_id: int, challenge_id: int, db: Session = Depends(get_db)):
    user_made_challenge = db.query(UserMadeChallenge).filter(UserMadeChallenge.User_ID == user_id, UserMadeChallenge.Challenges_ID == challenge_id).first()
    if not user_made_challenge:
        raise HTTPException(status_code=404, detail="User-made challenge not found")
    
    db.delete(user_made_challenge)
    db.commit()
    return {"detail": "User-made challenge deleted successfully"}
