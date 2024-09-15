from app import create_app, db
from app.models import Question

app = create_app()

# 10 questions to start - add more later

def japanese_questions():
    questions = [
        Question(
            question_text="Who is the Shinto sun goddess and one of the most important deities in Japanese mythology?",
            correct_answer="Amaterasu",
            theme="Japanese",
            option_a="Amaterasu",
            option_b="Tsukuyomi",
            option_c="Susanoo",
            option_d="Izanami"
        ),
        Question(
            question_text="Which mythical creature in Japanese folklore is known for shapeshifting, often taking the form of a human woman?",
            correct_answer="Kitsune",
            theme="Japanese",
            option_a="Tanuki",
            option_b="Kappa",
            option_c="Kitsune",
            option_d="Oni"
        ),
        Question(
            question_text="What is the name of the Japanese dragon king who lives in a palace under the sea?",
            correct_answer="Ryujin",
            theme="Japanese",
            option_a="Fujin",
            option_b="Raijin",
            option_c="Hachiman",
            option_d="Ryujin"
        ),
        Question(
            question_text="In Japanese mythology, what type of spirit is believed to possess objects that have reached 100 years of age?",
            correct_answer="Tsukumogami",
            theme="Japanese",
            option_a="Yokai",
            option_b="Tsukumogami",
            option_c="Kami",
            option_d="Yurei"
        ),
        Question(
            question_text="Which legendary sword in Japanese mythology was found in the tail of an eight-headed serpent?",
            correct_answer="Kusanagi",
            theme="Japanese",
            option_a="Totsuka-no-Tsurugi",
            option_b="Kusanagi",
            option_c="Ame-no-Murakumo-no-Tsurugi",
            option_d="Masamune"
        ),
        Question(
            question_text="Who is the Japanese god of storms and the sea, known for his impetuous nature?",
            correct_answer="Susanoo",
            theme="Japanese",
            option_a="Izanagi",
            option_b="Fujin",
            option_c="Susanoo",
            option_d="Ebisu"
        ),
        Question(
            question_text="What is the name of the mythical island in Japanese folklore said to be inhabited by immortal beings?",
            correct_answer="Horai",
            theme="Japanese",
            option_a="Yomi",
            option_b="Horai",
            option_c="Takama-ga-hara",
            option_d="Ryugu-jo"
        ),
        Question(
            question_text="In Japanese mythology, what is the name of the primordial void from which all things emerged?",
            correct_answer="Ame-no-Minaka-Nushi",
            theme="Japanese",
            option_a="Takamagahara",
            option_b="Yomi",
            option_c="Ame-no-Minaka-Nushi",
            option_d="Izanagi-no-Mikoto"
        ),
        Question(
            question_text="Which mythical creature in Japanese folklore is known for its long neck and its ability to feast on human dreams?",
            correct_answer="Baku",
            theme="Japanese",
            option_a="Tengu",
            option_b="Kirin",
            option_c="Baku",
            option_d="Nekomata"
        ),
        Question(
            question_text="Who is the Japanese goddess of mercy and compassion, often depicted with multiple arms?",
            correct_answer="Kannon",
            theme="Japanese",
            option_a="Benzaiten",
            option_b="Kannon",
            option_c="Inari",
            option_d="Amaterasu"
        )
]
    
    db.session.bulk_save_objects(questions)
    db.session.commit()

    print("Questions have been successfully inserted!")


if __name__ == "__main__":
    with app.app_context():
        japanese_questions()   