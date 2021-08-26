import {
    LightningElement,
    track,
    api
  } from "lwc";
  import {
    NavigationMixin
  } from "lightning/navigation";
  
  export default class ContactFormWithCustomLookup extends NavigationMixin(
    LightningElement
  ) {
    @api title = "Create Contact";
    @track selectedAccountRecord;
    @track isLoaded = false;
  
    contactCreateSuccess(event) {
      this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
          recordId: event.detail,
          objectApiName: "Contact", // objectApiName is optional
          actionName: "view"
        }
      });
    }
  
    contactCancel() {
      this[NavigationMixin.Navigate]({
        type: "standard__objectPage",
        attributes: {
          objectApiName: "Account",
          actionName: "home"
        }
      });
    }
  
    handlelookupselectaccount(event) {
      this.selectedAccountRecord = event.detail;
    }
  }