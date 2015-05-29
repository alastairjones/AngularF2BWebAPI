(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("productResource",
               ["$resource",
                "appSettings",
                productResource])

    function productResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/products/:id", null, // null added so we don't add default id's on the client side
            { // Added a custom update action to our product resource service
                'update': {method: 'PUT'}
            }
            );
    }

}());