({
	showToast : function(title, message, error) {
        let toastParams = {
            title: title,
            message: message,
            type: error
        };
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams(toastParams);
        toastEvent.fire();
    }
})
