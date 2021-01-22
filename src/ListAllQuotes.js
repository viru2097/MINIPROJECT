import React,{useEffect,useState} from "react";
import swal from "sweetalert";
import { Button } from "react-bootstrap";

function ListAllQuotes(){

      const [local,setLocal]= useState([]);
      const [isEdit,setisEdit] = useState(false);
      const [iValue,setIvalue] = useState();
      const [quote,setQuote] = useState({
        content: "",
        author: "",
      });
  
  useEffect(()=>{
    if (JSON.parse(localStorage.getItem("saved_quotes") != null)) {
      const local = JSON.parse(localStorage.getItem("saved_quotes"));
      setLocal(local);
    }
  });

 const  handleDelete=(e, i)=>{
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Quote?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        local.splice(i,1);
        localStorage.setItem("saved_quotes", JSON.stringify(local));
        setLocal(local);
        
        // this.setState((prevState) => {
        //   prevState.local.splice(i, 1);
        //   localStorage.setItem("saved_quotes", JSON.stringify(prevState.local));
        //   return {
        //     local: prevState.local,
        //   };
        // });
        swal("Deleted!", "Quote has been deleted!", "success");
      }
    });
  }

  const handleEdit = (e, i) => {
    setisEdit(true);
    setIvalue(i);
    setQuote({...quote,content:local[i].content,author:local[i].author})
    // this.setState((prevState) => {
    //   return {
    //     isEdit: true,
    //     iValue: i,
    //     content: prevState.local[i].content,
    //     author: prevState.local[i].author,
    //   };
    // });
  };

 const  handlecontent = (e) => {
    setQuote({...quote,content:e.target.value });
  };

  const handleAuthor = (e) => { 
    setQuote({...quote, author:e.target.value});
  };

 const handleSave = (e, i) => {
    e.preventDefault();
    console.log(local,"Local");
    console.log(i,"I am i");
    local[i]={content:quote.content,author:quote.author};
    localStorage.setItem("saved_quotes", JSON.stringify(local));
    setLocal([...local]);

    setisEdit(false);

    // this.setState((prevState) => {
    //   prevState.local[i].content = prevState.content;
    //   prevState.local[i].author = prevState.author;
    //   localStorage.setItem("saved_quotes", JSON.stringify(prevState.local));
    //   return {
    //     isEdit: false,
    //     local: prevState.local,
    //   };
    // });
    swal("Success!", "Quote updated successfully!", "success");
  };

 const  handleCancel = () => {
    setisEdit(false);
  };

  
    return (
      <div>
        {local.length > 0 ? (
          <div>
            <br />
            <ul>
              {isEdit
                ? local.map((q, i) => {
                    if (i === iValue) {
                      return (
                        <form key={i}>
                          <textarea
                            rows="4"
                            cols="50"
                            value={quote.content}
                            placeholder="Enter Quote"
                            onChange={(e) => {
                              handlecontent(e, iValue);
                            }}
                          ></textarea>
                          <br />
                          <textarea
                            rows="1"
                            cols="50"
                            value={quote.author}
                            placeholder="Enter Author name"
                            onChange={(e) => {
                              handleAuthor(e, iValue);
                            }}
                          ></textarea>
                          <br />
                          <Button
                            variant="success"
                            onClick={(e) => {
                              handleSave(e, iValue);
                            }}
                          >
                            Update
                          </Button>{" "}
                          <Button
                            variant="secondary"
                            onClick={(e) => {
                              handleCancel(e, iValue);
                            }}
                          >
                            Cancel
                          </Button>
                          <hr></hr>
                        </form>
                      );
                    }
                    return (
                      <div key={i}>
                        <p>{q.content}</p>
                        <p>~{q.author}</p>
                        <Button
                          onClick={(e) => {
                            handleEdit(e, i);
                          }}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            handleDelete(e, i);
                          }}
                        >
                          Delete
                        </Button>
                        <hr></hr>
                      </div>
                    );
                  })
                : local.map((q, i) => {
                    return (
                      <div key={i}>
                        <p>{q.content}</p>
                        <p>~{q.author}</p>
                        <Button
                          onClick={(e) => {
                            handleEdit(e, i);
                          }}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            handleDelete(e, i);
                          }}
                        >
                          Delete
                        </Button>
                        <hr></hr>
                      </div>
                    );
                  })}
            </ul>
          </div>
        ) : (
          <h2 className="error" style={{ color: "red" }}>
            No Quotes to Show!
          </h2>
        )}
      </div>
    );
  }


export default ListAllQuotes;
