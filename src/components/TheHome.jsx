import React, { useEffect, useState } from "react";
import "../Home.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate } from "react-router-dom";

const TheHome = (props) => {
  let navigate = useNavigate();
  let onSuccess = (credentialResponse) => {
    let token = credentialResponse.credential;
    try {
      let data = jwt_decode(token);
      // save in browser
      localStorage.setItem("netflix-clone-token", token);
      // reload page
      alert("login successfully");
      window.location.assign("/");
    } catch (error) {
      console.log(error);
      // remove data from local storage
      localStorage.removeItem("netflix-clone-token");
    }
  };

  let onError = () => {
    console.log("Login Failed");
  };

  let logout = () => {
    let isLogout = window.confirm("Are you sure logout");
    if (isLogout) {
      localStorage.removeItem("netflix-clone-token");
      window.location.reload();
    }
  };

  let getUserDetails = () => {
    let token = localStorage.getItem("netflix-clone-token");

    if (token == null) {
      return null;
    } else {
      try {
        let data = jwt_decode(token);
        return data;
      } catch (error) {
        return null;
      }
    }
  };

  let [user, setUser] = useState(getUserDetails());

  useEffect(() => {
    user ? props.getUser(user) : redirect("/");
  }, []);

  return (
    <>
      <div className="hero">
        <section className="banner__part">
          <div className="navbar__home">
            <img
              className="netflix__logo__home"
              src="/netflix-logo.png"
              alt="netflix-logo"
            />

            <div>
              <select className="navbar__select text-white" name="" id="">
                <option value="">English</option>
                <option value="">Hindi</option>
              </select>
              {user ? (
                <>
                  <button
                    title="click to watch movie"
                    onClick={() => {
                      navigate("/browse");
                    }}
                    className="btn  user__btn border text-white"
                  >
                    {user.name}
                  </button>
                  <button
                    className="btn logout__btn btn-warning "
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="sign__btn text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#login-sign-up"
                >
                  sign in
                </button>
              )}
              {/* // <!-- Modal --> */}
              <GoogleOAuthProvider clientId="683936420121-2jp8f47g8j2ca8vsvc0a796p6sr6o6vq.apps.googleusercontent.com">
                <div
                  className="modal fade"
                  id="login-sign-up"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title text-dark fs-5"
                          id="exampleModalLabel"
                        >
                          login/sigup
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <GoogleLogin onSuccess={onSuccess} onError={onError} />;
                      </div>
                    </div>
                  </div>
                </div>
              </GoogleOAuthProvider>
            </div>
          </div>

          <div className="center__text">
            <h1 className="main__title">Unlimited movies, TV shows and more</h1>
            <p className="first__pg">Watch anywhere. Cancel anytime</p>
            <p className="second__pg">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            {user ? (
              <div className="">
                <img
                  className="netflix__logo__home"
                  src="/netflix-logo.png"
                  alt="netflix-logo"
                />
                <div>
                  <button
                    onClick={() => navigate("/browse")}
                    className="btn  btn-primary px-3 py-2"
                  >
                    Click to watch Now
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                action=""
                className="email__form"
              >
                <input
                  className="email-input"
                  type="email"
                  name=""
                  placeholder="Email Address"
                  id=""
                />

                <button
                  data-bs-toggle="modal"
                  data-bs-target="#login-sign-up"
                  className="getStarted__btn text-white"
                >
                  {"Get Started >"}
                </button>
              </form>
            )}
          </div>
        </section>

        <hr />
        <section className="tv">
          <div className="container">
            <div className="row d-flex align-items-center flex-wrap">
              <div className="col-5 tv-text ">
                <h2 className="mt-5 h2__font__size">Enjoy on your TV.</h2>
                <p className="col-bt-text mt-4">
                  Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                  Blu-ray players and more.
                </p>
              </div>
              <div className="col ">
                <img
                  className="feature-1 mt-4"
                  src="./img/feature-1.png"
                  alt="feature-img"
                />
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="dw-offline">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col">
                <img
                  src="./img/feature-2.png"
                  className="feature-2"
                  alt="feature-img"
                />
              </div>
              <div className="col">
                <h2 className="mt-5 col-bt-text-f-2">
                  Download your shows <br /> to watch offline.
                </h2>
                <p className="col-bt-text-f-2  mt-3">
                  Save your favourites easily and always have something to
                  watch.
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="w-everywhere">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col tv-text">
                <h2 className="mt-5 h2__font__size">Watch everywhere.</h2>
                <p className="col-bt-text-f-3 mt-3">
                  Stream unlimited movies and TV shows on your phone, tablet,
                  laptop, and TV.
                </p>
              </div>
              <div className="col">
                <img
                  src="./img/feature-3.png"
                  className="feature-3"
                  alt="feature-3"
                />
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="child-profile">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col">
                <img
                  src="./img/feature-4.png"
                  className="feature-4"
                  alt="feature-4"
                />
              </div>
              <div className="col">
                <h2 className="feature-heading mx-2 mb-1 h2__font__size">
                  Create profiles for children.
                </h2>
                <p className="col-bt-text-f-4 mt-3">
                  Send children on adventures with their favourite characters in
                  a space made just for them—free with your membership.
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="FAQ-sec">
          <div className="container">
            <div className="row">
              <div className="col mt-5">
                <p className="text-center FAQ-heading">
                  Frequently Asked Questions
                </p>
              </div>
            </div>
            <div className="col">
              <div
                className="accordion accordion-flush accordion-div "
                id="accordionFlushExample"
              >
                <div className="accordion-item item-color">
                  <h2
                    className="accordion-header h2__font__size"
                    id="flush-headingOne"
                  >
                    <button
                      className="accordion-button collapsed btn-color"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      What is Netflix?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse collapse-color"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Netflix is a streaming service that offers a wide variety
                      of award-winning TV shows, movies, anime, documentaries
                      and more – on thousands of internet-connected devices. You
                      can watch as much as you want, whenever you want, without
                      a single ad – all for one low monthly price. There's
                      always something new to discover, and new TV shows and
                      movies are added every week!
                    </div>
                  </div>
                </div>
                <div className="accordion-item item-color mt-2">
                  <h2
                    className="accordion-header h2__font__size"
                    id="flush-headingTwo"
                  >
                    <button
                      className="accordion-button collapsed  btn-color"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      How much does Netflix cost?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse collapse-color"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Watch Netflix on your smartphone, tablet, Smart TV,
                      laptop, or streaming device, all for one fixed monthly
                      fee. Plans range from ₹ 149 to ₹ 649 a month. No extra
                      costs, no contracts.
                    </div>
                  </div>
                </div>
                <div className="accordion-item item-color mt-2">
                  <h2
                    className="accordion-header h2__font__size"
                    id="flush-headingThree"
                  >
                    <button
                      className="accordion-button collapsed  btn-color"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      Where can i Watch?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse collapse-color"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Watch anywhere, anytime. Sign in with your Netflix account
                      to watch instantly on the web at netflix.com from your
                      personal computer or on any internet-connected device that
                      offers the Netflix app, including smart TVs, smartphones,
                      tablets, streaming media players and game consoles. You
                      can also download your favourite shows with the iOS,
                      Android, or Windows 10 app. Use downloads to watch while
                      you're on the go and without an internet connection. Take
                      Netflix with you anywhere.
                    </div>
                  </div>
                </div>
                <div className="accordion-item item-color mt-2">
                  <h2
                    className="accordion-header h2__font__size"
                    id="flush-headingFour"
                  >
                    <button
                      className="accordion-button collapsed  btn-color"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFour"
                      aria-expanded="false"
                      aria-controls="flush-collapseFour"
                    >
                      How do i cancel?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFour"
                    className="accordion-collapse collapse collapse-color"
                    aria-labelledby="flush-headingFour"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Netflix is flexible. There are no annoying contracts and
                      no commitments. You can easily cancel your account online
                      in two clicks. There are no cancellation fees – start or
                      stop your account anytime.
                    </div>
                  </div>
                </div>
                <div className="accordion-item item-color mt-2">
                  <h2
                    className="accordion-header h2__font__size"
                    id="flush-headingFive"
                  >
                    <button
                      className="accordion-button collapsed btn-color"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFive"
                      aria-expanded="false"
                      aria-controls="flush-collapseFive"
                    >
                      What can i watch on Netflix?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFive"
                    className="accordion-collapse collapse collapse-color"
                    aria-labelledby="flush-headingFive"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Netflix has an extensive library of feature films,
                      documentaries, TV shows, anime, award-winning Netflix
                      originals, and more. Watch as much as you want, anytime
                      you want.
                    </div>
                  </div>
                </div>
                <div className="accordion-item item-color mt-2">
                  <h2
                    className="accordion-header h2__font__size"
                    id="flush-headingSix"
                  >
                    <button
                      className="accordion-button collapsed  btn-color"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseSix"
                      aria-expanded="false"
                      aria-controls="flush-collapseSix"
                    >
                      Is Netflix good for kids?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseSix"
                    className="accordion-collapse collapse collapse-color"
                    aria-labelledby="flush-headingSix"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Watch Netflix on your smartphone, tablet, Smart TV,
                      laptop, or streaming device, all for one fixed monthly
                      fee. Plans range from ₹ 149 to ₹ 649 a month. No extra
                      costs, no contracts.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <p className="heading-p text-center text-white FAQ-p">
                  Ready to watch? Enter your email to create or restart your
                  membership.{" "}
                </p>
              </div>
              <div className="row">
                <div className="col">
                  <div className="input-group footer-input-gr justify-content-center mt-1">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                      action=""
                      className="email__form"
                    >
                      <input
                        className="email-input"
                        type="email"
                        name=""
                        placeholder="Email Address"
                        id=""
                      />

                      <button className="getStarted__btn text-white">
                        {"Get Started >"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <footer>
          <div className="container footer-content">
            <p>Questions? Call 000-800-919-1694</p>
            <div className="row mt-4">
              <div className="col footer-a">
                <a href="#">FAQ</a>
                <a href="#">Investor Relations</a>
                <a href="#">Privacy</a>
                <a href="#">Speed Test</a>
              </div>
              <div className="col footer-a">
                <a href="#">Help Centre</a>
                <a href="#">Jobs</a>
                <a href="#">Cookie Preferences</a>
                <a href="#">Legal Notices</a>
              </div>
              <div className="col footer-a">
                <a href="#">Account</a>
                <a href="#">Ways to Watch</a>
                <a href="#">Corporate Information</a>
                <a href="#">Only on Netflix</a>
              </div>
              <div className="col footer-a">
                <a href="#">Media Centre</a>
                <a href="#">Terms of Use</a>
                <a href="#">Contact Us</a>
              </div>
            </div>
            <div className="dropdown dropdown-sm ">
              <button
                className="drop-item footer-btn dropdown-toggle mt-4"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-globe" />
                English
              </button>
              <ul className="dropdown-menu  drop-foooter-width">
                <li>
                  <a className="dropdown-item" href="#">
                    English
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Hindi
                  </a>
                </li>
              </ul>
            </div>
            <div className="n-in mt-3 dropdown-sm">Netflix India</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TheHome;
