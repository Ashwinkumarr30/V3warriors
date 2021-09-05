import { LightningElement,api } from 'lwc';

export default class Lwc extends LightningElement {
    @api objectApiName = "Employee__c";
    handleSuccess(){
        alert('Record Created !!');
    }
    @api objectApiName1= 'Task_Assignments__c';
    handleSuccess(){
        alert('Record Created !!');
    }
}