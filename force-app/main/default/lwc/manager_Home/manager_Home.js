import { LightningElement, wire } from 'lwc';
import getContactsApex from '@salesforce/apex/Mentor_Controller.getContacts'
import getemployeeApex from '@salesforce/apex/Employee_Controller.getContacts'

export default class Project extends LightningElement {
    @wire(getContactsApex) wiredContacts1; //These will be automatically available if successful
    getContactsFromSalesforce() {
        getContactsApex()
        .then(contacts => {
            //console.log(JSON.stringify(contacts))
            console.log('Got Contacts: ' + contacts.length);
        })
        .catch(error => {
            console.log(error)
        });
    }
    @wire(getemployeeApex) wiredContacts;
    getContactsFromSalesforce() {
        getemployeeApex()
        .then(employee => {
            //console.log(JSON.stringify(contacts))
            console.log('Got Contacts: ' + employee.length);
        })
        .catch(error => {
            console.log(error)
        });
    }
    
}