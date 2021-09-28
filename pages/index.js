import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      <div className="brand">
        <div className="logo"></div>
        <h1 className="header">
          The <br />
          Owls
          <br /> Guild
        </h1>
      </div>
      <p className="description">An army of owls login portal</p>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
