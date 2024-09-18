from app import db
from models import Question

# BULK INSERT TIME 
def insert_questions():
    questions = [
        
        # Chinese mythology
        Question(
            question_text="In Chinese mythology, what creature represents power and strength?",
            correct_answer="Dragon",
            theme="Chinese",
            option_a="Dragon",
            option_b="Phoenix",
            option_c="Qilin",
            option_d="Tiger"
        ),
        Question(
            question_text="What is the name of the Jade Emperor in Chinese mythology?",
            correct_answer="Yu Huang",
            theme="Chinese",
            option_a="Yu Huang",
            option_b="Laozi",
            option_c="Chang'e",
            option_d="Sun Wukong"
        )
    ]