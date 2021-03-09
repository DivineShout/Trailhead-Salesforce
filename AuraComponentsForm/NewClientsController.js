({
    handleCreateClient: function(component, event) {
        var saveClientAction = component.get("c.addClient");
            saveClientAction.setParams({
                "client": component.get("v.newClient")
            });
        
        saveClientAction.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.message", "Client created successfully");
            }
            else if (state === "ERROR") {
                console.log('Problem saving client, response state: ' + state);
            }
            else {
                console.log('Unknown problem, response state: ' + state);
            }
        });
 
        $A.enqueueAction(saveClientAction);
    },
})
