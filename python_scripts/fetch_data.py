import json
import logging
from datetime import datetime, timedelta
from procyclingstats import Race, Stage

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def fetch_climb_names(stage):
    """Fetch and return the list of climb names for a given stage."""
    return [climb.get('climb_name', 'Unknown Climb') for climb in stage.climbs()]

def fetch_stage_details(stage_url, stage_number):
    """Fetch and return details of a single stage based on the stage URL."""
    try:
        stage = Stage(stage_url)
        return {
            "stageNumber": stage_number,
            "date": stage.date(),
            "startLocation": stage.departure(),
            "endLocation": stage.arrival(),
            "distance": stage.distance(),
            "stageType": stage.stage_type(),
            "verticalMeters": stage.vertical_meters(),
            "profileScore": stage.profile_score(),
            "startTime": stage.start_time().strip(),
            "climbs": fetch_climb_names(stage)
        }
    except Exception as e:
        logging.error(f"Error processing stage {stage_number} at {stage_url}: {str(e)}")
        return None

def fetch_race_data(race_url):
    """Fetch and save race data including dynamic handling of stages and rest days."""
    try:
        race = Race(race_url)
        stage_data = race.stages()  # Assumes it returns a list of stage info with URLs

        stages_details = []
        stage_number = 1
        previous_date = None

        for stage_info in stage_data:
            stage_details = fetch_stage_details(stage_info['stage_url'], stage_number)
            if stage_details:
                # Compare stage dates to insert rest days if there is a gap
                if previous_date and datetime.strptime(stage_details['date'], '%Y-%m-%d') > datetime.strptime(previous_date, '%Y-%m-%d') + timedelta(days=1):
                    stages_details.append({"stageNumber": "Rest Day", "date": previous_date})
                stages_details.append(stage_details)
                previous_date = stage_details['date']
                stage_number += 1

        all_data = {
            "race": {
                "name": race.name(),
                "startdate": race.startdate(),
                "enddate": race.enddate(),
                "category": race.category(),
                "uci_tour": race.uci_tour()
            },
            "stages": stages_details
        }

        with open('data/tour_de_france_2024_details.json', 'w') as f:
            json.dump(all_data, f, indent=4)
        logging.info("Successfully collected and saved all race and stage data.")
    except Exception as e:
        logging.error(f"An error occurred during fetching race data: {str(e)}")

if __name__ == "__main__":
    fetch_race_data("race/tour-de-france/2024")
