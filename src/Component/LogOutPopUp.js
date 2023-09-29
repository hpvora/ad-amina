import React from "react";
import { Modal } from "react-bootstrap";
import DeleteImage from "../assets/images/deletedot.png"

const LogOutPopUp = ({ logOutData, setlogOutData, onConfirm }) => {
  return (
    <>
      <Modal
        centered
        show={logOutData.modalOpen}
        onHide={() => {
          setlogOutData({ ...logOutData, modalOpen: false });
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
                  {logOutData.mode == "logout" ? "Logout!" : "Delete Account!"}
                </h3>

                <p className="text-center mb-3 mb-md-5" style={{ color: "#000" }}>
                  {logOutData.mode == "logout"
                    ? "Are you sure you would like to sign out of your account?"
                    : "Are you sure you would like to Delete Your Account?"}
                </p>
                <div className="w-100 d-flex">
                  <div className="col-6">
                    <button type="submit" className="btn_admina delete-button" onClick={() => {
                        setlogOutData({ ...logOutData, modalOpen: false });
                    }}>
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn_admina delete-confirm-button"
                      onClick={() => {
                        onConfirm();
                      }}
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
    </>
  );
};

export default LogOutPopUp;
