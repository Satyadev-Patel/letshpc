import { makeStyles } from "@material-ui/styles";


export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Poppins",
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "auto",
  },
  grid: {
    margin: "20px",
    fontFamily: "Poppins"
  },
  gridItem:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins"
  },
  txtfield: {
    color: "#fff!important",
    fontFamily: "Poppins",
    width: "auto",
  },
  outfield: {
    marginBottom: "10px",
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& label.Mui-disabled": {
      color: "red",
    },
  },
  formBtn: {
    fontFamily: "Poppins !important",
    marginTop: "10px",
    marginBottom:"20px",
    height: "60px", 
    fontSize: "1.5rem !important"
  },
}));