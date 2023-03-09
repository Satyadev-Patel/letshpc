import { makeStyles } from "@material-ui/styles";


export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Poppins",
    marginTop: "50px",
    backgroundSize: "cover",
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
  txtfield: {
    color: "black",
    fontFamily: "Poppins",
    width: "auto",
  },
  outfield: {
    fontFamily: "Poppins",
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
    fontSize: "1.5rem !important"
  },
}));