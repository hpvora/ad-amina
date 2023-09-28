import React from "react";

const Congratulation = () => {
  return (
    <>
      <div class="login-screen">
        <div class="Congratulations_msg">
          <div class="group-parent m-0" style={{ borderRadius: "10px" }}>
            <div class="group " style={{ borderRadius: "10px" }}>
              <div class="padding-inner pt-2" style={{ borderRadius: "10px" }}>
                <div class="text-center">
                  <img
                    class="img-fluid logo"
                    alt=""
                    src="images/dot.png"
                  />
                </div>
                <h3 class="mb-3 mb-md-3 page-title text-center">
                  Congratulations!
                </h3>

                <p class="text-center mb-3 mb-md-5" style={{ color: "#000" }}>
                  Your account is ready to use. You will be redirected to the
                  Home page in a few second.
                </p>
                <div class="anim-image text-center">
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
