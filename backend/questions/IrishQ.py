from app import create_app, db
from app.models import Question

app = create_app() # setting up the app context to interact with db

 
def irish_questions():
    questions = [
        Question(
            question_text="Who is the Irish goddess of poetry, healing, and smithcraft?",
            correct_answer="Brigid",
            theme="Irish",
            option_a="Morrigan",
            option_b="Brigid",
            option_c="Danu",
            option_d="Airmid"
        ),
        Question(
            question_text="What is the name of the legendary Irish warrior hero who gained his powers by eating the Salmon of Knowledge?",
            correct_answer="Fionn mac Cumhaill",
            theme="Irish",
            option_a="Cú Chula.inn",
            option_b="Diarmuid Ua Duibhne",
            option_c="Fionn mac Cumhaill",
            option_d="Oisín"
        ),
        Question(
            question_text="In Irish mythology, what is the name of the Otherworld where the Tuatha Dé Danann retreated after being defeated?",
            correct_answer="Tír na nÓg",
            theme="Irish",
            option_a="Avalon",
            option_b="Tír na nÓg",
            option_c="Mag Mell",
            option_d="Annwn"
        ),
        Question(
            question_text="Who is the Irish god of the sea, often depicted as an old man with seaweed in his hair?",
            correct_answer="Manannán mac Lir",
            theme="Irish",
            option_a="Lugh",
            option_b="Dagda",
            option_c="Manannán mac Lir",
            option_d="Aengus"
        ),
        Question(
            question_text="What mythical Irish creature is said to warn of an impending death by wailing near the home of the soon-to-be deceased?",
            correct_answer="Banshee",
            theme="Irish",
            option_a="Leprechaun",
            option_b="Selkie",
            option_c="Banshee",
            option_d="Púca"
        ),
        Question(
            question_text="In Irish mythology, what is the name of the sacred stone that would roar when touched by the rightful king of Ireland?",
            correct_answer="Lia Fáil",
            theme="Irish",
            option_a="Excalibur",
            option_b="Lia Fáil",
            option_c="Gae Bulg",
            option_d="Caladbolg"
        ),
        Question(
            question_text="Who is the Irish goddess of war, fate, and death, often depicted as a crow?",
            correct_answer="The Morrigan",
            theme="Irish",
            option_a="Ériu",
            option_b="Macha",
            option_c="Badb",
            option_d="The Morrigan"
        ),
        Question(
            question_text="What is the name of the Irish fertility god who possessed a cauldron of plenty?",
            correct_answer="The Dagda",
            theme="Irish",
            option_a="Cernunnos",
            option_b="The Dagda",
            option_c="Aengus",
            option_d="Midir"
        ),
        Question(
            question_text="In Irish mythology, what is the name of the magical land of eternal youth?",
            correct_answer="Tír na nÓg",
            theme="Irish",
            option_a="Avalon",
            option_b="Elysium",
            option_c="Tír na nÓg",
            option_d="Valhalla"
        ),
        Question(
            question_text="Who is the Irish god of light, music, and prophecy, known for his mastery of all arts?",
            correct_answer="Lugh",
            theme="Irish",
            option_a="Ogma",
            option_b="Lugh",
            option_c="Nuada",
            option_d="Goibniu"
        ),
        Question(
            question_text="Who is the Irish goddess of sovereignty, often associated with the land of Ireland itself?",
            correct_answer="Ériu",
            theme="Irish",
            option_a="Brigid",
            option_b="Ériu",
            option_c="Medb",
            option_d="Flidais"
        ),
        Question(
            question_text="What is the name of the magical Irish harp that could make men fall asleep, weep, or laugh?",
            correct_answer="Dagda's Harp",
            theme="Irish",
            option_a="Uaithne",
            option_b="Dagda's Harp",
            option_c="Cláirseach",
            option_d="Telyn"
        ),
        Question(
            question_text="Who is the Irish god of youth and love?",
            correct_answer="Aengus",
            theme="Irish",
            option_a="Lugh",
            option_b="Aengus",
            option_c="Midir",
            option_d="Ogma"
        ),
        Question(
            question_text="What mythical Irish creature is said to grant wishes in exchange for its freedom?",
            correct_answer="Leprechaun",
            theme="Irish",
            option_a="Selkie",
            option_b="Leprechaun",
            option_c="Púca",
            option_d="Clurichaun"
        ),
        Question(
            question_text="Who is the Irish goddess of cattle and fertility?",
            correct_answer="Boann",
            theme="Irish",
            option_a="Danu",
            option_b="Boann",
            option_c="Brigid",
            option_d="Flidais"
        ),
        Question(
            question_text="What is the name of the magical Irish weapon that never misses its target?",
            correct_answer="Gáe Bulg",
            theme="Irish",
            option_a="Fragarach",
            option_b="Gáe Bulg",
            option_c="Caladbolg",
            option_d="Moralltach"
        ),
        Question(
            question_text="Who is the Irish god of eloquence and language?",
            correct_answer="Ogma",
            theme="Irish",
            option_a="Lugh",
            option_b="Ogma",
            option_c="Dagda",
            option_d="Midir"
        ),
        Question(
            question_text="What is the name of the magical Irish feast where food and drink never run out?",
            correct_answer="Feast of Goibniu",
            theme="Irish",
            option_a="Samhain Feast",
            option_b="Feast of Goibniu",
            option_c="Beltane Banquet",
            option_d="Lughnasa Dinner"
        ),
        Question(
            question_text="Who is the Irish goddess of horses and fertility?",
            correct_answer="Macha",
            theme="Irish",
            option_a="Epona",
            option_b="Macha",
            option_c="Rhiannon",
            option_d="Étaín"
        ),
        Question(
            question_text="What is the name of the magical Irish mist that can make a small army appear large?",
            correct_answer="Féth Fíada",
            theme="Irish",
            option_a="Féth Fíada",
            option_b="Ceo Draiochta",
            option_c="Sí Gaoithe",
            option_d="Brat Bán"
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
        irish_questions()