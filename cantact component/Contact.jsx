import "./Contact.css"
import Fb from '../../img/fb.png'
import Instagram from '../../img/instagram.png'
import Twitter from '../../img/twitter.png'
import Linkedin from '../../img/linkedin.png'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as emailjs from 'emailjs-com';

function Contact1() {
  const [buttonState, setButtonState] = useState();
  //formik schema
  const formik = useFormik({
    //we have created our initailValues object in a format EmailJS accepts
    initialValues: {
      from_name: '',
      to_name: 'tayari@gmail.com',
      from_email: '',
      from_subject: '',
      message: ''
    },
    validationSchema: Yup.object({
      from_name: Yup.string().required('* Name field is required'),
      from_email: Yup.string().email('Invalid email address').required('* Email field is required'),
      from_subject: Yup.string().required('* Subject field is required'),
      message: Yup.string().required('* Message field is required')
    }),
    onSubmit: (values,e) => {
      //console.log('values', values);
      // Email JS code will go here
      try {
        emailjs.send('service_eonxc5e', 'template_3dwsqqm', values, 'user_qimTIWYTvd5i3ToSmOulT')
          .then((r) => {
            /*sentMessage.classList.add('success');
            sentMessage.innerHTML = CONTACT_ERROR.success;
            setButtonState('Send Email');
            setSubmitting(false);
            resetForm();*/
            console.log(r.text)
            setButtonState('Succesfully sent thank you')
            formik.resetForm()
          });

      } catch (error) {
        /*sentMessage.classList.add('error');
	      sentMessage.innerHTML = CONTACT_ERROR.error;
	      setButtonState('Send Email');
	      setSubmitting(false);*/
        console.log(error.text);
        console.log("cannot send")
        formik.resetForm()
      }
    },

  });
  //formik
  return (
    <div className="background" id="Contact">
      <div className="container">
        <div className="screen">
          <div className="screen-header">
            <div className="screen-header-left">
              <div className="screen-header-button close"></div>
              <div className="screen-header-button maximize"></div>
              <div className="screen-header-button minimize"></div>
            </div>
            <div className="screen-header-right">
              <div className="screen-header-ellipsis"></div>
              <div className="screen-header-ellipsis"></div>
              <div className="screen-header-ellipsis"></div>
            </div>
          </div>
          <div className="screen-body">
            <div className="screen-body-item left">
              <div className="app-title">
                <span>CONTACT</span>
                <span>Me</span>
              </div>
              <div className="app-contact">
                <a href="https://fb.com/taha.2y" target="_blank" rel="noreferrer"><img className="social-media" src={Fb} alt="" /></a>
                <a href="https://www.instagram.com/tahaayari.exe/" target="_blank" rel="noreferrer"><img className="social-media" src={Instagram} alt="" /></a>
                <a href="https://twitter.com/tahaayari3" target="_blank" rel="noreferrer"><img className="social-media" src={Twitter} alt="" /></a>
                <a href="https://www.linkedin.com/in/taha-ayari-090a0b199" target="_blank" rel="noreferrer"><img className="social-media" src={Linkedin} alt="" /></a>
              </div>
            </div>
            <form className="screen-body-item" onSubmit={formik.handleSubmit}>
              <div className="app-form">
                <div className="app-form-group">
                  <input className="app-form-control" placeholder="FROM NAME" name="from_name" onChange={formik.handleChange}
                    value={formik.values.from_name} />
                  <div className={`expandable ${formik.touched.from_name && formik.errors.from_name ? 'show' : ''}`} style={{ color: 'red' }}>
                    {formik.errors.from_name}
                  </div>
                </div>

                <div className="app-form-group">
                  <input className="app-form-control" placeholder="EMAIL" type="email" name="from_email" onChange={formik.handleChange}
                    value={formik.values.from_email} />
                  <div className={`expandable ${formik.touched.from_email && formik.errors.from_email ? 'show' : ''}`} style={{ color: 'red' }}>
                    {formik.errors.from_email}
                  </div>
                </div>

                <div className="app-form-group">
                  <input className="app-form-control" placeholder="SUBJECT" name="from_subject" onChange={formik.handleChange}
                    value={formik.values.from_subject} />
                  <div className={`expandable ${formik.touched.from_subject && formik.errors.from_subject ? 'show' : ''}`} style={{ color: 'red' }}>
                    {formik.errors.from_subject}
                  </div>
                </div>

                <div className="app-form-group message">
                  <input className="app-form-control" placeholder="MESSAGE" name="message" onChange={formik.handleChange}
                    value={formik.values.message} />
                  <div className={`expandable ${formik.touched.message && formik.errors.message ? 'show' : ''}`} style={{ color: 'red' }}>
                    {formik.errors.message}
                  </div>
                </div>

                <div className="app-form-group buttons">
                  <button type="submit" className="app-form-button">SEND </button>

                </div>
                <span className="error-box">{buttonState}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Contact1