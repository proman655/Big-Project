import { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import "./MyNotes.css";
import axios from "axios";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");
    setNotes(data);
  };
  console.log(notes);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="Welcome Back Christian Silva...">
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {notes.map((note) => (
        <Accordion key={note._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  allignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Header
                  className="AccordionHeaders"
                  as={Card}
                  variant="link"
                  eventkey="0"
                >
                  {note.title}
                </Accordion.Header>
              </span>

              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Body eventkey="0">
              <Card.Body>
                <h4>
                  <Badge bg="success">Category - {note.category}</Badge>
                </h4>

                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    Created On -date
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;