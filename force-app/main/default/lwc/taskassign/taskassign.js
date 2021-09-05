import { LightningElement, api, wire} from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import ACCOUNT_CHANNEL from "@salesforce/messageChannel/AccountDataMessageChannel__c";
import Comments from '@salesforce/schema/Task_Assignments__c.Comments__c';
import NAME_FIELD from '@salesforce/schema/Task_Assignments__c.Name';
import getTasks from '@salesforce/apex/TaskAssignmentController.getTasks';

export default class RecordFormExample extends LightningElement {
     
    @api objectApiName= 'Task_Assignments__c';
    handleSuccess(){
        alert('Record Created !!');
    }
    @wire(MessageContext)
    messageContext;

    @wire(getTasks) task;
    get name() {
        return this.task.data ? getSObjectValue(this.task.data, NAME_FIELD) : '';
    }
  
    //3. Handling the user input.
    //which in our case is going to be a button click
    handleClick() {
      const messaage = {
        recordId: Comments.data,
        name: "Sharmila"
      };
  
      //4. Publishing the message
      publish(this.messageContext, ACCOUNT_CHANNEL, messaage);
    }
  }