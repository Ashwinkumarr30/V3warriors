import { LightningElement, api } from 'lwc';
export default class AssignedTask extends LightningElement {
    @api objectApiName = "Employee__c";
    handleSuccess(){
        alert('Record Created !!');
    }







}