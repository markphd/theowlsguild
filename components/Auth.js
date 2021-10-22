import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const setUser = (user) => {
    const users = [
      { name: "elfOwl", email: "ellicecalulo@gmail.com" },
      { name: "greatGreyOwl", email: "ryancanonizado20@gmail.com" },
      { name: "greatHornedOwl", email: "dota2kudds@gmail.com" },
      { name: "powerfulOwl", email: "ernielcerbito@gmail.com" },
      { name: "brownWoodOwl", email: "malsibjhay@gmail.com" },
      { name: "rockEagleOwl", email: "rcanonizad09@gmail.com" },
      { name: "australPygmyOwl", email: "anthonggaquino129@gmail.com" },
      { name: "main", email: "guild@theowls.quest" },
    ];
    const playerEmail = users.filter((u) => u.name === user);
    setEmail(playerEmail[0].email);
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
        <p>
          <label>Select player</label>
          <select id="player-select" onChange={(e) => setUser(e.target.value)}>
            <option value="australPygmyOwl">Austral Pygmy Owl</option>
            <option value="brownWoodOwl">Brown Wood Owl</option>
            <option value="elfOwl">Elf Owl</option>
            <option value="greatGreyOwl">Great Grey Owl</option>
            <option value="greatHornedOwl">Great Horned Owl</option>
            <option value="powerfulOwl">Powerful Owl</option>
            <option value="rockEagleOwl">rcanonizad09@gmail.com</option>
            <option value="main">Admin</option>
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
