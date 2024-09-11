import { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { customCells, customRenderers } from "@avalara/skylab-form-renderer";
import Markdown from "react-markdown";
import "./Setup.css";

const Setup = () => {
  const config = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "http://example.com/schema",
    $defs: {
      tax_calculation: {
        type: "object",
        additionalProperties: false,
        properties: {
          wc_avatax_enable_tax_calculation: {
            type: "boolean",
            default: true,
          },
          wc_avatax_record_calculations: {
            type: "boolean",
            default: true,
          },
          wc_avatax_company_code: {
            type: "string",
          },
          wc_avatax_company_id: {
            type: "number",
          },
          wc_avatax_shipping_code: {
            type: "string",
            default: "FR",
          },
        },
        required: ["wc_avatax_company_code", "wc_avatax_company_id"],
      },
      address_validation: {
        additionalProperties: false,
        type: "object",
        properties: {
          wc_avatax_enable_address_validation: {
            type: "boolean",
            default: true,
          },
        },
      },
      exemption_certificate_management: {
        type: "object",
        additionalProperties: false,
        properties: {
          wc_avatax_enable_ecm: {
            type: "boolean",
            default: true,
          },
        },
      },
      transactions_outside_the_us: {
        type: "object",
        additionalProperties: false,
        properties: {
          wc_avatax_enable_vat: {
            type: "boolean",
            default: true,
          },
        },
      },
      logs: {
        type: "object",
        additionalProperties: false,
        properties: {
          wc_avatax_debug: {
            type: "boolean",
            default: true,
          },
        },
      },
    },
    type: "object",
    properties: {
      tax_calculation: {
        $ref: "#/$defs/tax_calculation",
      },
      address_validation: {
        $ref: "#/$defs/address_validation",
      },
      exemption_certificate_management: {
        $ref: "#/$defs/exemption_certificate_management",
      },
      transactions_outside_the_us: {
        $ref: "#/$defs/transactions_outside_the_us",
      },
      logs: {
        $ref: "#/$defs/logs",
      },
    },
    required: ["tax_calculation"],
  };
  const payload = {
    tax_calculation: {
      wc_avatax_enable_tax_calculation: true,
      wc_avatax_record_calculations: true,
      wc_avatax_company_code: "DEFAULT",
      wc_avatax_company_id: "123",
      wc_avatax_shipping_code: "FR",
    },
    address_validation: {
      wc_avatax_enable_address_validation: false,
    },
    exemption_certificate_management: {
      wc_avatax_enable_ecm: false,
    },
    transactions_outside_the_us: {
      wc_avatax_enable_vat: true,
    },
    logs: {
      wc_avatax_debug: true,
    },
  };
  const uiSchema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        label: "Tax calculation",
        scope: "#/properties/tax_calculation",
        options: {
          layout: "Accordion",
          elementLabelProp: "channel",
        },
        elements: [
          {
            type: "VerticalLayout",
            elements: [
              {
                type: "Control",
                label: "Enable tax calculation",
                scope:
                  "#/properties/tax_calculation/properties/wc_avatax_enable_tax_calculation",
                options: {
                  toggle: true,
                  trueStatusLabel: "Yes",
                  falseStatusLabel: "No",
                },
              },
              {
                type: "Control",
                label: "Save transactions in Avalara for reporting",
                scope:
                  "#/properties/tax_calculation/properties/wc_avatax_record_calculations",
                description:
                  'Turn this on to save transactions in Avalara when an order status in WooCommerce is "Payment received", "Processing," or "Complete."',
                options: {
                  toggle: true,
                  trueStatusLabel: "Yes",
                  falseStatusLabel: "No",
                },
                customRule: {
                  effect: "SHOW",
                  condition: {
                    scope:
                      "#/properties/tax_calculation/properties/wc_avatax_enable_tax_calculation",
                    schema: {
                      const: true,
                    },
                  },
                },
              },
              {
                type: "Control",
                label: "Calculate Colorado retail delivery fee",
                scope:
                  "#/properties/tax_calculation/properties/wc_avatax_enable_co_rdf",
                description:
                  "Turn this on to calculate the Colorado retail delivery fee on orders in Colorado. Not all businesses are required to collect the retail delivery fee.",
                options: {
                  toggle: true,
                  trueStatusLabel: "Yes",
                  falseStatusLabel: "No",
                },
                customRule: {
                  effect: "SHOW",
                  condition: {
                    type: "AND",
                    conditions: [
                      {
                        scope: "#/properties/tax_calculation",
                        schema: {
                          required: ["wc_avatax_enable_co_rdf"],
                        },
                      },
                      {
                        scope:
                          "#/properties/tax_calculation/properties/wc_avatax_enable_tax_calculation",
                        schema: {
                          const: true,
                        },
                      },
                    ],
                  },
                },
              },
              {
                type: "Control",
                label: "Shipping tax code",
                scope:
                  "#/properties/tax_calculation/properties/wc_avatax_shipping_code",
                description:
                  "Set a default shipping tax code for transactions that are missing a shipping tax code. Avalara assigns the shipping tax code for a third-party common carrier (FR) if you don't enter a value.",
                customRule: {
                  effect: "SHOW",
                  condition: {
                    scope:
                      "#/properties/tax_calculation/properties/wc_avatax_enable_tax_calculation",
                    schema: {
                      const: true,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        type: "Control",
        scope: "#/properties/address_validation",
        options: {
          layout: "Accordion",
          elementLabelProp: "channel",
        },
        label: "Address validation",
        elements: [
          {
            type: "VerticalLayout",
            elements: [
              {
                type: "Control",
                label: "Enable address validation",
                scope:
                  "#/properties/address_validation/properties/wc_avatax_enable_address_validation",
                description:
                  "Turn this on to enable the Validate Address option. Customers can select it to validate and correct addresses in the U.S. and Canada.",
                options: {
                  toggle: true,
                  trueStatusLabel: "Yes",
                  falseStatusLabel: "No",
                },
              },
            ],
          },
        ],
        customRule: {
          effect: "SHOW",
          condition: {
            scope: "#",
            schema: {
              required: ["address_validation"],
            },
          },
        },
      },
      {
        type: "Control",
        scope: "#/properties/exemption_certificate_management",
        options: {
          layout: "Accordion",
          elementLabelProp: "channel",
        },
        label: "Exemption certificate management",
        elements: [
          {
            type: "VerticalLayout",
            elements: [
              {
                type: "Control",
                label: "Enable exemption certificates",
                scope:
                  "#/properties/exemption_certificate_management/properties/wc_avatax_enable_ecm",
                options: {
                  toggle: true,
                  trueStatusLabel: "Yes",
                  falseStatusLabel: "No",
                },
              },
            ],
          },
        ],
        customRule: {
          effect: "SHOW",
          condition: {
            scope: "#",
            schema: {
              required: ["exemption_certificate_management"],
            },
          },
        },
      },
      {
        type: "Control",
        scope: "#/properties/transactions_outside_the_us",
        options: {
          layout: "Accordion",
          elementLabelProp: "channel",
        },
        label: "Transactions outside the US",
        elements: [
          {
            type: "VerticalLayout",
            elements: [
              {
                type: "Control",
                label: "Collect business VAT ID",
                scope:
                  "#/properties/transactions_outside_the_us/properties/wc_avatax_enable_vat",
                description:
                  "Turn this on to provide a place for customers to enter their business VAT ID during checkout.",
                options: {
                  toggle: true,
                  trueStatusLabel: "Yes",
                  falseStatusLabel: "No",
                },
              },
            ],
          },
        ],
        customRule: {
          effect: "SHOW",
          condition: {
            scope: "#",
            schema: {
              required: ["transactions_outside_the_us"],
            },
          },
        },
      },
      {
        type: "Control",
        scope: "#/properties/logs",
        options: {
          layout: "Accordion",
          elementLabelProp: "channel",
        },
        label: "Logs",
        elements: [
          {
            type: "VerticalLayout",
            elements: [
              {
                type: "Control",
                label: "Enable logging",
                scope: "#/properties/logs/properties/wc_avatax_debug",
                description:
                  "Turn this on to create a log of API requests, responses, and errors for transactions. The log is saved in WooCommerce. It's useful when troubleshooting issues with transactions.",
                options: {
                  toggle: true,
                  trueStatusLabel: "Yes",
                  falseStatusLabel: "No",
                },
              },
            ],
          },
        ],
      },
    ],
  };
  const [helpGuide, setHelpGuide] = useState("");
  const [isContentLoading, setIsContentLoading] = useState(false);
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
    const companyInitEvent = new CustomEvent("onCompanyInit", {
      detail: [{ value: "DEFAULT", label: "TestCompany1" }],
    });
    dispatchEvent(companyInitEvent);
    setIsContentLoading(true);
    fetch("http://localhost:5000/user_guide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        connectors: ["WooCommerce", "Adobe Commerce"],
      }),
    })
      .then((res) => res.json())
      .then((guideContent) => {
        setHelpGuide(guideContent.guide);
        setIsContentLoading(false);
      });
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
                  <h2>Tell us more about your business</h2>
                </div>
                <div>
                  <JsonForms
                    schema={config}
                    uischema={uiSchema}
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
                  <button className="primary">Save</button>
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
                  {isContentLoading && (
                    <div className="flex flex-dir-col align-items-center">
                      <s-loader loading="" aria-live="polite"></s-loader>
                      <span className="loading-message">
                        We are generating personalized help guide for you. I
                        will take few minutes, Please wait.....
                      </span>
                    </div>
                  )}
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
