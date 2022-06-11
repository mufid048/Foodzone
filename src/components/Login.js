import React, { useState } from 'react'
import axios from 'axios';

export default function Login() {

  const API_URL = 'https://api.shilpimultiplex.com/api/Auth/'

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupData, setSignupData] = useState({});
  const [signinphone, setsigninphone] = useState("");
  const [signinpassword, setsigninpassword] = useState("");
  const [otp, setOtp] = useState('');
  const [isTaC, setisTaC] = useState(false);
  const [isTaC2, setisTaC2] = useState(false);
  const [isSigninButtonDisabled, setIsSigninButtonDisabled] = useState(true);
  const [isSignupButtonDisabled, setIsSignupButtonDisabled] = useState(true);

  let id;


  function signup(event) {
    let item = { name, phone, email, password }
    console.log(item);
    event.preventDefault();


    /*api to create new user*/
    axios.post(API_URL + 'CreateUser', item).then((result) => {
      setSignupData(result.data.id);
      id = result.data.id;

      /*api to send otp to new user for verification*/
      axios.post(API_URL + 'SendOtp?uid=' + id).then((result) => {
        console.log("Done");
      }).catch((error) => {
        alert(error.response.data);
      })

    }).catch((error) => {
      console.log(error)
      alert(error.response.data)
    })
  }

  /* This function is called when user clicks on sign in after filling details in form*/
  function Login(event) {
    let phoneNumber = signinphone;
    let password = signinpassword;
    let sitem = { phoneNumber, password }
    console.log(sitem);
    event.preventDefault();

    axios.post(API_URL + 'Authenticate', sitem).then((result) => {
      id = result.data.id;
    }).catch((error) => {
      alert(error.response.data);
    })
  }

  function VerifyOtp() {
    let Aotp = otp;

    /* This is API to veryfy OTP sent to user*/
    axios.post(API_URL + 'VerifyOtp?uid=' + id + '&otp=' + Aotp).then((result) => {

      if (result.request.status === 200) {

      }
    }).catch((error) => {
      alert(error.response.data);
    })
  }

  /*this is a function to disable sign in Button if terms and conditions are not checked */
  function changeTaC() {
    if (isTaC === true) {
      setisTaC(false);
      setIsSigninButtonDisabled(true);
    } else {
      setisTaC(true);
      setIsSigninButtonDisabled(false);
    }
  }

  function changeTaC2() {
    if (isTaC2 === true) {
      setisTaC2(false);
      setIsSignupButtonDisabled(true);
    } else {
      setisTaC2(true);
      setIsSignupButtonDisabled(false);
    }
  }

  return (
    <div>
      {/*Sign in form*/}
      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Sign In</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Phone Number</label>
                  <div className="col-sm-10">
                    <input type="text" value={signinphone} onChange={(e) => { setsigninphone(e.target.value) }} className="form-control" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input type="password" value={signinpassword} onChange={(e) => { setsigninpassword(e.target.value) }} className="form-control" id="inputPassword3" />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-10 offset-sm-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck1" onChange={changeTaC2} />
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Accept Terms and Conditions
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" onClick={Login} className="btn btn-primary" disabled={isSignupButtonDisabled}>Sign in</button>
              </form>.
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Create account</button>
            </div>
          </div>
        </div>
      </div>
      {/*sign in form ended*/}

      {/*sign up form*/}
      <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">Sign Up</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>

                <div className="row mb-3">
                  <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="inputName3" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Phone</label>
                  <div className="col-sm-10">
                    <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="inputPhone3" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="inputPassword3" />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-10 offset-sm-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck1" onChange={changeTaC} />
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Accept terms and conditions
                      </label>
                    </div>
                  </div>
                </div>
                <button type="button" onClick={signup} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled={isSigninButtonDisabled}>
                  send OTP
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Log In</button>
            </div>
          </div>
        </div>
      </div>
      {/*sign up form ended*/}


      {/*modal for otp*/}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Enter your OTP</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" value={otp} onChange={(e) => { setOtp(e.target.value) }} className="form-control" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={VerifyOtp} className="btn btn-primary " data-bs-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}