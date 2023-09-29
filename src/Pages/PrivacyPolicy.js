import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <section className="main-page pt-0">
        <div className="main-inner">
          <div className="container">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading1">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                    aria-expanded="true"
                    aria-controls="collapse1"
                  >
                    What information does the app collect when using
                    location-based services?
                  </button>
                </h2>
                <div
                  id="collapse1"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading1"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    The app collects the approximate location of the user to
                    show them the most relevant results nearby.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="heading2">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse2"
                    aria-expanded="false"
                    aria-controls="collapse2"
                  >
                    How is the collected location data used and shared?
                  </button>
                </h2>
                <div
                  id="collapse2"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading2"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    The collected location data is stored securely on our server
                    and will only be shared with the provider that you choose to
                    interact with in order to enhance user experience and result
                    accuracy.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="heading3">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="false"
                    aria-controls="collapse3"
                  >
                    Is the location data sold to any third-party companies?
                  </button>
                </h2>
                <div
                  id="collapse3"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading3"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Your private location will not be sold to Third-party
                    companies. The app might display advertisement based in
                    location but your information will never be sold to
                    third-party companies
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="heading4">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse4"
                    aria-expanded="false"
                    aria-controls="collapse4"
                  >
                    How is the payment information collected and stored?
                  </button>
                </h2>
                <div
                  id="collapse4"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    We use the Stripe platform worldwide to secure and ensure
                    transactions are safely stored and executed. All of Stripe
                    security measures are in place to protect your payment
                    information.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="heading5">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse5"
                    aria-expanded="false"
                    aria-controls="collapse5"
                  >
                    How can users delete their location data or payment
                    information from the app?
                  </button>
                </h2>
                <div
                  id="collapse5"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading5"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    The system does not keep a log of your location data, it is
                    used as you search only, therefore there is no location data
                    to delete.You can remove your payment information at any
                    time directly from your settings.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="heading6">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse6"
                    aria-expanded="false"
                    aria-controls="collapse6"
                  >
                    What is the app's policy on data breaches and how are users
                    notified in case of a breach?
                  </button>
                </h2>
                <div
                  id="collapse6"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading6"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Our app takes data breaches very seriously and has
                      implemented strict policies to prevent and address such
                      incidents. In the event of a data breach, our team will
                      take immediate action to mitigate the impact and
                      investigate the breach.
                    </p>
                    <p>
                      If a data breach occurs and user data is compromised, we
                      will promptly notify affected users via email or through
                      in-app notifications. We will provide clear and concise
                      information about the breach, the type of data that may
                      have been accessed, and the steps users can take to
                      protect themselves. Additionally, we will work diligently
                      to rectify the breach, strengthen our security measures,
                      and prevent similar incidents in the future. Safeguarding
                      our users' data is of utmost importance to us, and we
                      strive to ensure transparency and communication in the
                      event of a breach.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
