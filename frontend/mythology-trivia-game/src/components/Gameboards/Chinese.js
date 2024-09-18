import ComingSoonImage from '../../assets/comingsoonTM.png';

const ChineseGame = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">WORK IN PROGRESS</h1>
            <p className="mb-6">this page is a WIP</p>
            <img src={ComingSoonImage} alt="wip" className="max-w-full h-auto" />
        </main>
    )
};

export default ChineseGame;

// tailwind inline but its clunky @apply might be the move