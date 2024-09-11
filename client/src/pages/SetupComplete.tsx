import { SBox, SContainer } from '@avalara/skylab-sdk/react';
import image1 from '../assets/images/1.svg';
import image2 from '../assets/images/2.svg';
import image3 from '../assets/images/3.svg';
import { useNavigate } from 'react-router-dom';

export const SetupCompletePage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/customer-details");
  }
  
  return (
    <SContainer>
      <div className="setup-complete-wrapper text-center">
        <h1>Success! Your Company, Tax Profile and Connection to business applications are done.</h1>
        <div className="flex justify-content-center next-steps">
          <div className="step pad-all-md">
            <SBox>
              <h3>Company details</h3>
              <img className="pulse" src={image1} alt="setup status" />
            </SBox>
            <h4>Your Company profile is set up.</h4>
          </div>
          <div className="step pad-all-md">
            <SBox>
              <h3>Where you report tax</h3>
              <img className="pulse" src={image2} alt="setup status" />
            </SBox>
            <h4>Configured where you registered and doing significant amount of sales. This will help to calculate the right sales tax.</h4>
          </div>
          <div className="step pad-all-md">
            <SBox>
              <h3>Connect to Avalara</h3>
              <img className="pulse" src={image3} alt="setup status" />
            </SBox>
            <h4>Set up done for your integrations required to connect your business applications to Avalara so tax can be calculated on your transactions.</h4>
          </div>
        </div>
        <div className="margin-top-xl">
          <button type="button" className='primary large w-250' onClick={handleClick}>Next</button>
        </div>
      </div>
    </SContainer>
  );
};
