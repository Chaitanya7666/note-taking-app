import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import React, { useContext } from "react";
import returnStyles from "./styles";
import { useHistory } from "react-router-dom";
import { TrashNotesContext } from "../../../../contexts/TrashNotesContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreIcon from "@material-ui/icons/Restore";
import deleteFromTrash from "../../../../firebaseFunctions/deleteFromTrash";
import restoreFromTrash from "../../../../firebaseFunctions/restoreFromTrash";
import truncate from "../../../../utils/truncate";
import { DarkModeContext } from "../../../../contexts/DarkModeContext";

const HomeNotesGrid = () => {
  const { trashNotes } = useContext(TrashNotesContext);
  const { darkMode } = useContext(DarkModeContext);
  const classes = returnStyles(darkMode)();
  const history = useHistory();

  const handleRestoreFromTrash = (id) => {
    const noteToRestore = trashNotes.find((note) => note.id === id);
    restoreFromTrash(id, { ...noteToRestore });
  };

  return trashNotes?.length === 0 ? (
    <Paper className={classes.emptyTrash} elevation={11}>
      <Typography variant="h5" color="secondary" align="center">
        Your trash is empty!
      </Typography>
    </Paper>
  ) : (
    <Grid container spacing={1} className={classes.homeNotesCardsGrid}>
      {trashNotes.map((eachNote) => (
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          // onClick={() => handleNotePaperClick(eachNote)}
        >
          <Paper className={classes.eachNotePaper} elevation={5}>
            <Box>
              <Typography color="primary" variant="h6" align="center">
                {eachNote.title}
              </Typography>
              <Divider className={classes.divider} />

              <Box
                className={classes.contentBox}
                dangerouslySetInnerHTML={{ __html: truncate(eachNote.content) }}
              />
              <Divider className={classes.divider} />
              <Box className={classes.footerBox}>
                <IconButton
                  onClick={() => deleteFromTrash(eachNote.id)}
                  className={classes.permanentlyDeleteIcon}
                >
                  <Tooltip title="Delete permanently">
                    <DeleteForeverIcon />
                  </Tooltip>
                </IconButton>
                <IconButton
                  onClick={() => handleRestoreFromTrash(eachNote.id)}
                  className={classes.archiveTrashItemIcon}
                >
                  <Tooltip title="Restore">
                    <RestoreIcon />
                  </Tooltip>
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeNotesGrid;
