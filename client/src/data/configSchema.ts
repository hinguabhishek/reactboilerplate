export const configSchema = {
  $id: "http://example.com/schema",
  $schema: "http://json-schema.org/draft-07/schema#",
  $defs: {
    address_validation_obj: {
      type: "object",
      additionalProperties: false,
      properties: {
        address_validation_enabled: {
          type: "boolean",
          default: true,
        },
      },
    },
    common: {
      type: "object",
      additionalProperties: false,
      properties: {
        collect_business_vat_id: {
          type: "boolean",
          default: false,
        },
        company_name: {
          type: "string",
        },
        enable_tax_calculation: {
          type: "boolean",
          default: false,
        },
        enable_exemption_certificates: {
          type: "boolean",
          default: true,
        },
        shipping_tax_code: {
          type: "string",
        },
        validate_address: {
          type: "boolean",
          default: true,
        },
      },
    },
    exemption_certificate_management_obj: {
      type: "object",
      additionalProperties: false,
      properties: {
        enabled: {
          type: "boolean",
          default: true,
        },
      },
    },
    integration_settings: {
      type: "object",
      additionalProperties: false,
      properties: {
        avatax_timeout: {
          type: "string",
          default: "60",
        },
        error_action: {
          default: "2",
          oneOf: [
            {
              const: "1",
              title: "Disable checkout & show error message",
            },
            {
              const: "2",
              title:
                "Allow checkout & fall back to native Adobe Commerce tax calculation (no error message)",
            },
          ],
          type: "string",
        },
        logging_db_detail: {
          default: "1",
          oneOf: [
            {
              const: "1",
              title: "Minimal",
            },
            {
              const: "2",
              title: "Normal",
            },
            {
              const: "3",
              title: "Extra",
            },
          ],
          type: "string",
        },
        logging_db_level: {
          default: "300",
          oneOf: [
            {
              const: "100",
              title: "Debug",
            },
            {
              const: "200",
              title: "Info",
            },
            {
              const: "250",
              title: "Notice",
            },
            {
              const: "300",
              title: "Warning",
            },
            {
              const: "400",
              title: "Error",
            },
            {
              const: "500",
              title: "Critical",
            },
          ],
          type: "string",
        },
        one_way_items_sync: {
          type: "boolean",
          default: false,
        },
      },
    },
  },
  type: "object",
  properties: {
    address_validation_obj: {
      $ref: "#/$defs/address_validation_obj",
    },
    common: {
      $ref: "#/$defs/common",
    },
    exemption_certificate_management_obj: {
      $ref: "#/$defs/exemption_certificate_management_obj",
    },
    integration_settings: {
      $ref: "#/$defs/integration_settings",
    },
  },
};
