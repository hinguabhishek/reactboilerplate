import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JsonForms } from "@jsonforms/react";
import { customCells, customRenderers } from "@avalara/skylab-form-renderer";
import Markdown from "react-markdown";
import {configSchema as LLMConfig} from '../data/configSchema';
import {layout as LLMLayout} from '../data/layout';
import "./Setup.css";
import { useAppSelector } from "../store/hooks";

const Setup = () => {
  const {guide:{value:helpGuide}} = useAppSelector(s=>s)
  const payload = {
    address_validation_obj: {
      address_validation_enabled: true, // Default value from schema
    },
    common: {
      collect_business_vat_id: false, // Default value from schema
      company_name: "", // String type with no default, set as empty
      enable_tax_calculation: true, // Default value from schema
      shipping_tax_code: "FR", // String type with no default, set as empty
    },
    exemption_certificate_management_obj: {
      enabled: true, // Default value from schema
    },
    integration_settings: {
      avatax_timeout: "60", // Default value from schema
      error_action: "2", // Default value from schema
      logging_db_detail: "1", // Default value from schema
      logging_db_level: "300", // Default value from schema
      one_way_items_sync: false, // Default value from schema
    },
  };
  
  // const [helpGuide, setHelpGuide] = useState("");
  // const [isContentLoading, setIsContentLoading] = useState(false);
  const [dividerPosition, setDividerPosition] = useState(80);
  const [isResizing, setIsResizing] = useState(false);
  const navigate = useNavigate();
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
    const companyInitEvent = new CustomEvent("onCompanyInit", {
      detail: [{ value: "DEFAULT", label: "TestCompany1" }],
    });
    dispatchEvent(companyInitEvent);
    // setIsContentLoading(true);
    // fetch("http://localhost:5000/user_guide", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     connectors: ["WooCommerce", "Adobe Commerce"],
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((guideContent) => {
    //     setHelpGuide(guideContent.guide);
    //     setIsContentLoading(false);
    //   });
  }, []);
  return (
    <>
      <div className="flex">
        <div
          className="content-container"
          style={{ flexBasis: `${dividerPosition}` }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <s-container>
            <s-row>
              <s-col span={"12"}>
                <div>
                  <h2>You are almost done. <span className="orange-text">Avi, Ai Service</span> generated default settings based on your account. Expand and review below sections then continue your setup journey. </h2>
                </div>
                <div className="pad-top-md">
                  <JsonForms
                    schema={LLMConfig}
                    uischema={LLMLayout}
                    data={payload}
                    renderers={[...customRenderers]}
                    cells={[...customCells]}
                    onChange={(event: any) => {
                      console.log(event.data);
                    }}
                    validationMode="NoValidation"
                  />
                </div>
                <div className="margin-top-sm">
                  <button className="primary margin-bottom-lg" onClick={()=>{
                    navigate("/setup-complete");
                  }}>Save</button>
                </div>
              </s-col>
            </s-row>
          </s-container>
        </div>
        <div
          className="sidebar-container-wrapper"
          style={{ width: `${100 - dividerPosition}%`, height: "100%" }}
          onMouseMove={handleMouseMove}
        >
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
                  <Markdown>{helpGuide}</Markdown>
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
            <div
              className="slider-control"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setup;
