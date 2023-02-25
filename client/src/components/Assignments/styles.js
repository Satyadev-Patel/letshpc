import { makeStyles } from "@material-ui/styles";


export const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    fontFamily: "Poppins",
    backgroundSize: "auto",
    backgroundColor:"#DEF1F0"
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
    margin: "40px"
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
    fontFamily: "Poppins",
    marginBottom: "20px",
    marginTop: "100px",
    marginLeft: "20px",
    color: "black"
  },
  card: {
    margin:"20px"
  }
}));