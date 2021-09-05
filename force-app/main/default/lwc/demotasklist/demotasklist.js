import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { loadStyle } from 'lightning/platformResourceLoader';

import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/taskcontroller.searchBears';

import {
    subscribe,
    unsubscribe,
    MessageContext
  } from "lightning/messageService";
  import ACCOUNT_CHANNEL from "@salesforce/messageChannel/AccountDataMessageChannel__c";
  
export default class BearListNav extends NavigationMixin(LightningElement) {
	@track searchTerm = '';
    @track bears;
    @wire(CurrentPageReference) pageRef;
    @wire(searchBears, {searchTerm: '$searchTerm'})
    loadBears(result) {
        this.bears = result ;
        if (result.data) {
            fireEvent(this.pageRef, 'bearListUpdate', result.data);
        }
    }
	connectedCallback() {
		loadStyle(this, ursusResources + '/style.css');
	}
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.bears.data.length > 0);
	}
	handleBearView(event) {
		// Navigate to bear record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: event.target.bear.Id,
				objectApiName: 'Task_Assignment__c',
				actionName: 'view',
			},
		});
	}
    @wire(MessageContext)
    messageContext;
  
    receivedMessage;
    subscription = null;
    //3. Handling the user input
    handleSubscribe() {
      console.log("in handle subscribe");
      if (this.subscription) {
        return;
      }
  
      //4. Subscribing to the message channel
      this.subscription = subscribe(
        this.messageContext,
        ACCOUNT_CHANNEL,
        (message) => {
          this.handleMessage(message);
        }
      );
    }
  
    handleMessage(message) {
      this.receivedMessage = message
        ? JSON.stringify(message, null, "\t")
        : "no message";
    }
  
    handleUnsubscribe() {
      console.log("in handle unsubscribe");
  
      unsubscribe(this.subscription);
      this.subscription = null;
    }
  
    handleClear() {
      this.receivedMessage = null;
    }

}