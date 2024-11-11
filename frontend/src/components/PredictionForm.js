import React from "react";
import usePrediction from "../hooks/usePrediction";
import { useMatches } from "../hooks/useMatches";

const PredictionForm = () => {
  const {
    team1,
    team2,
    setTeam1,
    setTeam2,
    prediction,
    error,
    loading,
    handleSubmit,
  } = usePrediction();

  const { matches } = useMatches();

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold">Predict a Match</h2>
      <form onSubmit={handleSubmit}>
        <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-300">
            <tr>
              <th>Team 1</th>
              <th>Team 2</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id} className="bg-gray-100 hover:bg-gray-200">
                <td className="px-4 py-2 border">
                  <input
                    className="border border-slate-300 hover:border-slate-400 pl-2"
                    type="text"
                    value={match.team_1}
                    onChange={(e) => setTeam1(e.target.value)}
                    required
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    className="border border-slate-300 hover:border-slate-400 pl-2"
                    type="text"
                    value={match.team_2}
                    onChange={(e) => setTeam2(e.target.value)}
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Error and result */}
        {error && <p className="text-red-600">{error}</p>}
        {prediction && <p className="text-violet-600">{prediction}</p>}
        <button
          className="bg-cyan-500 shadow-lg shadow-cyan-500/50 p-2 rounded-md mt-4"
          type="submit"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;
