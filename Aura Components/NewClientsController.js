({
	createClient : function(component, event, helper) {
        var recordEvent=$A.get("e.force:createRecord");
        recordEvent.setParams({
            "entityApiName": "Client__c"
        });
        recordEvent.fire();
 }
})
