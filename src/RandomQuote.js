import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

class RandomQuote extends React.Component {
  constructor() {
    super();
    this.state = {
      random_quote: {},
      local: [],
      showSaveButton: true,
    };
    this.saveLocal = this.saveLocal.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://api.quotable.io/random")
      .then((response) => {
        const random_quote = response.data;
        this.setState({ random_quote });
      })
      .catch((err) => {
        alert(err);
      });
    this.setState({ showSaveButton: true });
    if (JSON.parse(localStorage.getItem("saved_quotes")) != null) {
      let local = JSON.parse(localStorage.getItem("saved_quotes"));
      this.setState({ local });
    }
  }

  saveLocal() {
    this.setState({ showSaveButton: false });
    this.state.local.push(this.state.random_quote);
    localStorage.setItem("saved_quotes", JSON.stringify(this.state.local));
  }

  render() {
    return (
      <div>
        <h2>Quote</h2>
        <hr />
        <span>{this.state.random_quote.content}</span>
        <p>~{this.state.random_quote.author}</p>
        {this.state.showSaveButton ? (
          <Button variant="success" onClick={this.saveLocal}>
            Save to Local
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            Saved
          </Button>
        )}
        <hr />
        <Button
          onClick={() => {
            this.componentDidMount();
          }}
        >
          Get Another Quote
        </Button>
      </div>
    );
  }
}

export default RandomQuote;
