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
        )
    ]

    db.session.bulk_save_objects(questions)
    db.session.commit()

    print("Questions have been successfully inserted!")


if __name__ == "__main__":
    with app.app_context():
        egyptian_questions()  
