({    
    handleCreateClient : function(component, event, helper) {

        var name = component.get('v.name');
        var email = component.get('v.email');
        var gender = component.get('v.gender');
        var birthday = component.get('v.birthday');
        if(name == undefined || name == null || name == '') {
         	helper.showToast('Fault!', 'Please fill up name', 'error');
        }
        else {
        	var saveClientAction = component.get('c.saveClient');
        	saveClientAction.setParams({
            	name : name,
                email : email,
                gender : gender,
                birthday : birthday
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
