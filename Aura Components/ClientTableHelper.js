({

 getClientList: function(component) {
 var action = component.get("c.getClients");

 action.setCallback(this, function(actionResult) {

 component.set("v.Clients", actionResult.getReturnValue()); 
 });
 $A.enqueueAction(action);
 }
})
