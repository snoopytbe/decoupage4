import { createMuiTheme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px 15px",
    margin: "0px auto",
    maxWidth: "600px",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    background: {theme.palette.background},
  }
}));

export const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "#fff",
      default: "#fafafa"
    },
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  typography: {
    h4: { color: "#303f9f" },
    h6: { color: "#7986cb", padding: "10px 0px 5px 0px" }
  },
  overrides: {
    MuiInputBase: {
      root: { fontSize: "0.9rem" }
    }
  }
});
