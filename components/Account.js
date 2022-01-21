import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Store from "store";
import Scholar from "./Scholar";
import players from "../data/players.json";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  // const [quote, setQuote] = useState(0);

  // const quotes = [
  //   "An inch forward today will make a foot of a difference tomorrow -Aly El-Ganzouri",
  //   "Whatever the mind can conceive and believe, it can achieve -Napoleon Hill",
  //   "Impossible is just a big word thrown around by small men who find it easier to live in the world they've been given than to explore the power they have to change it. Impossible is not a fact. It's an opinion. Impossible is not a declaration. It's a dare. Impossible is potential. Impossible is temporary. Impossible is nothing. -Muhammad Ali",
  //   "You can fail at what you don't want, so you might as well take a chance at doing what you love -Jim Carrey",
  //   "It is better to be prepared for an opportunity and not have one, than to have an opportunity and not be prepared -Whitney Young, Jr.",
  //   "Take advantage of the opportunity of a lifetime, in the lifetime of the opportunity. -Eric Thomas",
  //   "Work in silence, let the success make the noise -Frank Ocean",
  //   "On the one hand, we all want to be happy. On the other hand, we all know the things that make us happy. But we don't do those things. Why? Simple. We are too busy. Too busy doing what? Too busy trying to be happy. -Matthew Kelly",
  //   "There is nothing to fear, because I cannot fail - only learn, grow, and become better than I've ever been before -Hal Elrod",
  //   "Pain is temporary. It may last a minute, or an hour, or a day, or a year, but eventually it will subside and something else will take its place. If I quit however, it lasts forever. -Lance Armstrong",
  // ];

  useEffect(() => {
    if (Store.get("online") === undefined) {
      Store.set("online", playing);
    }
    getProfile();
  }, [session, playing]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function togglePlay({ username }) {
    try {
      setLoading(true);

      setPlaying(!playing);
      Store.set("online", !playing);

      const user = supabase.auth.user();
      fetch("https://ipapi.co/json/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //"x-api-key": apiKey,
        },
      })
        .then(async (response) => {
          let info = await response.json();
          let ip = info.ip;
          let isp = info.org;
          let city = info.city;
          let started_at = playing ? null : new Date();
          let ended_at = playing ? new Date() : null;

          const updates = {
            created_at: new Date(),
            reported_by: user.id,
            ip,
            isp,
            city,
            started_at,
            ended_at,
          };

          let { error } = await supabase.from("logs").insert(updates, {
            returning: "minimal", // Don't return the value after inserting
          });

          if (error) {
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <h3>{!loading && `Hello ${username}`} </h3>
      {!loading && username !== "Manager" ? (
        <>
          <label htmlFor="play">Axie Terms</label>
          <ul className="terms">
            <li>you can only play on on one account in any 24-hour period. </li>
            <li>
              {" "}
              you will not manipulate the energy system, such as gifting Axies
              to make use of more energy
            </li>
            <li> you will not login another Axie team not authorized by TOG</li>
            <li>
              {" "}
              you will not manipulate the device timezone to speed up energy
              reset
            </li>
          </ul>

          <p>
            <button
              className="button block primary"
              onClick={() => togglePlay({ username })}
              disabled={loading}
              data-playing={playing}
            >
              {playing ? "End game" : "Start game"}

              {console.log(playing)}
            </button>
          </p>
        </>
      ) : (
        <table>
          <thead>
            <tr>
              <th colSpan="1">Team</th>
              <th colSpan="1">Last Claim Date</th>
              <th colSpan="1">Last Claimed SLP</th>
              <th colSpan="1">Next Claim Date</th>
              <th colSpan="1">Total SLP</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              players.map((player) => (
                <Scholar
                  name={player.name}
                  address={player.address}
                  alias={player.alias}
                  key={Math.random(23)}
                />
              ))}
          </tbody>
        </table>
      )}

      {/* <pre>
        (6) you will not use the Site, the App, and the Smart Contracts for any{" "}
        <br />
        illegal and unauthorized purpose; and (7) your use of the Site, the App,
        <br />
        and the Smart Contracts will not violate any applicable law or
        <br />
        regulation. If you provide any information that is untrue, inaccurate,
        <br />
        not current, or incomplete, we have the right to suspend or terminate
        <br />
        your account and refuse any and all current or future use of the Site,
        <br />
        the App, and the Smart Contracts (or any portion thereof). (8) you can
        <br />
        only play on on one account in any 24-hour period. (9) you, as an Axie
        <br />
        owner, are responsible for the actions of any "scholars" (players hired
        <br />
        by you) that play on your behalf, and that their actions can have
        <br />
        consequences for any connected accounts that you own. (10) you will not
        <br />
        manipulate the energy system, such as gifting Axies to make use of more
        <br />
        energy (This goes under multi-accounting). (11) you have not been
        <br />
        included in any trade embargoes or economic sanctions list (such as
        <br />
        united nations security council sanctions list), the list of specially
        <br />
        designated nationals maintained by ofac (the office of foreign assets
        <br />
        control of the u.s. department of the treasury), or the denied persons
        <br />
        or entity list of the u.s. department of commerce. Axie Infinity Limited
        <br />
        reserves the right to choose markets and jurisdictions to conduct
        <br />
        business, and may restrict or refuse, in its discretion, the provision
        <br />
        of Axie Infinity services in certain countries or regions.
        <br />
        <br />
        https://axieinfinity.com/terms/
      </pre> */}

      {/* <p>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </p> */}
    </div>
  );
}
