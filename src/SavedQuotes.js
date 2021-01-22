import React from "react";
import { Button } from "react-bootstrap";

class SavedQuotes extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      author: "",
      local: [],
    };
    this.getQuote = this.getQuote.bind(this);
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("saved_quotes") != null)) {
      const local = JSON.parse(localStorage.getItem("saved_quotes"));
      this.setState((prevState) => {
        prevState.local = local;
        return {
          local: prevState.local,
          content: local.length !== 0 ? local[0].content : "",
          author: local.length !== 0 ? local[0].author : "",
        };
      });
    }
  }

  getQuote() {
    let len = this.state.local.length;
    let random_index = Math.floor(Math.random() * len);
    this.setState({
      content: this.state.local[random_index]["content"],
      author: this.state.local[random_index]["author"],
    });
  }

  render() {
    return (
      <div>
        {this.state.local.length === 0 ? (
          <h2 className="error" style={{ color: "red" }}>
            {" "}
            No Quotes to Show!
          </h2>
        ) : (
          <div>
            <h2>Random Quote (Local)</h2>
            {this.state.content && (
              <div>
                <hr />
                <span>{this.state.content}</span>
              </div>
            )}
            {this.state.author && <p>~{this.state.author}</p>}
            {this.state.local.length > 0 && (
              <div>
                <Button onClick={this.getQuote}>Get Another Quote</Button>
                <hr />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SavedQuotes;
