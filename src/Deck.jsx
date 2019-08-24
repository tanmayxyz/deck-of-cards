import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";
const DECK_URL =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let res = await axios.get(DECK_URL);
    this.setState({ deck: res.data });
  }
  async getCard() {
    try {
      let res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=1`
      );
      console.log(res.data);

      if (res.data.cards.length === 0) {
        throw new Error("No cards found");
      }

      let card = res.data.cards[0];
      this.setState(ste => {
        return {
          drawn: [
            ...ste.drawn,
            {
              id: card.code,
              image: card.image,
              name: `${card.value} of ${card.suit}`
            }
          ]
        };
      });
    } catch (err) {
      alert(err);
    }
  }
  render() {
    let cards = this.state.drawn.map(c => (
      <Card image={c.image} name={c.name} key={c.id} />
    ));
    return (
      <div>
        <h2 className="deck-title">Card Dealer</h2>
        <button onClick={this.getCard}>Trade</button>
        <br />
        <div className="card-area">{cards}</div>
      </div>
    );
  }
}
