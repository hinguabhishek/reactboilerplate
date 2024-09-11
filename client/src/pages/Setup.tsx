import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import "./Setup.css";

const Setup = () => {
  const[helpGuide, setHelpGuide] = useState('');
  const [dividerPosition, setDividerPosition] = useState(80);
  const [isResizing, setIsResizing] = useState(false);
  const handleMouseDown = () => {
    console.log("handleMouseDown");
    setIsResizing(true);
  };
  const handleMouseUp = () => {
    setIsResizing(false);
    console.log("handleMouseUp");
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isResizing) return;
    const newPosition = (e.clientX / window.innerWidth) * 100;
    console.log("handleMouseMove", newPosition);
    setDividerPosition(newPosition);
  };
  useEffect(() => {
    fetch("http://127.0.0.1:5000/user_guide",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          connectors: ["WooCommerce", "Adobe Commerce"]
        })
      })
      .then((res) => res.json())
      .then((guideContent) => setHelpGuide(guideContent.guide));
  }, []);
  return (
    <>
      <div className="flex">
        <div className="content-container" style={{flexBasis:`${dividerPosition}`}} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>Site Content</div>
        <div className="sidebar-container-wrapper" style={{width:`${100-dividerPosition}%`, height:'100%'}} onMouseMove={handleMouseMove}>
          <div id="panel-content">
            <div className="flex flex-dir-col">
              <div className="flex flex-dir-col">
                <div
                  style={{ width: "100%" }}
                  className="avi-config-panel-header flex justify-content-center pad-all-sm"
                >
                  <div>
                    <span>Avi</span> Setup User Guide
                  </div>
                </div>
                <div className="pad-left-lg help-content-container">
                    <Markdown>
                        {helpGuide}
                    </Markdown>
                </div>
                <div className="flex align-items-center pad-all-sm border-bottom-sm avi-config-panel-header-close-btn">
                  <s-icon name="close"></s-icon>
                </div>
              </div>
            </div>
          </div>
          <div
            id="panel-content-slider"
            className="panel-content-slider-wrapper"
          >
            <div className="slider-control" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setup;
