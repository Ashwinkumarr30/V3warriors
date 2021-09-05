import { LightningElement ,api, wire, track} from 'lwc';
import getAssignmentList from '@salesforce/apex/AccountHelper.getAssignmentList';
export default class LightningDatatableLWCExample extends LightningElement {
@wire(getAssignmentList) accounts; 
}