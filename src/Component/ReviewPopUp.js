import React from "react";
import {Modal} from "react-bootstrap";
import DeleteImage from "../assets/images/deletedot.png";
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import closeIcon from "../assets/images/close-circle.svg";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ReviewPopUp = ({open, setOpen}) => {
    return (
        <>
            <Modal
                centered
                show={open.review}
                onHide={() => {
                    setOpen((pre) => ({...pre, review: false}));
                }}
                dialogClassName="delete-modal"
            >
                <div className="Congratulations_msg p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="m-0">Add Review</h3>
                        <IconButton onClick={() => setOpen((pre) => ({...pre, review: false}))}>
                            <img src={closeIcon} alt=""/>
                        </IconButton>
                    </div>
                    <div className="mt-2" style={{color: "#FFC107", textAlign: "center"}}>
                        <StarIcon/>
                        <StarIcon/>
                        <StarIcon/>
                        <StarIcon/>
                        <StarBorderIcon/>
                    </div>
                    <div className="mt-3">
                        <textarea
                            placeholder="Tell us how we can help"
                            style={{
                                border: "1.5px dashed rgba(0, 0, 0, 0.30)",
                                width: "100%",
                                borderRadius: "8px",
                                padding: "10px",
                                fontSize: "16px",
                                height: "150px"
                            }}
                        />
                    </div>
                    <button className="massageBtn mt-3">Submit</button>
                </div>
            </Modal>
        </>
    )
}

export default ReviewPopUp;