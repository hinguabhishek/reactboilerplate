export const layout = {
  elements: [
    {
      type: "Control",
      label: "Tax Settings",
      options: {
        layout: "Accordion",
        "elementLabelProp": "channel"
      },
      elements: [
       {
        type: "VerticalLayout",
        elements:[ {
            label: "Enable exemption certificates",
            scope: "#/properties/common/properties/enable_tax_calculation",
            type: "Control",
            options: {
              toggle: true,
              trueStatusLabel: "Yes",
              falseStatusLabel: "No",
            },
          },
        {
          label: "Company name",
          scope: "#/properties/common/properties/company_name",
          type: "Control",
          options: {
            optionList: true,
            eventListener: "onCompanyInit",
          },
        },
        {
          label: "Enable exemption certificates",
          scope: "#/properties/common/properties/enable_exemption_certificates",
          type: "Control",
          options: {
            toggle: true,
            trueStatusLabel: "Yes",
            falseStatusLabel: "No",
          },
        },
        {
          label: "Shipping tax code",
          scope: "#/properties/common/properties/shipping_tax_code",
          type: "Control",
        },
        {
          label: "Validate address",
          scope: "#/properties/common/properties/validate_address",
          type: "Control",
          options:{
            toggle: true,
            trueStatusLabel: "Yes",
            falseStatusLabel: "No",
          },
        },
        {
          label: "Collect Business VAT ID",
          scope: "#/properties/common/properties/collect_business_vat_id",
          type: "Control",
          options: {
            toggle: true,
            trueStatusLabel: "Yes",
            falseStatusLabel: "No",
          },
        }]
       }
      ],
      
    },
    {
        elements: [
            {
                type:"VerticalLayout",
                elements:[ 
                    {
                        "type": "Control",
                        "label": "Error action (store view)",
                        "scope": "#/properties/integration_settings/properties/error_action",
                        "description": "If there is an error when Avalara estimates tax, the extension uses Adobe Commerce tax rules. If Disable checkout and show error message is selected, the extension prevents users and admins from placing orders."
                    },
                    {
                        "type": "Control",
                        "label": "Database log detail (global)",
                        "scope": "#/properties/integration_settings/properties/logging_db_detail",
                        "description": "'Minimal' is recommended if you're connected to an Avalara production account."
                    },
                    {
                        "type": "Control",
                        "label": "Database log level (global)",
                        "scope": "#/properties/integration_settings/properties/logging_db_level",
                        "description": "'Warning' is recommended if you're connected to an Avalara production account."
                    },
                    {
                        "type": "Control",
                        "label": "Avalara API timeout (store view)",
                        "scope": "#/properties/integration_settings/properties/avatax_timeout",
                        "description": "This is how long Adobe Commerce should wait to hear from Avalara's servers before assuming they aren't responding."
                    },
                    {
                    label:'Sync products with Avalara (store view)',
                    scope:"#/properties/integration_settings/properties/one_way_items_sync",
                    type: "Control",
                    options: {
                      toggle: true,
                      falseStatusLabel: "No",
                      trueStatusLabel: "Yes",
                    },}]
            }
],
      label: "Integration Settings",
      options: {
        elementLabelProp: "channel",
        layout: "Accordion",
      },
      type: "Control",
    },
    {
        "type": "Control",
        "scope": "#/properties/address_validation_obj",
        "options": {
            "layout": "Accordion",
            "elementLabelProp": "channel"
        },
        "label": "Address validation",
        "elements": [
            {
                "type": "VerticalLayout",
                "elements": [
                    {
                        "type": "Control",
                        "label": "Validate addresses (store view)",
                        "scope": "#/properties/address_validation_obj/properties/address_validation_enabled",
                        "options": {
                            "toggle": true,
                            "trueStatusLabel": "Yes",
                            "falseStatusLabel": "No"
                        },
                        "description": "Turn this on to enable the Validate addresses option. Customers can use it to validate and correct addresses in the US and Canada."
                    }
                ]
            }
        ],
    },
    {
        "type": "Control",
        "scope": "#/properties/exemption_certificate_management_obj",
        "options": {
          "layout": "Accordion",
          "elementLabelProp": "channel"
        },
        "label": "Exemption certificate management",
        "elements": [
          {
            "type": "VerticalLayout",
            "elements": [
              {
                "type": "Control",
                "label": "Enable exemption certificates (store view)",
                "scope": "#/properties/exemption_certificate_management_obj/properties/enabled",
                "description": "Turn this on to add a link during checkout for customers to create or upload exemption certificates. You must have a subscription to Avalara Exemption Certificate Management (ECM) to use this feature.",
                "options": {
                  "toggle": true,
                  "trueStatusLabel": "Yes",
                  "falseStatusLabel": "No"
                }
              }
            ]
          }
        ],
    },
  ],
  type: "VerticalLayout",
};
