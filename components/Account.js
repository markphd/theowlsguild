import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      console.log(user);

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
      const user = supabase.auth.user();

      const fetchIP = () => {
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
            let address = info.city;

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

            console.log(info);
          })
          .catch((err) => {
            console.error(err);
          });
      };

      if (error) {
        throw error;
      }
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
      <p>
        <h3>Hi {username}</h3>
      </p>
      <p>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </p>

      <p>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </p>

      <p>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </p>
    </div>
  );
}
