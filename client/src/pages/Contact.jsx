import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"

const URL = `http://localhost:5000/api/form/contact`

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [userData, setUserData] = useState(true)

  const {user, userAuthentication} = useAuth()

  if(userData && user){
    setContact({
      username: user.username,
      email: user.email,
      message: ""
    })

    setUserData(false)
  }

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(contact);

    try {
      let response = await fetch(URL,{
        method: "POST",
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(contact)
      })
      console.log(response);

      if(response.ok){
        toast.success("Message Sent")
        setContact({...contact, message: ""})
      }else{
        toast.error("Error sending meessage");
      }
      

    } catch (error) {
      console.log("contact error :" + error);
    }

  };

  useEffect(()=>{
    userAuthentication()
  },[])

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1626.5375379338748!2d88.27309630344787!3d22.56524698270537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0278e2ff6da817%3A0x448bd7370167df9c!2sKali%20Mandir!5e0!3m2!1sen!2sin!4v1725987078931!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};



{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1626.5375379338748!2d88.27309630344787!3d22.56524698270537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0278e2ff6da817%3A0x448bd7370167df9c!2sKali%20Mandir!5e0!3m2!1sen!2sin!4v1725987078931!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}