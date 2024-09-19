import React from 'react';

const PowerUps = ({ powerups = [] }) => {
    const getPowerUpIcon = (name) => {
        switch (name) {
            case "ThorsFury":
                return "⚡";
            case "AthenasInsight":
                return "👁️";
            default:
                return "🔮";
        }
    };

    const getPowerUpDescription = (name) => {
        switch (name) {
            case "ThorsFury":
                return "Doubles your points for 2-3 questions.";
            case "AthenasInsight":
                return "Eliminates one incorrect answer.";
            default:
                return "Unknown power-up.";
        }
    };

    return (
        <div className="powerups-container">
            <h2 className="powerups-title">Power-ups</h2>
            {powerups.length > 0 ? (
                <ul className="powerups-list">
                    {powerups.map((powerup, index) => (
                        <li key={index} className="powerup-item">
                            <div className="powerup-icon">
                                {getPowerUpIcon(powerup)}
                            </div>
                            <div>
                                <h3 className="powerup-name">{powerup}</h3>
                                <p className="powerup-description">{getPowerUpDescription(powerup)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-powerups">No power-ups acquired yet</p>
            )}
        </div>
    )
};

export default PowerUps;
