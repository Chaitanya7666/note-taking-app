import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  notesList: {
    flex: 3,
    borderRight: "1px solid lightgray",

    height: "99vh",
  },
  editor: {
    flex: 7,
  },
  notesListBox: {
    overflowY: "auto",
    maxHeight: "80vh",
  },
  boot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft : "auto",
    marginRight : "auto"
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default useStyles;
