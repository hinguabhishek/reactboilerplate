import { SBox, SContainer } from '@avalara/skylab-sdk/react';
import './Startup.css';
import setupWithAIImg from '../assets/images/setup-ai.jpg';
import setupManualImg from '../assets/images/setup-manual.jpg';
import { useNavigate } from 'react-router-dom';

export const StartSetupPage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/setup");
  }
  
  return (
    <SContainer>
      <div className="start-setup-warpper">
        <div className="text-right margin-top-md margin-bottom-md">
          <button className="ghost-blue icon-leading">
            <s-icon name="user"></s-icon>Add a user to help set up</button>
        </div>
        <div className='flex setup-startup-card-container'>
          <SBox>
            <h4>Avalara has curated your onboarding journey easy with our <span className='orange-text'>Avi, AI Service</span>* to configure your subscribed products in one go.</h4>
            <p>* <span className='orange-text'>Avi, AI Service</span> is generative AI powered Configuration builder plus configuration recommendation service which generates optimised list of configurations personalised for each customer according to their product, subscriptions. It also provides recommendations focused to each connectors required as per customers business application (ERPs)</p>
            <img src={setupWithAIImg} alt="setup with AI image" className='ai-setup-img' />
            <div className="flex justify-content-center pad-all-md">
              <button className="primary larger" onClick={handleClick}>
                Setup with Avi, AI Service
              </button>
            </div>
          </SBox>
          <SBox>
            <div className="flex justify-content-center flex-dir-col">
              <h4>In case your business need advance configuration, please go with manual setup. We will provide you personalised setup manual which will guide you to setup each product. </h4>
              <img src={setupManualImg} alt="setup Manual image" className='manual-setup-img' />
              <div className="flex justify-content-center pad-all-md">
                <button className="secondary larger">
                  Setup Manually
                </button>
              </div>
            </div>
          </SBox>
        </div>
      </div>
    </SContainer>
  );
};
