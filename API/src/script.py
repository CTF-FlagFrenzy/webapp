import requests
import time
import random

# Konfiguration
ep_url = "http://localhost:8000/teamPoints/"  # Passe die URL an
teams = [1, 2, 3, 4, 5]  # Ersetze mit echten Team-IDs


def update_team_points():
    for team_id in teams:
        points_to_add = random.randint(10, 20)
        payload = {"TeamID": team_id, "Points": points_to_add}
        response = requests.post(ep_url, json=payload)
        if response.status_code == 200:
            print(f"Erfolgreich aktualisiert: Team {team_id} +{points_to_add} Punkte")
        else:
            print(f"Fehler für Team {team_id}: {response.text}")


if __name__ == "__main__":
    while True:
        update_team_points()
        print("Warte 15 Minuten...")
        time.sleep(900)  # 900 Sekunden = 15 Minuten
