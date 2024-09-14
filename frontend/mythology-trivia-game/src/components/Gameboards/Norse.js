import React, { useState, useEffect } from 'react';

function NorseGame() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch('/api/questions?theme=norse')
            .then(response => response.json())
            .then(data => setQuestions(data));
    }, []);

    return (
        <div>
            <h1>Norse Mythology Trivia</h1>
            {questions.map((question, index) => (
                <div key={index}>
                    <h2>{question.question_text}</h2>

                </div>
            ))}
        </div>
    );
}

export default NorseGame;
