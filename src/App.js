import React from "react";
import "./App.css";
import PlayingCard from "./PlayingCard";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      //round winner
      winner: "",
      player1WinCount: 0,
      player2WinCount: 0,
      roundsPlayed: 0,
      reset: false,
      gamesPlayed: 0,
    };
  }

  dealCards = () => {
    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
    }));
  };

  compareCards = () => {
    if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      this.setState({
        winner: "Player 1",
        player1WinCount: this.state.player1WinCount + 1,
      });
    } else if (this.state.currCards[1].rank > this.state.currCards[0].rank) {
      this.setState({
        winner: "Player 2",
        player2WinCount: this.state.player2WinCount + 1,
      });
    } else {
      this.setState({ winner: "Both" });
    }
  };

  overallWinner = () => {
    if (this.state.player1WinCount > this.state.player2WinCount) {
      return "Player 1";
    } else if (this.state.player2WinCount > this.state.player1WinCount) {
      return "Player 2";
    } else {
      return "";
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    // console.log("Update");
    console.log(this.state.reset);
    console.log(this.state.currCards);
    console.log(this.state.reset === false && this.state.currCards === []);
    if (this.state.reset) {
      this.resetGame();
    } else if (this.state.reset !== prevState.reset) {
      this.gamesPlayed();
      console.log("game has been reset");
    } else if (this.state.currCards !== prevState.currCards) {
      this.compareCards();
      this.overallWinner();
      this.setState({ roundsPlayed: this.state.roundsPlayed + 1 });
    }
  }
  resetStateTrue = () => {
    this.setState({ reset: true });
  };
  resetGame = () => {
    console.log("reset game function");
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      winner: "",
      player1WinCount: 0,
      player2WinCount: 0,
      roundsPlayed: 0,
      reset: false,
    });
  };

  gamesPlayed = () => {
    this.setState({ gamesPlayed: this.state.gamesPlayed + 1 });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <PlayingCard currCard={this.state.currCards} />
          {currCardElems}
          <br />
          <button
            onClick={this.dealCards}
            disabled={this.state.cardDeck.length < 2}
          >
            Deal
          </button>
          <h1>{this.state.winner}</h1>
          <h3>Player 1 Score: {this.state.player1WinCount}</h3>
          <h3>Player 2 Score: {this.state.player2WinCount}</h3>
          <h3>Rounds Played: {this.state.roundsPlayed}</h3>
          <h3>Games Played: {this.state.gamesPlayed}</h3>
          {this.state.cardDeck.length <= 0 ? (
            <div>
              <h2>Overall Winner: {this.overallWinner()}</h2>
              <button onClick={this.resetStateTrue}>Reset Game</button>
            </div>
          ) : null}
        </header>
      </div>
    );
  }
}

export default App;
