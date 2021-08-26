public with sharing class AccountListControllerLwc {
    @AuraEnabled(cacheable=true)
    public static List<	Hotel__c> HotelName() {
        return [
            SELECT Name
            FROM Hotel__c
            WHERE 	Cities__c = 'Chennai'
        ];
   }
}