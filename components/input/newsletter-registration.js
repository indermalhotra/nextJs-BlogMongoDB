import classes from './newsletter-registration.module.css';
import { useEffect, useRef, useState } from 'react';

function NewsletterRegistration() {
  const [emailValid, setEmailValid] = useState(true);

  // fetch user input (state or refs)
  const emailRef = useRef();


  function registrationHandler(event) {
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
    const fetchData = async () => {
      const request = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(emailData),
        header: {
          'Content-Type': 'application/json'
        }
      });
      const response = await request.json();
      console.log(response);
    }
    fetchData();
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
    </form>
  </section>
);
}

export default NewsletterRegistration;
