// import React from 'react'
import { Link } from 'react-router-dom';
import './mainPage.css';
import Button from 'react-bootstrap/Button';

// import BackgroundImage from '/smart-farming_img.webp';

function MainPage() {
  return (
    <>
    <div id='body'>
    {/* <section id='text'> */}
        <div id='main'>
            <h1>Agri-Tech</h1>
            <p>Agri-Tech is a web application that helps farmers to predict the best crops to plant based on the soil and weather conditions in their area.</p>
            <p>It uses machine learning algorithms to analyze the data and provide recommendations to the farmers.</p>
            <p>With Agri-Tech, farmers can make informed decisions about their crops and improve their yield.</p>
        </div>

        <div id='sidebar'>
            <h2>How it works</h2>
            {/* <ol> */}
                <li>User inputs data from Soil Analysis</li>
                <br></br>
                <li>User inputs results of weather measurements</li>
                <br></br>
                <li>Crop Recommendations through predictions based on our pre-trained model</li>
                <br></br>
            {/* </ol> */}
        </div>
        {/* </section> */}

        <br></br>
        <Link to="/data">
        <Button variant="outline-success">Get Started</Button>{' '}
        </Link>
    </div>
   
    </>
  )
}

export default MainPage