import {SBox} from '@avalara/skylab-sdk/react';
import './Startup.css';
export const StartSetupPage = () => {
  return (
    <div className='flex justify-content-center align-items-center setup-startup-card-container'>
         <SBox>
      <div className="flex justify-content-center flex-dir-col">
        <div className="flex justify-content-center pad-all-md">
          Avalara has curated your onboarding journey using our Avi, AI
          configuration service to configure all your subscribed products in one
          go
        </div>
        <div className="flex justify-content-center pad-all-md">
          <button className="primary larger icon-trailing">
            Setup With Avi AI<s-icon name="arrow-right"></s-icon>
          </button>
        </div>
        <div className="pad-all-md">
          <div className="or-circle"></div>
        </div>
        <div className="flex justify-content-center pad-all-md">
          <button className="primary larger icon-trailing">
            Setup Manually<s-icon name="arrow-right"></s-icon>
          </button>
        </div>
      </div>
    </SBox>
    </div>
   
  );
};
