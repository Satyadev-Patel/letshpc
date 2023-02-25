import { makeStyles } from "@material-ui/styles";


export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "Poppins",
    minHeight: "100vh",
    backgroundColor: "#37FDFC",
  },
  grid: {
    fontFamily: "Poppins",
    marginTop: "50px"
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins"
  },
  txtfield: {
    color: "#fff!important",
    fontFamily: "Poppins",
    width: "auto",
    height: "60px",
    margin: "20px",
  },
  outfield: {
    fontFamily: "Poppins",
    fontSize: "2rem",
    marginBottom: "10px",
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& label.Mui-disabled": {
      color: "red",
    },
  },
  formBtn: {
    fontFamily: "Poppins !important",
    marginLeft: "20px !important",
    marginTop: "10px",
    height: "40px",
  },
  scroll: {
    display: "block",
    border: "0px solid red",
    padding: "5px",
    marginTop: "5px",
    width: "100 %",
    overflowY: "scroll"
  }
}));