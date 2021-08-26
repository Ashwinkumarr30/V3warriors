import { LightningElement, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Employee__c.Name';
import DESIGNATION_FIELD from '@salesforce/schema/Employee__c.Designation__c';
import PHONE_FIELD from '@salesforce/schema/Employee__c.Primary_Phone__c';
import createEmployee from '@salesforce/apex/createEmployee.createEmployee';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class InputFormForCustomObject extends LightningElement {

    @track name = NAME_FIELD;
    @track designation = DESIGNATION_FIELD;
    @track phone = PHONE_FIELD;
    rec = {
        Name : this.name,
        Designation : this.Designation__c,
        Phone : this.Primary_Phone__c
    }

    handleNameChange(event) {
        this.rec.Name = event.target.value;
        console.log("name1", this.rec.Name);
    }
    
    handleDesChange(event) {
        this.rec.Designation = event.target.value;
        console.log("Designation", this.rec.Designation);
    }
    
    handlePhnChange(event) {
        this.rec.Phone = event.target.value;
        console.log("Phone", this.rec.Phone);
    }

    handleClick() {
        createEmployee({ hs : this.rec })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.rec.Name = '';
                    this.rec.Designation = '';
                    this.rec.Phone = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Employee created',
                            variant: 'success',
                        }),
                    );
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }
}