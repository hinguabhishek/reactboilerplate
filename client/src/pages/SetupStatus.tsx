import { SContainer } from '@avalara/skylab-sdk/react';
import setupStatusImage from '../assets/images/setup-status.gif';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const SetupStatusPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/setup-complete");
    }, 5000);
  }, [navigate]);
  return (
    <SContainer>
      <div className="setup-status-wrapper">
        <h1>Great Job! Thanks for telling us about your business. Now, let us setup your products for accurate tax calculation and compliance needs.</h1>
        <img src={setupStatusImage} alt="setup status" />
      </div>
    </SContainer>
  );
};
