import { useState, useEffect } from "react";

const colors = ["white", "#3572B5", "#F60002", "#908B88"]; // blanco, azul, rojo, negro
const iconos = [null, "public/wave.png", "/public/torpedo.png", "/public/bomba.png"]; // íconos según color

const Cell = ({ resetSignal }) => {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks((prev) => (prev + 1) % colors.length);
  };

  useEffect(() => {
    setClicks(0);
  }, [resetSignal]);

  return (
    <div
      onClick={handleClick}
      className="w-10 h-10 border border-gray-600 cursor-pointer rounded-md transition-all duration-300 shadow hover:scale-105 active:scale-95 flex items-center justify-center"
      style={{
        backgroundColor: colors[clicks],
      }}
    >
      {iconos[clicks] && (
        <img src={iconos[clicks]} alt="icono" className="w-6 h-6 pointer-events-none" />
      )}
    </div>
  );
};

const TeamGrid = ({ teamName, resetSignal }) => {
  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md border border-gray-300">
      <div className="font-bold mb-3 text-lg text-gray-700">{teamName}</div>
      <div className="grid grid-cols-6 gap-1">
        {Array.from({ length: 36 }).map((_, i) => (
          <Cell key={i} resetSignal={resetSignal} />
        ))}
      </div>
    </div>
  );
};

const ScoreTable = ({ scores, setScores }) => {
  const handleChange = (team, delta) => {
    setScores((prev) => ({ ...prev, [team]: prev[team] + delta }));
  };

  return (
    <div className="w-full max-w-5xl mb-8 overflow-x-auto rounded-xl shadow-lg bg-white border border-gray-300">
      <table className="w-full text-center table-auto">
        <thead className="bg-blue-100 text-gray-700 text-lg">
          <tr>
            {Object.keys(scores).map((team) => (
              <th key={team} className="border border-gray-300 p-4">
                {team}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="text-2xl font-mono text-gray-800">
            {Object.values(scores).map((score, index) => (
              <td key={index} className="border border-gray-300 p-4">
                {score}
              </td>
            ))}
          </tr>
          <tr>
            {Object.keys(scores).map((team) => (
              <td key={team} className="border border-gray-300 p-3 space-x-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 rounded transition"
                  onClick={() => handleChange(team, 1)}
                >
                  +
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded transition"
                  onClick={() => handleChange(team, -1)}
                >
                  -
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default function App() {
  const [scores, setScores] = useState({
    "PAC-MAN": 0,
    "TETRIS": 0,
    "PINBALL": 0,
    "DAYTONA": 0,
  });

  const [resetSignal, setResetSignal] = useState(0);

  const handleReset = () => {
    const confirmReset = window.confirm("¿Estás seguro que querés reiniciar todo?");
    if (confirmReset) {
      setScores({
        "PAC-MAN": 0,
        "TETRIS": 0,
        "PINBALL": 0,
        "DAYTONA": 0,
      });
      setResetSignal((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <ScoreTable scores={scores} setScores={setScores} />

      <button
        onClick={handleReset}
        className="mb-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg shadow-md transition duration-300 hover:scale-105 active:scale-95"
      >
        Reiniciar Todo
      </button>

      <div className="grid grid-cols-2 grid-rows-2 gap-6">
        <TeamGrid teamName="PAC-MAN" resetSignal={resetSignal} />
        <TeamGrid teamName="TETRIS" resetSignal={resetSignal} />
        <TeamGrid teamName="PINBALL" resetSignal={resetSignal} />
        <TeamGrid teamName="DAYTONA" resetSignal={resetSignal} />
      </div>
    </div>
  );
}
