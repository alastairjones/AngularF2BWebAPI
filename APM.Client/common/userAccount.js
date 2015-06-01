(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("userAccount",
                ["$resource",
                 "appSettings",
                  userAccount])


    function userAccount($resource, appSettings) {
        return {            
                registration: $resource(appSettings.serverPath + "/api/Account/Register", null,
                    {
                        'registerUser' : { method: 'POST' }
                    }),
                login: $resource(appSettings.serverPath + "/Token", null,
                    {
                        'loginUser': {
                            method: 'POST',
                            // Because of the login of the web api needs a different api then we need to set it here.
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            // Now the default $resource changes our request to JSON format we don't want that
                            // so we need to change to an encoded string using the following
                            transformRequest: function (data, headersGetter) {
                                var str = [];
                                for (var d in data)
                                    str.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
                                        
                                return str.join("&");
                            }
                        }
                    })
            }
        
    }

}());