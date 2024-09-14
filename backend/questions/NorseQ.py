from app import create_app, db
from app.models import Question

app = create_app() # setting up the app context to interact with db

# BULK INSERT TIME 
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
            question_text="Who are Thor's brothers?",
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
        )
    ]

    db.session.bulk_save_objects(questions)
    db.session.commit()

    print("Questions have been successfully inserted!")


if __name__ == "__main__":
    with app.app_context():
        norse_questions()