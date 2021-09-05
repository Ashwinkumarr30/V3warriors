import { LightningElement, api } from 'lwc';
export default class AssignedTask extends LightningElement {
    @api objectApiName = "Onboarding_Steps__c";
    handleSuccess(){
        alert('Record Created !!');
    }







}