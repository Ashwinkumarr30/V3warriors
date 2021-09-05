import { LightningElement, wire } from 'lwc';
import getAssignmentList from '@salesforce/apex/TaskHelper.getAssignmentList';
export default class DemoLWC extends LightningElement {

@wire(getAssignmentList) task;    
}