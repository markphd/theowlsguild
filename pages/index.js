import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Head from "next/head";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleAdminLogin = async () => {
    try {
      console.log("FIRED");
      const { error } = await supabase.auth.signIn({
        email: "guild@theowls.quest",
      });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
    }
  };

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      <Head>
        <title>The Owls Guild — Home</title>
      </Head>
      <div className="brand">
        <div className="logo"></div>
        {/* <h1 className="header">Portal</h1> */}
        <button className="admin-button" onClick={() => handleAdminLogin()}>
          Admin Portal
        </button>
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
