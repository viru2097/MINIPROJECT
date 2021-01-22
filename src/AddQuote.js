import React from "react";
import swal from "sweetalert";
import { Button } from "react-bootstrap";

class AddQuote extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      author: "",
      local: [],
    };
    this.handleQuote = this.handleQuote.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleQuote(e) {
    this.setState({ content: e.target.value });
  }

  handleAuthor(e) {
    this.setState({ author: e.target.value });
  }

  handleSave(e) {
    e.preventDefault();
    if (this.state.content.length === 0 || this.state.author.length === 0) {
      swal("Oops!", "Please fill details!", "error");
    } else {
      let new_q = {
        content: this.state.content,
        author: this.state.author,
      };
      this.state.local.push(new_q);
      this.setState({
        content: "",
        author: "",
      });
      localStorage.setItem("saved_quotes", JSON.stringify(this.state.local));
      swal("Success!", "Quote saved successfully!", "success");
    }
  }

  componentDidMount() {
    let local = localStorage.getItem("saved_quotes")
      ? JSON.parse(localStorage.getItem("saved_quotes"))
      : [];
    this.setState({ local });
  }

  render() {
    return (
      <div>
        <h2>Add Quote</h2>
        <form>
          <textarea
            rows="7"
            cols="30"
            value={this.state.content}
            onChange={this.handleQuote}
            placeholder="Enter Quote"
          ></textarea>{" "}
          <br />
          <textarea
            rows="1"
            cols="30"
            value={this.state.author}
            onChange={this.handleAuthor}
            placeholder="Enter Author name"
          ></textarea>{" "}
          <br />
          <Button variant="success" onClick={this.handleSave}>
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default AddQuote;
