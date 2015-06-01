(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("productResource",
               ["$resource",
                "appSettings",
                "currentUser",
                productResource])

    // Also inject the currentUser service in here so we can send the access token to the server
    function productResource($resource, appSettings, currentUser) {
        return $resource(appSettings.serverPath + "/api/products/:id", null, // null added so we don't add default id's on the client side
            { // Added a custom update action to our product resource service
                // By default you don't need to specify the get and save methods as they 
                // are provided by $resource but here we did as we needed to send the Bearer token
                'get': {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                },
                'save': {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                },
                'update': {
                    method: 'PUT',
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                }
                
            }
            );
    }

}());