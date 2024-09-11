import { SBox, SContainer, SIcon } from '@avalara/skylab-sdk/react';
import userImg from '../assets/images/user.png';
import adobeImg from '../assets/images/adobe.png';
import netsuiteImg from '../assets/images/netsuite.png';
import { useNavigate } from 'react-router-dom';

export const CustomerDetailsPage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }
  return (
    <SContainer>
      <div className="customer-details-warpper">
        <div className="text-right margin-top-md margin-bottom-md">
          <button className="ghost-blue icon-leading">
            <s-icon name="user"></s-icon>Add a user to help set up</button>
        </div>
        <h1>Welcome, <span className='orange-text'>Mamma Masa!</span></h1>
        <h2>From everyone here at Avalara, thank you for choosing Avalara Avatax. Your tax calculations are about to get a lot easier.</h2>
        <div className="flex align-items-start justify-content-space margin-top-lg margin-bottom-lg customer-details-content">
          <div className="customer-products">
            <h3 className="text-center">Products</h3>
            <SBox>
              <h4 className="margin-all-none">Avatax</h4>
              <ul>
                <li><span>Plan</span> 20,000 Transactions</li>
                <li><span>Used</span> 18,253 Transactions</li>
                <li><span>Available</span> 1,747 Transactions</li>
                <li><span>Term</span> 10/2023 to 10/2024</li>
              </ul>
              <hr />
              <h4 className="margin-all-none">Exemptions</h4>
              <ul>
                <li><span>Plan</span> 500 Certificates</li>
                <li><span>Used</span> 616 Certificates</li>
                <li><span>Available</span> 0</li>
                <li><span>Term</span> 10/2023 to 10/2024</li>
              </ul>
              <hr />
              <h4 className="margin-all-none">Returns</h4>
              <ul>
                <li><span>Plan</span> 5152 Pre-paid returns</li>
                <li><span>Used</span> 137 Pre-paid returns</li>
                <li><span>Available</span> 15</li>
                <li><span>Term</span> 10/2023 to 10/2024</li>
              </ul>
            </SBox>
          </div>
          <div className="customer-integrations">
            <h3 className="text-center">Integrations</h3>
            <SBox>
              <h3 className="margin-all-none">Adobe Commerce</h3>
              <img src={adobeImg} alt="Adobe logo" />
              <h4 className="margin-all-none">Services</h4>
              <ul>
                <li>Sales Tax</li>
                <li>POS</li>
                <li>Refunds</li>
                <li>Vat</li>
                <li>GST</li>
                <li>Customs duty</li>
                <li>Multi tax</li>
                <li>Import tax</li>
              </ul>
              <hr />
              <h3 className="margin-all-none">Netsuite Oneworld</h3>
              <img src={netsuiteImg} alt="Netsuite logo" />
              <h4 className="margin-all-none">Services</h4>
              <ul>
                <li>Sales Tax</li>
                <li>POS</li>
                <li>Refunds</li>
                <li>Vat</li>
                <li>GST</li>
                <li>Customs duty</li>
                <li>Multi tax</li>
                <li>Import tax</li>
              </ul>
            </SBox>
            <div className="margin-top-xl text-center">
              <button type="button" className='primary large w-250' onClick={handleClick}>Go to Home</button>
            </div>
          </div>
          <div className="account-details">
            <SBox>
              <h3 className="margin-top-none">Your account balance <span>$5,849.67</span></h3>
              <p>Next invoice paid by AutoPay on 11/14.2024.</p>
            </SBox>
            <SBox>
              <h3 className="margin-top-none">Account manager</h3>
              <div className="flex">
                <img src={userImg} alt="user" />
                <div>
                  <h4 className="margin-all-none">Hi, I'm Steven Francis.</h4>
                  <h4 className="margin-all-none">I can help with your account and other Avalara resources.</h4>
                </div>
              </div>
              <p className="text-blue-medium text-center email"><SIcon name="email" /> <a className="text-sm-strong" href="mailto://steven.francis@avalara.com">steven.francis@avalara.com</a></p>
            </SBox>
            <SBox>
              <h3 className="margin-top-none margin-bottom-xs">Your support plan</h3>
              <ul className="support">
                <li><span>Hours</span> 5 a.m. - 5 p.m. Mon - Fri PST</li>
                <li><span>Response time</span> 24 hours for non-implementation</li>
                <li><span>Critical support</span> 1 hour</li>
                <li><span>Plan type</span> Standard</li>
              </ul>
            </SBox>
            <SBox>
              <h3>Understand how AvaTax usage is calculated and billed</h3>
              <iframe src="https://www.youtube.com/embed/3rKrNhWGPoE?si=uB9ybd5wpmcpKAde" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </SBox>
          </div>
        </div>
      </div>
    </SContainer>
  );
};
