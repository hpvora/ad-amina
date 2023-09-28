import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const leftarrowStyle = {
    background: "linear-gradient(90deg, #0dbcec, #ffc056)",
    border: 0,
    color: "#fff",
    fontSize: "80px",
    position: "absolute",
    top: "50%",
    left: "0",
    height: "30px",
    width: "30px",
    borderRadius: "50%",
};
const rightarrowStyle = {
    background: "linear-gradient(90deg, #0dbcec, #ffc056)",
    border: 0,
    color: "#fff",
    fontSize: "80px",
    position: "absolute",
    top: "50%",
    right: "0",
    height: "30px",
    width: "30px",
    borderRadius: "50%",
};

export const CustomLeftArrow = ({ onClick }) => {
    return (
        <button onClick={onClick} style={leftarrowStyle}>
            <ChevronLeftIcon style={{display: "flex"}}/>
        </button>
    )
}
export const CustomRightArrow = ({ onClick }) => {
    return (
        <button onClick={onClick} style={rightarrowStyle}>
            <ChevronRightIcon style={{display: "flex"}}/>
        </button>
    )
}