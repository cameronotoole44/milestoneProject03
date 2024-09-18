from app import create_app, db
from app.models import Question

app = create_app() # setting up the app context to interact with db

# 20 questions
def norse_questions():
    questions = [
        Question(
            question_text="Who is the god of thunder?",
            correct_answer="Thor",
            theme="Norse",
            option_a="Odin",
            option_b="Thor",
            option_c="Freyr",
            option_d="Loki"
        ),
        Question(
            question_text="Who is the god of mischief?",
            correct_answer="Loki",
            theme="Norse",
            option_a="Loki",  
            option_b="Hodor", 
            option_c="Sigurd", 
            option_d="Mimir"           
        ),
        Question(
            question_text="What is the battle of the end of time called?",
            correct_answer="Ragnarök",
            theme="Norse",
            option_a="Valhalla",  
            option_b="Ragnarök", 
            option_c="Fjall", 
            option_d="Heidrun"           
        ),
        Question(
            question_text="Who are Thor's brothers?", # i might be cooked, is this a sentence?
            correct_answer="Baldr, Víðarr and Váli",
            theme="Norse",
            option_a="Baldr, Loki, and Váli",  
            option_b="Loki, Baldr, and Magni", 
            option_c="Baldr, Víðarr and Váli", 
            option_d="Loki, Mimir, and Magni"           
        ),
        Question(
            question_text="Who is Freyja?",
            correct_answer="Goddess of Love and Fertility",
            theme="Norse",
            option_a="Goddess of Light",  
            option_b="Odin's wife", 
            option_c="Goddess of Love and Fertility", 
            option_d="Ruler of the Valkyries"           
        ),
        Question(
            question_text="What connects Midgard and Asgard?",
            correct_answer="The Bifröst Bridge",
            theme="Norse",
            option_a="The Bifröst Bridge",  
            option_b="The Pool of the Gods", 
            option_c="The Valkyries", 
            option_d="A Portal"           
        ),
        Question(
            question_text="Who stole Mjölnir?",
            correct_answer="Thrym",
            theme="Norse",
            option_a="Loki",  
            option_b="Thrym", 
            option_c="Odin", 
            option_d="Baldr"           
        ),
        Question(
            question_text="What day of the week is said to be named after Odin?",
            correct_answer="Wednesday",
            theme="Norse",
            option_a="Friday",  
            option_b="Sunday", 
            option_c="Monday", 
            option_d="Wednesday"           
        ),
        Question(
            question_text="What are the two places slain Viking warriors could go after their deaths?",
            correct_answer="Valhalla or Fólkvangr",
            theme="Norse",
            option_a="Jotunheim or Fólkvangr",  
            option_b="Valhalla or Hel", 
            option_c="Vanaheim or Valhalla", 
            option_d="Valhalla or Fólkvangr"           
        ),
        Question(
            question_text="What is the name of the world tree?",
            correct_answer="Yggdrasil",
            theme="Norse",
            option_a="Yggdrasil",
            option_b="Bifröst",
            option_c="Mímisbrunnr",
            option_d="Valhalla"
        ),
        Question(
            question_text="Which creature continually gnaws at the roots of Yggdrasil?",
            correct_answer="Nidhogg",
            theme="Norse",
            option_a="Fenrir",
            option_b="Jormungandr",
            option_c="Nidhogg",
            option_d="Ratatoskr"
        ),
        Question(
            question_text="Who is the guardian of the Bifröst Bridge?",
            correct_answer="Heimdall",
            theme="Norse",
            option_a="Tyr",
            option_b="Heimdall",
            option_c="Bragi",
            option_d="Forseti"
        ),
        Question(
            question_text="What is the name of Odin's eight-legged horse?",
            correct_answer="Sleipnir",
            theme="Norse",
            option_a="Gullfaxi",
            option_b="Svadilfari",
            option_c="Sleipnir",
            option_d="Hófvarpnir"
        ),
        Question(
            question_text="Who is the goddess of death in Norse mythology?",
            correct_answer="Hel",
            theme="Norse",
            option_a="Frigg",
            option_b="Hel",
            option_c="Sif",
            option_d="Idunn"
        ),
        Question(
            question_text="What is the name of Thor's hammer?",
            correct_answer="Mjölnir",
            theme="Norse",
            option_a="Gungnir",
            option_b="Mjölnir",
            option_c="Hofund",
            option_d="Gram"
        ),
        Question(
            question_text="Which Norse god is associated with poetry and music?",
            correct_answer="Bragi",
            theme="Norse",
            option_a="Ullr",
            option_b="Vidar",
            option_c="Bragi",
            option_d="Hoenir"
        ),
        Question(
            question_text="What is the name of the magical cauldron that never runs out of mead?",
            correct_answer="Heidrun",
            theme="Norse",
            option_a="Gjallarhorn",
            option_b="Heidrun",
            option_c="Brisingamen",
            option_d="Draupnir"
        ),
        Question(
            question_text="Who is the wife of Odin?",
            correct_answer="Frigg",
            theme="Norse",
            option_a="Freyja",
            option_b="Sif",
            option_c="Frigg",
            option_d="Idun"
        ),
        Question(
            question_text="What is the name of the squirrel that runs up and down Yggdrasil?",
            correct_answer="Ratatoskr",
            theme="Norse",
            option_a="Nidhogg",
            option_b="Jormungandr",
            option_c="Ratatoskr",
            option_d="Hraesvelgr"
        ),
        Question(
            question_text="Which giant is fated to kill Odin during Ragnarök?",
            correct_answer="Fenrir",
            theme="Norse",
            option_a="Surtr",
            option_b="Fenrir",
            option_c="Jormungandr",
            option_d="Hyrm"
        )
    ]

# add this script to check for duplicate questions when inserting the new sets**

    for question_data in questions:
        existing_question = Question.query.filter_by(question_text=question_data.question_text).first()
        if not existing_question:
            db.session.add(question_data)
            print(f"Added question: {question_data.question_text}")
        else:
            print(f"Question already exists: {question_data.question_text}")

    db.session.commit()
    print("Questions have been successfully inserted!")


if __name__ == "__main__":
    with app.app_context():
        norse_questions()