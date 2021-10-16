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
        {/* <h1 className="header">Portal</h1> */}
      </div>
      {!session ? (
        <>
          <h1 className="header">A new adventure awaits</h1>
          <p className="description">
            Choose the Axie team assigned to you. An email with a login link
            will follow.
          </p>
          <Auth />
        </>
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
