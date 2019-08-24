import React, { Component } from "react";
import "./Card.css";
export default class Card extends Component {
  // transform: translate(10px, 20px);
  constructor(props) {
    super(props);
    let angle = Math.random() * 90;
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 40 - 20;
    this._transform = `translate(${xPos}px,${yPos}px) rotate(${angle}deg)`;
  }
  render() {
    return (
      <img
        style={{ transform: this._transform }}
        className="card"
        src={this.props.image}
        alt={this.props.name}
      />
    );
  }
}
