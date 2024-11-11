import React from "react";
import { useMatches } from "../hooks/useMatches";
import { formatDateTimeWithTimeZone } from "../utils/dateUtils";

const MatchList = () => {
  const { matches, loading, error } = useMatches();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      <h1 className="text-center text-4xl font-bold">Match List</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-4 py-2 border text-left text-gray-700">
              Matches
            </th>
            <th className="px-4 py-2 border text-left text-gray-700">Time</th>
            <th className="px-4 py-2 border text-left text-gray-700">
              Results
            </th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr
              key={match.id}
              className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
            >
              <td className="px-4 py-2 border">
                {match.team_1} vs {match.team_2}
              </td>
              <td className="px-4 py-2 border">
                {formatDateTimeWithTimeZone(match.date, "America/Los_Angeles")}
              </td>
              <td className="px-4 py-2 border-b">{match.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchList;
