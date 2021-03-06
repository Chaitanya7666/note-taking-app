import React,{ useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NotesContext } from "../../../contexts/NotesContext";
import changeNoteDocContent from "../../../firebaseFunctions/changeNoteDocContent";
import deleteNoteFromFirestore from "../../../firebaseFunctions/deleteNoteFromFirestore";
import addToTrashCollection from "../../../firebaseFunctions/addToTrashCollection";
import useStyles from "./styles";
import {
  Box,
  Typography,
  TextField,
  InputBase,
  IconButton,
  Button,
  Slide,
  Snackbar
} from "@material-ui/core";
import changeNoteDocTitle from "../../../firebaseFunctions/changeNoteDocTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { DarkModeContext } from "../../../contexts/DarkModeContext";
import DarkModeEditor from "./DarkModeEditor/DarkModeEditor";
import LightModeEditor from "./LightModeEditor/LightModeEditor";



const TextEditor = ({ roomId }) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { notes } = useContext(NotesContext);
  const { darkMode } = useContext(DarkModeContext);
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = (value) => {
    setText(value);
    changeNoteDocContent(value, roomId);
  };

  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
    changeNoteDocTitle(e.target.value, roomId);
  };

  const handleDelete = () => {
    handleClick(TransitionLeft);

    const noteToDelete = notes?.find((note) => note.id === roomId);
    addToTrashCollection(roomId, { ...noteToDelete });

    //  deleteNoteFromFirestore(roomId);

    // if (notes.length > 1) {
    //   history.push(`/notes/${notes[1].id}`);
    // }
    // if(notes.length===1){
    //   history.push("/home")
    // }
  };

  useEffect(() => {
    if (notes.length > 1) {
      history.push(`/notes/${notes[0].id}`);
    }
    if (notes.length === 0) {
      // history.push("/home");
    }
  }, [notes.length]);

  useEffect(() => {
    const note = notes.find((note) => note.id === roomId);
    setTitle(note?.title);
    setText(note?.content);
  }, [roomId]);

  // useEffect(() => {
  //   console.log(darkMode);
  // }, [darkMode]);

  

  return (
    <Box className={classes.editorContainer}>
      <Box className={classes.noteTitleInputBox}>
        <InputBase
          id="standard-basic"
          value={title}
          className={classes.noteTitleInput}
          color="primary"
          onChange={handleTitleChange}
          placeholder="Title here..."
        />
        <Button color="primary" variant="outlined">
          Save
        </Button>
        <IconButton onClick={handleDelete} >
          <DeleteIcon color="primary" className={classes.noteDeleteIcon} />
        </IconButton>
      </Box>

      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="Note Deleted!"
        key={transition ? transition.name : ""}
        autoHideDuration={1000}
      />

      {/* <ReactQuill value={text} onChange={handleChange} /> */}
      {!darkMode ? (
        <LightModeEditor text={text} handleChange={handleChange} />
      ) : (
        <DarkModeEditor text={text} handleChange={handleChange} />
      )}


    </Box>
  );
};

export default TextEditor;
