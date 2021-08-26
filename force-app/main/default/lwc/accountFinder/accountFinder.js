import { LightningElement, wire, track } from 'lwc';
import HotelName from '@salesforce/apex/AccountListControllerLwc.HotelName';

export default class ApexWireMethodToFunction extends LightningElement {
    @track Hotel;
    @track error;

    @wire(HotelName)
    wiredHotel__c({ error, data }) {
        if (data) {
            this.Hotel = data.HotelName.value;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.Hotel = undefined;
        }
    }
}