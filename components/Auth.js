import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const setUser = (user) => {
    const users = [
      { name: "elfOwl", email: "ellicecalulo@gmail.com" },
      { name: "greatGreyOwl", email: "ryancanonizado20@gmail.com" },
      { name: "greatHornedOwl", email: "gfperez.0711@gmail.com" },
      { name: "powerfulOwl", email: "dota2kudds@gmail.com" },
      { name: "brownWoodOwl", email: "malsibjhay@gmail.com" },
      { name: "main", email: "mark@forloop.me" },
    ];
    const playerEmail = users.filter((u) => u.name === user);
    setEmail(playerEmail[0].email);

    console.log(email, "EMAIL 2");
  };

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

  console.log(email, "EMAIL");

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <div>
          {/* <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            
          /> */}

          <label>Select player</label>
          <select id="player-select" onChange={(e) => setUser(e.target.value)}>
            <option value="brownWoodOwl">Brown Wood Owl</option>
            <option value="elfOwl">Elf Owl</option>
            <option value="greatGreyOwl">Great Grey Owl</option>
            <option value="greatHornedOwl">Great Horned Owl</option>
            <option value="powerfulOwl">Powerful Owl</option>
            <option value="main">Test</option>
          </select>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Welcome"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
