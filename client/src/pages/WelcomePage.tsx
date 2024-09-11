import { SContainer } from '@avalara/skylab-sdk/react';
import welcomeImg from '../assets/images/welcome.gif';
import { useNavigate } from 'react-router-dom';

export const WelcomePage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/setup-start");
  }

  return (
    <SContainer>
      <div className="welcome-warpper">
        <div className="text-right margin-top-md margin-bottom-md">
          <button className="ghost-blue icon-leading">
            <s-icon name="user"></s-icon>Add a user to help set up</button>
        </div>
        <h1>Welcome, <span className='orange-text'>Mamma Masa!</span></h1>
        <h2>From everyone here at Avalara, thank you for choosing Avalara Avatax. Your tax calculations are about to get a lot easier.</h2>
        <div className="flex align-items-center margin-top-lg margin-bottom-lg">
          <div className="welcome-text">
            <h3 className="margin-bottom-xl">We are equally excited as you are to onboard you as soon as possible. Lets begin together!</h3>
            <button type='button' className='primary large w-250' onClick={handleClick}>Let’s Start</button>
          </div>
          <div className="welcome-image divider-left">
            <img src={welcomeImg} alt="welcome-image" />
          </div>
        </div>
      </div>
    </SContainer>
  );
};
