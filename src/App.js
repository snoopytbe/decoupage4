import React from "react";
import Formulaire from "./components/Formulaire";
import "./styles/styles.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import { theme, useStyles } from "./styles/styles";

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={6} className={classes.root}>
        <Typography variant="h4">Découpage de dépense</Typography>
        <br />
        <Formulaire />
      </Paper>
    </ThemeProvider>
  );
}
