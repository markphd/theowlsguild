import React, { useState, useEffect } from "react";
import moment from "moment";

const scholars = {
  players: [
    {
      name: "dan",
      address: "0x436c6c586034ba8b070373c9da5873df3ccde9db",
      alias: "Powerful Owl",
    },
    {
      name: "rodel",
      address: "0x524de36943a744431d17b816151710793ae4b7ee",
      alias: "Great Horned Owl",
    },
    {
      name: "ryan",
      address: "0x0300435252c760e1410d0616bd1f5252147abc38",
      alias: "Great Grey Owl",
    },
    {
      name: "ellice",
      address: "0x4feb4da58271cb0131fcc66aacb67716c430a1b7",
      alias: "Elf Owl",
    },
    {
      name: "bj",
      address: "0x8f8b368660c1b5a496387bafaf88d49ee30d3826",
      alias: "Brown Wood Owl",
    },
    {
      name: "rica",
      address: "0x8e4f19f3792315636d5a15a880043498698f6fb5",
      alias: "Rock Eagle Owl",
    },
    {
      name: "anthony",
      address: "0x585b5ebc1629689903ad19287c929c75ef067528",
      alias: "Austral Pygmy Owl",
    },
  ],
  get latest() {
    if (this.players.length === 0) {
      return undefined;
    }
    // for (const player in this.players) {
    //   if (Object.hasOwnProperty.call(this.players, player)) {
    //     const address = this.players[player].address;

    //     console.log(address, "ELEEMENTT");

    //   }
    // }
  },
};

export default function Scholar(player) {
  const [stats, setStats] = useState(null);

  // console.log(player, "PLAYYER");
  useEffect(() => {
    fetch(
      `https://game-api.skymavis.com/game-api/clients/${player.address}/items/1`
    )
      .then(async (response) => {
        let info = await response.json();
        info.days = moment
          .utc(info.last_claimed_item_at * 1000)
          .add("days", 14)
          .format("MMMM Do, h:mma");
        // console.log(days);
        setStats(info);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [player.address]);

  return (
    <tr key={Math.random(23)}>
      <td>
        <a href={`https://explorer.roninchain.com/address/${player.address}`}>
          {player.alias} ↗
        </a>
      </td>
      <td className="name">{player.name}</td>
      <td>{stats?.total}</td>
      <td>{stats?.days} </td>
    </tr>
  );
}
