import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Scholar(player) {
  const [stats, setStats] = useState(null);
  const [lastSlpClaim, setLastSlpClaim] = useState(null);

  useEffect(() => {
    fetch(
      `https://game-api.skymavis.com/game-api/clients/${player.address}/items/1`
    )
      .then(async (response) => {
        let info = await response.json();
        info.days = moment
          .utc(info.last_claimed_item_at * 1000)
          .local()
          .add("days", 14)
          // .format("MMMM Do, h:mma");
          .format("YYYY-MM-DD, h:mma");

        // console.log(days);
        setStats(info);
      })
      .catch((err) => {
        console.error(err);
      });

    // fetch(
    //   `https://explorer.roninchain.com/api/tokentxs?addr=${player.address}&from=0&size=10&token=ERC20`,
    //   {
    //     mode: "cors",
    //   }
    // ).then(async (response) => {
    //   let txns = await response.json();
    //   // let { results } = txns;

    //   // if (results[0]?.token_symbol === "SLP") {
    //   //   let txDate = moment
    //   //     .utc(results[0].timestamp * 1000)
    //   //     .local()
    //   //     .format("YYYY-MM-DD, h:mma");
    //   //   let value = results[0].value;
    //   //   // console.log(txDate, "LAST CLAIM")
    //   //   setLastSlpClaim({ timestamp: txDate, value: value });
    //   // } else {
    //   //   setLastSlpClaim("N/A");
    //   // }
    //   console.log(txns);
    //   // console.log(results[0].value, "TRANSACTION");
    // });
  }, [player.address]);

  return (
    <tr key={Math.random(23)}>
      <td className="name">
        <span>{player.name}</span>
        <a
          className="link"
          href={`https://explorer.roninchain.com/address/${player.address}`}
        >
          {player.alias} ↗
        </a>
      </td>
      {/* <td className="timestamp">{lastSlpClaim?.timestamp}</td> */}
      {/* <td className="total">{lastSlpClaim?.value} SLP</td> */}
      <td className="total">{stats?.total} SLP</td>
      <td className="timestamp">{stats?.days}</td>
    </tr>
  );
}
