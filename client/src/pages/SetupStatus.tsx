import { SContainer } from '@avalara/skylab-sdk/react';
import setupStatusImage from '../assets/images/setup-status.gif';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setGuide } from '../store/slices/counter';

export const SetupStatusPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch("http://localhost:5000/user_guide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        connectors: ["NetSuite OneWorld", "Adobe Commerce"],
      }),
    })
      .then((res) => res.json())
      .then((guideContent) => {
        dispatch(setGuide(guideContent.guide));
        navigate('/setup')
      });
  }, []);
  return (
    <SContainer>
      <div className="setup-status-wrapper">
        <h1>Great that you chose <span className='orange-text'>Avi, Configuration Service! You’re on your way</span>! Just follow the steps to complete the rest of your setup.</h1>
        <h3 style={{fontWeight:'normal'}}>It can take few minutes to grave all the default configurations and configure all the products. <strong>Avi</strong> will guide you if need more information from you.</h3>
        <img src={setupStatusImage} alt="setup status" />
      </div>
    </SContainer>
  );
};
