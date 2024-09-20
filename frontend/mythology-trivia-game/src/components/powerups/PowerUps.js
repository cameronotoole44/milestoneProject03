import React from 'react';

const PowerUpsGame = ({ powerups = [], onPowerUpClick, activePowerUp }) => {
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

    return (
        <div className="powerups-container">
            <h2 className="powerups-title">Activate Power-ups</h2>
            {powerups.length > 0 ? (
                <ul className="powerups-list">
                    {powerups.map((powerup, index) => (
                        <li key={index} className="powerup-item">
                            <div className="powerup-icon">
                                {getPowerUpIcon(powerup.name)}
                            </div>
                            <div>
                                <h3 className="powerup-name">{powerup.name}</h3>
                                <p className="powerup-quantity">
                                    Quantity: {powerup.quantity}
                                </p>
                                <button
                                    onClick={() => onPowerUpClick(powerup.name)}
                                    disabled={activePowerUp === powerup.name}
                                >
                                    {activePowerUp === powerup.name ? "Active" : "Use Power-Up"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-powerups">No power-ups to use yet</p>
            )}
        </div>
    );
};

export default PowerUpsGame;