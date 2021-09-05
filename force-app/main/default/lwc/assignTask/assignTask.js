import { LightningElement, api } from 'lwc';

export default class RecordFormExample extends LightningElement {
     
    @api objectApiName= 'Task_Assignments__c';
    handleSuccess(){
        alert('Record Created !!');
    }

}