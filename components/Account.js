import { useState, useEffect } from "react";
import Scholar from "./Scholar";
import players from "../data/players.json";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  return (
    <div className="form-widget">
      <table>
        <thead>
          <tr>
            <th colSpan="1">Team</th>
            <th colSpan="1">Total SLP</th>
            <th colSpan="1">MMR</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <Scholar
              name={player.name}
              address={player.address}
              alias={player.alias}
              key={Math.random(23)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
