import classes from './newsletter-registration.module.css';
import { useEffect, useRef, useState } from 'react';

function NewsletterRegistration() {
  const [emailValid, setEmailValid] = useState(true);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [searchingData, setSearchingData] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // fetch user input (state or refs)
  const emailRef = useRef();


  function registrationHandler(event) {
    setSearchingData(true);
    event.preventDefault();
    let emailId = emailRef.current.value;

    // optional: validate input
    if (emailId == "" || !emailId.includes('@') || !emailId.includes(".")) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }

    const emailData = {
      id: new Date().toString(),
      email: emailId,
    }

    // send valid data to API
    const postData = async () => {
      const request = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(emailData),
        header: {
          'Content-Type': 'application/json'
        }
      });
      const response = await request.json();
      setSubscribed(response.message); //message
    }

    // get data from API to check if email already exis
    const validateThenPost = async() => {
       const request = await fetch('/api/newsletter');
       const resp = await request.json();

       // checking if email already exist in database
       let ifExist = resp.emailId.findIndex(email=>{
        return email.emailId === emailId
       });

       if(ifExist < 0){
          postData();
          setSearchingData(false);
          setAlreadyExist(false);
       }else{
          setSearchingData(false);
          setAlreadyExist(true);
       }
       console.log(ifExist);
    }
    validateThenPost();
  }

 


return (
  <section className={classes.newsletter}>
    <h2>Sign up to stay updated!</h2>
    <form onSubmit={registrationHandler}>
      <div className={classes.control}>
        <input
          type='email'
          id='email'
          placeholder='Your email'
          aria-label='Your email'
          ref={emailRef}
        />
        <button>Register</button>
      </div>
      {!emailValid && <p className={classes.err}>Invalid Email</p>}
      {searchingData && <p className={classes.wait}>working please wait...</p>}
      {alreadyExist && !searchingData && <p className={classes.err}>Already Exists</p>}
      {!alreadyExist && !searchingData && emailValid && <p className={classes.wait}>{subscribed}</p>}
    </form>
  </section>
);
}

export default NewsletterRegistration;
