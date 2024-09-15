from app import create_app, db
from app.models import Question

app = create_app() # setting up the app context to interact with db

def greek_questions():
    questions = [
        Question(
            question_text="Who is the king of the Greek gods and ruler of Mount Olympus?",
            correct_answer="Zeus",
            theme="Greek",
            option_a="Poseidon",
            option_b="Zeus",
            option_c="Hades",
            option_d="Apollo"
        ),
        Question(
            question_text="Which Greek hero is famous for his twelve labors?",
            correct_answer="Heracles",
            theme="Greek",
            option_a="Perseus",
            option_b="Theseus",
            option_c="Heracles",
            option_d="Achilles"
        ),
        Question(
            question_text="Who is the Greek goddess of wisdom, war, and crafts?",
            correct_answer="Athena",
            theme="Greek",
            option_a="Hera",
            option_b="Artemis",
            option_c="Athena",
            option_d="Aphrodite"
        ),
        Question(
            question_text="What is the name of the Underworld river that the dead must cross to enter Hades?",
            correct_answer="Styx",
            theme="Greek",
            option_a="Acheron",
            option_b="Styx",
            option_c="Lethe",
            option_d="Phlegethon"
        ),
        Question(
            question_text="Who is the Greek god of the sea and earthquakes?",
            correct_answer="Poseidon",
            theme="Greek",
            option_a="Triton",
            option_b="Nereus",
            option_c="Oceanus",
            option_d="Poseidon"
        ),
        Question(
            question_text="Which monster in Greek mythology had snakes for hair and could turn people to stone with her gaze?",
            correct_answer="Medusa",
            theme="Greek",
            option_a="Hydra",
            option_b="Medusa",
            option_c="Scylla",
            option_d="Echidna"
        ),
        Question(
            question_text="Who is the Greek god of wine, theater, and ecstasy?",
            correct_answer="Dionysus",
            theme="Greek",
            option_a="Pan",
            option_b="Hermes",
            option_c="Dionysus",
            option_d="Apollo"
        ),
        Question(
            question_text="What is the name of the winged horse in Greek mythology?",
            correct_answer="Pegasus",
            theme="Greek",
            option_a="Chiron",
            option_b="Pegasus",
            option_c="Sleipnir",
            option_d="Bucephalus"
        ),
        Question(
            question_text="Who is the Greek goddess of love and beauty?",
            correct_answer="Aphrodite",
            theme="Greek",
            option_a="Hera",
            option_b="Artemis",
            option_c="Athena",
            option_d="Aphrodite"
        ),
        Question(
            question_text="Which Titan was condemned to hold up the sky for eternity?",
            correct_answer="Atlas",
            theme="Greek",
            option_a="Prometheus",
            option_b="Atlas",
            option_c="Cronus",
            option_d="Hyperion"
        )
    ]

    db.session.bulk_save_objects(questions)
    db.session.commit()

    print("Questions have been successfully inserted!")


if __name__ == "__main__":
    with app.app_context():
        greek_questions()