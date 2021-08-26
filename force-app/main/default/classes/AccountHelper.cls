public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Task_Assignments__c> getAccountList() {
        return [SELECT Name , Comments__c,Status__c,Employee__r.Name
            FROM Task_Assignments__c];
    }
}