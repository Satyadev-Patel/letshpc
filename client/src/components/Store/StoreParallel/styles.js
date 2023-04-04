import { makeStyles } from "@material-ui/styles";


export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins",
    minHeight: "100vh",
    backgroundColor: "#37FDFC",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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
    color: "#fff!important",
    fontFamily: "Poppins",
    width: "auto",
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
    fontFamily: "Poppins",
    marginBottom: "20px",
    marginTop: "10px",
  },
}));