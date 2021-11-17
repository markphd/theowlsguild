import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import players from "../data/players.json";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <p>
          <label>Select player</label>
          <select id="player-select" onChange={(e) => setEmail(e.target.value)}>
            {players.map((player) => (
              <option key={player.alias} value={player.email}>
                {player.alias}
              </option>
            ))}
          </select>
        </p>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Login"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
