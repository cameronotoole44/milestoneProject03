from app import create_app, db
from app.models import Question

app = create_app()

def egyptian_questions():
    questions = [
        Question(
            question_text="Who is the Egyptian god of the dead and the afterlife?",
            correct_answer="Osiris",
            theme="Egyptian",
            option_a="Anubis",
            option_b="Osiris",
            option_c="Ra",
            option_d="Horus"
        ),
        Question(
            question_text="What is the name of the Egyptian sun god?",
            correct_answer="Ra",
            theme="Egyptian",
            option_a="Atum",
            option_b="Khepri",
            option_c="Ra",
            option_d="Amun"
        ),
        Question(
            question_text="Who is the Egyptian goddess of magic and wisdom?",
            correct_answer="Isis",
            theme="Egyptian",
            option_a="Hathor",
            option_b="Isis",
            option_c="Nephthys",
            option_d="Maat"
        ),
        Question(
            question_text="What mythical creature in Egyptian mythology has the head of a human and the body of a lion?",
            correct_answer="Sphinx",
            theme="Egyptian",
            option_a="Ammit",
            option_b="Sphinx",
            option_c="Bennu",
            option_d="Serpopard"
        ),
        Question(
            question_text="Who is the Egyptian god of chaos and disorder?",
            correct_answer="Set",
            theme="Egyptian",
            option_a="Apophis",
            option_b="Set",
            option_c="Sobek",
            option_d="Khonsu"
        ),
        Question(
            question_text="What is the name of the Egyptian goddess of the sky?",
            correct_answer="Nut",
            theme="Egyptian",
            option_a="Tefnut",
            option_b="Nut",
            option_c="Sekhmet",
            option_d="Bastet"
        ),
        Question(
            question_text="Who is the Egyptian god of embalming and mummification?",
            correct_answer="Anubis",
            theme="Egyptian",
            option_a="Thoth",
            option_b="Anubis",
            option_c="Ptah",
            option_d="Khnum"
        ),
        Question(
            question_text="What is the name of the Egyptian concept of cosmic order and balance?",
            correct_answer="Ma'at",
            theme="Egyptian",
            option_a="Ka",
            option_b="Ba",
            option_c="Ma'at",
            option_d="Akh"
        ),
        Question(
            question_text="Who is the Egyptian goddess of fertility and motherhood?",
            correct_answer="Isis",
            theme="Egyptian",
            option_a="Hathor",
            option_b="Isis",
            option_c="Taweret",
            option_d="Nut"
        ),
        Question(
            question_text="What is the name of the Egyptian demon that devours the hearts of the unworthy in the afterlife?",
            correct_answer="Ammit",
            theme="Egyptian",
            option_a="Apophis",
            option_b="Ammit",
            option_c="Set",
            option_d="Sekhmet"
        ),
        Question( 
            question_text="Who is the Egyptian goddess of cats, protection, and pleasure?", 
            correct_answer="Bastet", 
            theme="Egyptian", 
            option_a="Sekhmet", 
            option_b="Bastet", 
            option_c="Hathor", 
            option_d="Tefnut" 
        ), 
        Question( 
            question_text="What is the name of the Egyptian concept representing a person's soul or spirit?", 
            correct_answer="Ba", 
            theme="Egyptian", 
            option_a="Ka", 
            option_b="Ba", 
            option_c="Akh", 
            option_d="Ib" 
        ), 
        Question( 
            question_text="Who is the Egyptian god of writing and wisdom?", 
            correct_answer="Thoth", 
            theme="Egyptian", 
            option_a="Ptah", 
            option_b="Thoth", 
            option_c="Khnum", 
            option_d="Horus" 
        ), 
        Question( 
            question_text="What mythical Egyptian bird is said to be reborn from its own ashes?", 
            correct_answer="Bennu", 
            theme="Egyptian", 
            option_a="Phoenix", 
            option_b="Bennu", 
            option_c="Horus", 
            option_d="Nekhbet" 
        ), 
        Question( 
            question_text="Who is the Egyptian goddess of love, beauty, and music?", 
            correct_answer="Hathor", 
            theme="Egyptian", 
            option_a="Isis", 
            option_b="Hathor", 
            option_c="Nephthys", 
            option_d="Nut" 
        ), 
        Question( 
            question_text="What is the name of the Egyptian demon who attempts to devour Ra during his nightly journey?", 
            correct_answer="Apophis", 
            theme="Egyptian", 
            option_a="Set", 
            option_b="Apophis", 
            option_c="Ammit", 
            option_d="Sobek" 
        ), 
        Question( 
            question_text="Who is the Egyptian god of the earth and vegetation?", 
            correct_answer="Geb", 
            theme="Egyptian", 
            option_a="Osiris", 
            option_b="Geb", 
            option_c="Hapi", 
            option_d="Khnum" 
        ), 
        Question( 
            question_text="What is the name of the Egyptian funerary text containing spells to guide the deceased through the afterlife?", 
            correct_answer="Book of the Dead", 
            theme="Egyptian", 
            option_a="Pyramid Texts", 
            option_b="Book of the Dead", 
            option_c="Coffin Texts", 
            option_d="Amduat" 
        ), 
        Question( 
            question_text="Who is the Egyptian goddess of childbirth and fertility, often depicted as a hippopotamus?", 
            correct_answer="Taweret", 
            theme="Egyptian", 
            option_a="Isis", 
            option_b="Taweret", 
            option_c="Hathor", 
            option_d="Nut" 
        ), 
        Question( 
            question_text="What is the name of the Egyptian symbol of eternal life?", 
            correct_answer="Ankh", 
            theme="Egyptian", 
            option_a="Djed", 
            option_b="Ankh", 
            option_c="Was", 
            option_d="Uraeus" 
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
        egyptian_questions()