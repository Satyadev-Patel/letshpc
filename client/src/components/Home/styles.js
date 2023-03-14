import { makeStyles } from "@material-ui/styles";


export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Poppins",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundColor: "black",
    overflowX: "hidden",
  },
  grid: {
    display: "grid",
    gridAutoRows: "60px",
    gridGap: "20px",
    fontFamily: "Poppins"
  },
  gridItem:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins"
  },
  formBtn: {
    fontFamily: "Poppins",
    marginBottom: "20px",
    marginTop: "10px",
    minWidth: "30px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  title: {
    marginLeft: "100px",
    color: "white",
    fontSize: "4rem",
  },
}));