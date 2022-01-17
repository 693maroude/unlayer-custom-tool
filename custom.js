unlayer.registerTool({
    type: "whatever",
    category: "contents",
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
        title: "Ext app Link",
        position: 2,
        options: {
          ext_link: {
            widget: "link"
          }
        }
      }
    },
    renderer: {
      Viewer: unlayer.createViewer({
        render(values) {
          return `<div><a>Click here to sign</a></div>`;
        }
      }),
      exporters: {
        web: function (values) {
          const signatureDiv = `
          <div id="signature-link">
            <a href="${values.ext_link.url}" target="${values.ext_link.target}">
              Click to Sign Agreement
            </a>
          </div>
          <div 
            id="signature-form-template"
            ${values.display_title && "data--title"} 
            ${values.display_name && "data--name"} 
            ${values.display_date && "data--date"} 
            ${values.display_company_name && "data--company--name"}
          >
          </div>`;
  
          return signatureDiv;
        },
        email: function (values) {
          const signatureDiv = `
          <div id="signature-link">
            <a href="${values.ext_link.url}" target="${values.ext_link.target}">
              Click to Sign Agreement
            </a>
          </div>
          <div 
            id="signature-form-template"
            ${values.display_title && "data--title"} 
            ${values.display_name && "data--name"} 
            ${values.display_date && "data--date"} 
            ${values.display_company_name && "data--company--name"}
          >
          </div>`;
  
          return signatureDiv;
        }
      }
    }
  });
  
