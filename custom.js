unlayer.registerTool({
  name: "custom-signature-tool",
  usageLimit: 1,
  label: "Signature",
  icon: "fa-file-signature",
  values: {},
  options: {
    toggleInputs: {
      title: "Input fields",
      position: 1,
      options: {
        display_title: {
          label: "Title",
          defaultValue: true,
          widget: "toggle"
        },
        display_name: {
          label: "Name",
          defaultValue: true,
          widget: "toggle"
        },
        display_date: {
          label: "Date",
          defaultValue: true,
          widget: "toggle"
        },
        display_company_name: {
          label: "Company Name",
          defaultValue: true,
          widget: "toggle"
        }
      }
    },
    extLink: {
      title: "Setup external app",
      position: 2,
      options: {
        ext_app_url: {
          label: "External app url",
          widget: "text",
          defaultValue: `https://esignature.clevero.co/`
        },
        url_text: {
          label: "Url text",
          widget: "text",
          defaultValue: "Click to Sign Agreement"
        },
        instance_id: {
          label: "Instance Identifier",
          widget: "text",
          defaultValue: "",
        },  
        template_id: {
          label: "Template ID",
          widget: "text",
          defaultValue: `${
            window.location !== window.parent.location
              ? document.referrer.substring(
                  window.location.href.lastIndexOf("/") + 1
                )
              : document.location.href.substring(
                  window.location.href.lastIndexOf("/") + 1
                )
          }`
        },
        uuid: {
          label: "Uniquely identifying field",
          widget: "text",
          defaultValue: `{{[uuid]}}`
        }
      }
    }
  },
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        const formStyle = `
            background-color: #fafbfa;
            border: 1px solid #f1f1f1;
            border-radius: 0.5em;
            font-size: 0.875rem;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
            padding: 10px;
        `;
        const divStyle = `
            position: relative;
            padding: 0.75rem 1.25rem;
            boxSizing: border-box;
        `;
        const labelStyle = `
            display: block;
            textTransform: capitalize;
            lineHeight: 1.5;
        `;
        const inputStyle = `
            width: 100%;
            lineHeight: 1.5;
            background-color: #f7f7f7;
            border: none;
            border-bottom: 1px solid #aaa;
            padding: 12px 0 8px 8px;
            outline: none;
        `;
        const fields =
          `<form style="${formStyle}">` +
          (values.display_title
            ? `<div style="${divStyle}">
                            <label style="${labelStyle}">
                                Title
                              </label>

                            <input style="${inputStyle}" readonly>
                        </div>`
            : ``) +
          (values.display_name
            ? `<div style="${divStyle}">
                            <label style="${labelStyle}">
                                Name
                              </label>

                            <input style="${inputStyle}" readonly>
                        </div>`
            : ``) +
          (values.display_date
            ? `<div style="${divStyle}">
                          <label style="${labelStyle}">
                              Date
                            </label>

                          <input style="${inputStyle}" readonly>
                      </div>`
            : ``) +
          (values.display_company_name
            ? `<div style="${divStyle}">
                          <label style="${labelStyle}">
                              Company Name
                            </label>

                          <input style="${inputStyle}" readonly>
                      </div>`
            : ``) +
          `<div style="${divStyle}">
                          <label style="${labelStyle}">
                              Signature
                            </label>

                          <input style="${inputStyle}" readonly>
                      </div>` +
          `</form>`;
        return fields;
      }
    }),
    exporters: {
      web: function (values) {
        const signatureDiv = `
        <div id="signature-link">
          <a href="${values.ext_app_url}/pdf?id=${values.template_id}&instance=${values.instance_id}&uuid=${
          values.uuid
        }" target="_blank">
            ${values.url_text}
          </a>
        </div>
        <div 
          id="signature-form-template"
          ${values.display_title && "data--title"} 
          ${values.display_name && "data--name"} 
          ${values.display_date && "data--date"} 
          ${values.display_company_name && "data--company--name"}
          data--signature
        >
        </div>`;

        return signatureDiv;
      },
      email: function (values) {
        const signatureDiv = `
        <div id="signature-link">
          <a href="${values.ext_app_url}/pdf?id=${values.template_id}&instance=${values.instance_id}&uuid=${
          values.uuid
        }" target="_blank">
            ${values.url_text}
          </a>
        </div>
        <div 
          id="signature-form-template"
          ${values.display_title && "data--title"} 
          ${values.display_name && "data--name"} 
          ${values.display_date && "data--date"} 
          ${values.display_company_name && "data--company--name"}
          data--signature
        >
        </div>`;

        return signatureDiv;
      }
    }
  }
});
