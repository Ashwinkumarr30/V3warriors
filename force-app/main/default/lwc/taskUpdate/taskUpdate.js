import { LightningElement, api, wire } from 'lwc';
import {getRecord, getFieldValue, updateRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import OPPORTUNITY_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Opportunity.Account.Name';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Opportunity.Account.Id';
import Status_Field from '@salesforce/schema/Task_Assignments__c.Status__c';
import Id_Field from '@salesforce/schema/Task_Assignments__c.Id';
export default class TaskUpdate extends LightningElement {
    
    @api bear;
    @api recordId; // get the current record id
    // Wire method to get the data of fields
    @wire(getRecord, { recordId: 'a040p000000oaNvAAI', fields })
    Task_Assignments__c;
    updateAccount(){
        console.log("came into updateAccount()")
        console.log(JSON.stringify(this.Task_Assignments__c))
        console.log("recordId: " + this.recordId)
        /*
        * we can access field values directly referencing the value
        * or you can use also use getFieldValue to get the value
        */
        let oppName = this.Task_Assignments__c.data.fields.Status__c.value;
        console.log("oppName: " + oppName);
        //let oppName = this.opportunity.data.fields.Name.value; // Also access this way
        let accName = this.opportunity.data.fields.Account.value.fields.Name.value;
        let accId = getFieldValue(this.opportunity.data, Id_Field);
       
        
         
            let fields = {
                Id: accId,
                Status__c: oppName
            }
            const recordInput = { fields };
            updateRecord(recordInput)
            .then(() =>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success!',
                        message: 'Task Status updated successfully',
                        variant: 'success'
                    })
                )
            })
            .catch(error =>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error!',
                        message: 'Something went wrong while updating Status',
                        variant: 'error'
                    })
                )
            })
         
    }
    }