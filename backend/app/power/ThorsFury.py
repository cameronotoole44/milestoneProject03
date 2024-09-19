class ThorsFury:
    def __init__(self, duration=3):
        self.duration = duration  # number of questions to double points

    def apply(self, game):
        game.double_points(self.duration)