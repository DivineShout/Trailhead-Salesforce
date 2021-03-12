({
   init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            { label: 'Name', fieldName: 'Name', type: 'text'},
            { label: 'Email', fieldName: 'Email__c', type: 'text'},
            { label: 'Gender', fieldName: 'Gender__c', type: 'text'},
            { label: 'Birth Day', fieldName: 'Birth_Day__c', type: 'text'}
        ]);
        helper.getData(cmp);
    },
     
    
    
    createClient: function (cmp, event, helper) {
        var recordEvent=$A.get("e.force:createRecord");
        recordEvent.setParams({
            "entityApiName": "Client__c"
        });
        recordEvent.fire();
    }
})
