import React, { useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { AppContext } from "../../App";
import { useGameState } from "../../socket_io/GameIO";
import GamePrompt from "./GamePrompt";
import GameBoard from "./GameBoard";
import Chat from "../chat/Chat";
import "./Game.css";

function Game(props) {
  const { gameIO } = useContext(AppContext);
  const [matchId, setMatchId] = useState("");
  const [player, setPlayer] = useState(null);
  const gameState = useGameState(gameIO.state);

  useEffect(() => {
    // set game data from game lobby data
    const matchId = props.location.state
      ? props.location.state.matchId
      : "ASDF"; // dummy data
    const user = props.location.state
      ? props.location.state.user
      : { id: "1234", name: "Tony" }; // dummy data
    const role = props.location.state ? props.location.state.role : "Spymaster"; // dummy data
    const player = { user, role };

    if (matchId && user) {
      setMatchId(matchId);
      setPlayer(player);
    } else {
      props.history.push({ pathname: "/" });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Grid container justify="space-evenly">
        <Grid item xs>
          <Chat />
        </Grid>
        <Grid item xs={9} className="game-panel">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item className="game-prompt">
              <GamePrompt gameState={gameState} />
            </Grid>
            <Grid item>
              <GameBoard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Game;
