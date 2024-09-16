import { Link } from 'react-router-dom';

function Gameboard() {
    return (
        <div className="gameboard">
            <h1 className="gameboard-title">
                Select a Theme
            </h1>
            <div className="grid-container">
                <Link to="./Norse" className="link norse">
                    Norse Mythology
                </Link>
                <Link to="./Greek" className="link greek">
                    Greek Mythology
                </Link>
                <Link to="./Irish" className="link irish">
                    Irish Mythology
                </Link>
                <Link to="./Japanese" className="link japanese">
                    Japanese Mythology
                </Link>
                <Link to="./Chinese" className="link chinese">
                    Chinese Mythology(Coming Soon!)
                </Link>
                <Link to="./Egyptian" className="link egyptian">
                    Egyptian Mythology
                </Link>
            </div>
        </div>
    )
};

export default Gameboard;
