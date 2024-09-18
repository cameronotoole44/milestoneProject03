from app import create_app, db
from app.models import Question

app = create_app() # setting up the app context to interact with db


# 20 questions

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
        ),
        Question( 
            question_text="Who is the Greek god of the forge and metalworking?", 
            correct_answer="Hephaestus", 
            theme="Greek", 
            option_a="Ares", 
            option_b="Hephaestus", 
            option_c="Hermes", 
            option_d="Dionysus" 
        ), 
        Question( 
            question_text="What is the name of the three-headed dog that guards the entrance to the Greek underworld?", 
            correct_answer="Cerberus", 
            theme="Greek", 
            option_a="Orthrus", 
            option_b="Cerberus", 
            option_c="Chimera", 
            option_d="Hydra" 
        ), 
        Question( 
            question_text="Who is the Greek goddess of the hunt and the moon?", 
            correct_answer="Artemis", 
            theme="Greek", 
            option_a="Hera", 
            option_b="Artemis", 
            option_c="Athena", 
            option_d="Demeter" 
        ), 
        Question( 
            question_text="What is the name of the magical winged sandals worn by Hermes?", 
            correct_answer="Talaria", 
            theme="Greek", 
            option_a="Caduceus", 
            option_b="Talaria", 
            option_c="Petasus", 
            option_d="Aegis" 
        ), 
        Question( 
            question_text="Who is the Greek primordial god of time?", 
            correct_answer="Chronos", 
            theme="Greek", 
            option_a="Aion", 
            option_b="Chronos", 
            option_c="Kairos", 
            option_d="Ananke" 
        ), 
        Question( 
            question_text="What creature in Greek mythology has the head of a man, body of a lion, and tail of a scorpion?", 
            correct_answer="Manticore", 
            theme="Greek", 
            option_a="Chimera", 
            option_b="Manticore", 
            option_c="Sphinx", 
            option_d="Minotaur" 
        ), 
        Question( 
            question_text="Who is the Greek goddess of agriculture and the harvest?",
            correct_answer="Demeter", theme="Greek", option_a="Persephone", 
            option_b="Demeter", 
            option_c="Gaia", 
            option_d="Rhea" 
        ), 
        Question( 
            question_text="What is the name of the magical horn of plenty in Greek mythology?", 
            correct_answer="Cornucopia", 
            theme="Greek", 
            option_a="Caduceus", 
            option_b="Cornucopia", 
            option_c="Thyrsus", 
            option_d="Aegis" 
        ), 
        Question( 
            question_text="Who is the Greek god of dreams?", 
            correct_answer="Morpheus", 
            theme="Greek", 
            option_a="Hypnos", 
            option_b="Morpheus", 
            option_c="Thanatos", 
            option_d="Phobetor" 
        ), 
        Question( 
            question_text="What is the name of the magical shield used by Zeus and Athena?", 
            correct_answer="Aegis", 
            theme="Greek", 
            option_a="Argo", 
            option_b="Aegis", 
            option_c="Aspis", 
            option_d="Hoplon" 
        ) 
]


    for question_data in questions:
        existing_question = Question.query.filter_by(question_text=question_data.question_text).first()
        if not existing_question:
            db.session.add(question_data)
            print(f"Added question: {question_data.question_text}")
        else:
            print(f"Question already exists: {question_data.question_text}")

    db.session.commit()
    print("More questions have been successfully inserted!")


if __name__ == "__main__":
    with app.app_context():
        greek_questions()