class AthenasInsight:
    def __init__(self):
        self.usage_limit = 1  # only use once per game

    def apply(self, game):
        game.eliminate_wrong_answer()