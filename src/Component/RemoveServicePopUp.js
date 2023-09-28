import React from 'react';
import DeleteImage from "../assets/images/deletedot.png";
import {Modal} from "react-bootstrap";

const RemoveServicePopUp = ({setOpen, open}) => {
    return(
        <Modal
            centered
            show={open.service}
            onHide={() => {
                setOpen((pre) => ({...pre, service: false}));
            }}
            dialogClassName="delete-modal"
        >
            <div class="Congratulations_msg">
                <div class="group-parent m-0" style={{ borderRadius: "10px" }}>
                    <div class="group " style={{ borderRadius: "10px" }}>
                        <div class="padding-inner pt-2" style={{ borderRadius: "10px" }}>
                            <div class="text-center">
                                <img
                                    class="img-fluid logo"
                                    alt=""
                                    src={DeleteImage}
                                />
                            </div>
                            <h3 class="mb-3 mb-md-3 page-title text-center">
                                Session Price
                            </h3>

                            <p class="text-center mb-3 mb-md-5" style={{ color: "#000" }}>
                                Are you sure you would like to remove this service?
                            </p>
                            <div className="w-100 d-flex">
                                <div className="col-6">
                                    <button type="submit" class="btn_admina delete-button" onClick={() => {
                                        setOpen((pre) => ({...pre, service: false}));
                                    }}>
                                        Cancel
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button
                                        type="submit"
                                        class="btn_admina delete-confirm-button"
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

export default RemoveServicePopUp;