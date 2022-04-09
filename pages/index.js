import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Head from "next/head";

export default function Home() {
  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      <Head>
        <title>The Owls Guild — Home</title>
      </Head>
      <div className="brand">
        <h1>Scoreboard</h1>
        <div className="logo"></div>
      </div>
      <Account />
    </div>
  );
}
