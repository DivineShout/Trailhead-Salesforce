({
    getData : function(cmp) {
        var action = cmp.get('c.getClients');
        action.setParams({
            limitSize : cmp.get('v.initialRows')
        });
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set('v.data', response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    }
       
})
