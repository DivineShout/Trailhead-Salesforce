({    
    handleCreateClient : function(component, event, helper) {

        var name = component.get('v.newClient.Name');
        if(name == undefined || name == null || name == '') {
         	helper.showToast('Fault!', 'Please fill up name', 'error');
        }
        else {
        	var saveClientAction = component.get('c.addClient');
        	saveClientAction.setParams({
            	client : component.get('v.newClient')
        	});
        	saveClientAction.setCallback(this,function(response){
                var state = response.getState();
         		if(state === "SUCCESS") {
  					helper.showToast('Success!', 'Record Inserted Successfully', 'success');
         		}
        	});
        	$A.enqueueAction(saveClientAction);
      	}	
	}
})
