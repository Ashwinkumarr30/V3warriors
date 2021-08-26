public with sharing class createEmployee {
    @AuraEnabled
   public static Employee__c createEmployee(Employee__c hs) {
       
       insert hs;
       return hs;
   }
}
