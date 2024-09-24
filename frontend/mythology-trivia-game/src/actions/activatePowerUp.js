import { activatePowerUpSuccess, activatePowerUpFailure } from './powerUpActions';


export const activatePowerUp = (powerupName) => async (dispatch, getState) => {
    const token = getState().user.accessToken;

    try {
        const response = await fetch('https://loremaster.up.railway.app/powerups/activate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ powerup_name: powerupName })
        });

        const data = await response.json();

        if (response.ok) {

            dispatch(activatePowerUpSuccess(data.message, powerupName));
        } else {
            dispatch(activatePowerUpFailure(data.msg));
        }
    } catch (error) {
        dispatch(activatePowerUpFailure('An error occurred while activating the power-up.'));
    }
};