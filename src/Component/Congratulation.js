import React from "react";

const Congratulation = () => {
  return (
    <>
      <div className="login-screen">
        <div className="Congratulations_msg">
          <div className="group-parent m-0" style={{ borderRadius: "10px" }}>
            <div className="group " style={{ borderRadius: "10px" }}>
              <div className="padding-inner pt-2" style={{ borderRadius: "10px" }}>
                <div className="text-center">
                  <img
                    className="img-fluid logo"
                    alt=""
                    src="images/dot.png"
                  />
                </div>
                <h3 className="mb-3 mb-md-3 page-title text-center">
                  Congratulations!
                </h3>

                <p className="text-center mb-3 mb-md-5" style={{ color: "#000" }}>
                  Your account is ready to use. You will be redirected to the
                  Home page in a few second.
                </p>
                <div className="anim-image text-center">
                  <img src="images/animation.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Congratulation;
