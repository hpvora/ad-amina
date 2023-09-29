import React from 'react';
import {IconButton} from "@mui/material";
import closeIcon from "../assets/images/close-circle.svg";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {Modal} from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';

const ServicePopUP = ({open, setOpen}) => {
    return (
        <>
            <Modal
                centered
                show={open.service}
                onHide={() => {
                    setOpen((pre) => ({...pre, service: false}));
                }}
                dialogClassName="delete-modal"
            >
                <div className="Congratulations_msg p-4" style={{boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.12)"}}>
                    <div>
                        <IconButton sx={{
                            background: "linear-gradient(270deg, #DAE1AE 0%, #ABD5B4 99.79%)",
                            display: "flex",
                            marginLeft: "auto",
                            alignItems: "flex-end"
                        }}
                        onClick={() => setOpen((pre) => ({...pre, service: false}))}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className="text-center mt-3">
                        <h3>Cupping Therapy</h3>
                        <h3>$25</h3>
                        <p>3 Hours</p>
                    </div>
                    <div className="mt-4">
                        <h5 style={{fontWeight: "600"}}>Description</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ServicePopUP;