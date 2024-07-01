from procyclingstats import Race
import json

def fetch_and_save_race_data():
    race = Race("tour-de-france/2024")
    stages = race.stages()

    with open('data/tour_stages.json', 'w') as f:
        json.dump(stages, f, indent=4)

if __name__ == "__main__":
    fetch_and_save_race_data()
