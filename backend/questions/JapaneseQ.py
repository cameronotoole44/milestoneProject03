from app import create_app, db
from app.models import Question

app = create_app()

# 20 questions

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
        ),
        Question( 
            question_text="Which Japanese deity is known as the god of rice and agriculture?", 
            correct_answer="Inari", 
            theme="Japanese", 
            option_a="Tenjin", 
            option_b="Inari", 
            option_c="Ebisu", 
            option_d="Daikoku" 
            ), 
        Question( 
            question_text="What is the name of the Japanese spirit that takes the form of a wall of mist?", 
            correct_answer="Nurikabe", 
            theme="Japanese", 
            option_a="Yuki-onna", 
            option_b="Nurikabe", 
            option_c="Kappa", 
            option_d="Tengu" 
            ), 
        Question( 
            question_text="Who is the Japanese god of thunder and lightning?", 
            correct_answer="Raijin", 
            theme="Japanese", 
            option_a="Fujin", 
            option_b="Raijin", 
            option_c="Susanoo", 
            option_d="Ryujin" 
            ), 
        Question( 
            question_text="What mythical creature in Japanese folklore is known for its ability to stretch its neck to great lengths?", 
            correct_answer="Rokurokubi", 
            theme="Japanese", 
            option_a="Kappa", 
            option_b="Rokurokubi", 
            option_c="Tanuki", 
            option_d="Oni" 
            ), 
        Question( 
            question_text="Which Japanese goddess is associated with food and kitchen?", 
            correct_answer="Uke Mochi", 
            theme="Japanese", 
            option_a="Amaterasu", 
            option_b="Uke Mochi", 
            option_c="Benzaiten", 
            option_d="Kishijoten" 
            ), 
        Question( 
            question_text="What is the name of the Japanese mythical creature that is half-human and half-snake?", 
            correct_answer="Nure-onna", 
            theme="Japanese", 
            option_a="Kitsune", 
            option_b="Nure-onna", 
            option_c="Naga", 
            option_d="Baku" 
            ), 
        Question( 
            question_text="Who is the Japanese god of study and scholarship?", 
            correct_answer="Tenjin", 
            theme="Japanese", 
            option_a="Hachiman", 
            option_b="Tenjin", 
            option_c="Ebisu", 
            option_d="Daikoku" 
            ), 
        Question( 
            question_text="What is the name of the sacred jewel in Japanese mythology that represents benevolence?", 
            correct_answer="Yasakani no Magatama", 
            theme="Japanese", 
            option_a="Yata no Kagami", 
            option_b="Yasakani no Magatama", 
            option_c="Kusanagi no Tsurugi", 
            option_d="Hoju no Tama" 
            ), 
        Question( 
            question_text="Which Japanese mythical beast is said to appear during times of peace and prosperity?", 
            correct_answer="Kirin", 
            theme="Japanese", 
            option_a="Phoenix", 
            option_b="Kirin", 
            option_c="Dragon", 
            option_d="Komainu" 
            ), 
        Question( 
            question_text="What is the name of the Japanese underworld ruled by Izanami?", 
            correct_answer="Yomi", 
            theme="Japanese", 
            option_a="Takamagahara", 
            option_b="Yomi", 
            option_c="Ryugu-jo", 
            option_d="Horai" ) 
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
        japanese_questions()