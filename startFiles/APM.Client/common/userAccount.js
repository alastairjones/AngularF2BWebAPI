(function () {
    "use strict";

    angular
        .module("common.services", ["ngResource"])
        .factory("userAccount",
                ["$resource",
                 "appSettings",
                  userAccount])


    function userAccount($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/Account/Register", null, // null added so we don't add default id's on the client side
            { // Added a custom update action to our product resource service
                'registerUser': {method: 'PUT'}
            }
            );
    }

}());