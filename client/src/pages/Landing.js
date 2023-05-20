import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import { Logo } from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { useAppContext } from '../context/appContext';

const Landing = () => {
  const { user } = useAppContext();

  return (
    <React.Fragment>
      {user && <Navigate to="/" />}

      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              job <span>tracking</span> App
            </h1>
            <p>
              Job Tracker Pro is a comprehensive job management app designed to
              streamline your professional journey. It empowers you to
              effortlessly track job applications, organize interviews and
              deadlines, and gain valuable insights into your job search
              progress, all in one convenient platform. With Job Tracker Pro,
              take control of your career with efficiency and confidence.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="main" className="img main-img" />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
