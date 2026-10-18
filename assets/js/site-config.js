/* Set values only after verifying the provider and ownership of the mailbox. */
window.BIZFLIGHT_CONTACT = {
  provider: "", // "google-forms" or "typeform"
  googleFormAction: "", // Example format: https://docs.google.com/forms/d/e/FORM_ID/formResponse
  googleFormFields: {
    full_name: "",
    email: "",
    company: "",
    service: "",
    engagement: "",
    message: ""
  },
  typeformUrl: "", // Example format: https://form.typeform.com/to/FORM_ID
  verifiedEmail: "" // Only use an address after the mailbox is live
};
