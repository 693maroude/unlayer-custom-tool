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
                    (values.display_title ?
                        `<div style="${divStyle}">
                            <label style="${labelStyle}">
                                Title
                              </label>

                            <input style="${inputStyle}" readonly>
                        </div>` :
                        ``) +
                    (values.display_name ?
                        `<div style="${divStyle}">
                            <label style="${labelStyle}">
                                Name
                              </label>

                            <input style="${inputStyle}" readonly>
                        </div>` :
                        ``) +
                    (values.display_date ?
                        `<div style="${divStyle}">
                          <label style="${labelStyle}">
                              Date
                            </label>

                          <input style="${inputStyle}" readonly>
                      </div>` :
                        ``) +
                    (values.display_company_name ?
                        `<div style="${divStyle}">
                          <label style="${labelStyle}">
                              Company Name
                            </label>

                          <input style="${inputStyle}" readonly>
                      </div>` :
                        ``) +
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
            web: function(values) {
                const signatureDiv = `
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
            email: function(values) {
                const signatureDiv = `
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
