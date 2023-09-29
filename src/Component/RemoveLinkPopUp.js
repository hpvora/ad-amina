import React from 'react';
import DeleteImage from "../assets/images/deletedot.png";
import {Modal} from "react-bootstrap";


const RemoveLinkPopUp = ({setOpen, open}) => {
    return(
        <Modal
            centered
            show={open.link}
            onHide={() => {
                setOpen((pre) => ({...pre, link: false}));
            }}
            dialogClassName="delete-modal"
        >
            <div className="Congratulations_msg">
                <div className="group-parent m-0" style={{ borderRadius: "10px" }}>
                    <div className="group " style={{ borderRadius: "10px" }}>
                        <div className="padding-inner pt-2" style={{ borderRadius: "10px" }}>
                            <div className="text-center">
                                <img
                                    className="img-fluid logo"
                                    alt=""
                                    src={DeleteImage}
                                />
                            </div>
                            <h3 className="mb-3 mb-md-3 page-title text-center">
                                Remove Field!
                            </h3>

                            <p className="text-center mb-3 mb-md-5" style={{ color: "#000" }}>
                                Are you sure you would like to remove this Field?
                            </p>
                            <div className="w-100 d-flex">
                                <div className="col-6">
                                    <button type="submit" className="btn_admina delete-button" onClick={() => {
                                        setOpen((pre) => ({...pre, link: false}));
                                    }}>
                                        Cancel
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button
                                        type="submit"
                                        className="btn_admina delete-confirm-button"
                                        // onClick={() => {
                                        //     onConfirm();
                                        // }}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default RemoveLinkPopUp;