import { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import {
  Accordion,
  Badge,
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import "./MyNotes.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Placeholder from "../../pictures/card-placeholder.jpg";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);
  const history = useHistory();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    successCreate,
    history,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}..`}>
      <Link to="createnote">
        <Button style={{ marginLeft: 15, marginBottom: 10 }} size="lg">
          Create New Project
        </Button>
      </Link>
      <Container fluid>
        <Row xs={1} md={3} className="g-4">
          {errorDelete && (
            <ErrorMessage variant="danger"> {errorDelete}</ErrorMessage>
          )}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          {notes
            ?.reverse()
            .filter((filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((note) => (
              <Col className="singleCards">
                <Card
                  class="card h-200"
                  style={{ width: "18rem" }}
                  style={{ flex: 1 }}
                >
                  <Card.Img variant="top" src={Placeholder} />
                  <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <hr />
                    <Card.Text>
                      <h4>
                        <Badge bg="success">Category - {note.category}</Badge>
                      </h4>
                      <ListGroup variant="flush">
                        <Card.Text key={note._id} />
                        <p>{note.content}</p>
                      </ListGroup>
                    </Card.Text>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                  <Card.Footer>
                    Created on{" "}
                    <cite title="Source Title">
                      {note.createdAt.substring(0, 10)}
                    </cite>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </MainScreen>
  );
};

export default MyNotes;
