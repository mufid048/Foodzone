import React, { useState } from 'react'

export default function Login() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupData, setSignupData] = useState({});
  const [signinphone,setsigninphone] = useState("");
  const [signinpassword,setsigninpassword] = useState("");


  function signup(event) {
    let item = { name, phone, email, password }
    console.log(item);
    event.preventDefault();

    let result=fetch('https://api.gyftm.in/api/Auth/CreateUser',{
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    })
    console.log(result);
    setSignupData(result);

    // fetch(`https://api.gyftm.in/api/Auth/SendOtp?uid=${signupData.id}`)
    // .then(res=>res.json)
    // .then(result => {
    //   console.log(result);
    // })
  };

  async function Login(event){
    let item={signinphone,signinpassword}
    console.log(item);
    event.preventDefault();

    let result= await fetch('https://api.gyftm.in/api/Auth/Authenticate',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(item)
    })
    result = await result.json();
    // localStorage.setItem(JSON.stringify(result))
    // History.push('/add')
  }


  return (
    <div>
      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Sign In</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/*sign in form*/}
              <form>
                <div className="row mb-3">
                  <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Phone Number</label>
                  <div className="col-sm-10">
                    <input type="text" value={signinphone} onChange={(e)=>{setsigninphone(e.target.value)}} className="form-control" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input type="password" value={signinpassword} onChange={(e)=>{setsigninpassword(e.target.value)}} className="form-control" id="inputPassword3" />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-10 offset-sm-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck1" />
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Example checkbox
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" onClick={Login} className="btn btn-primary">Sign in</button>
              </form>.
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Sign in with OTP</button>
              <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Create account</button>

            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">Sign Up</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                {/*sign up form*/}
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
                      <input className="form-check-input" type="checkbox" id="gridCheck1" />
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Accept terms and conditions
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" onClick={signup} className="btn btn-primary">Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Log In</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
