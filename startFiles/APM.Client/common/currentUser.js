(function () {
    "use strict";

    // Note this is a singleton for use in all the controllers that have this injected.

    angular
        .module("common.services")
        .factory("currentUser",
                    currentUser)

    function currentUser() {
        var profile = {
            isLoggedIn: false,
            username: "",
            token: ""
        };

        var setProfile = function (username, token) {
            profile.username = username;
            profile.token = token;
            profile.isLoggedIn = true;
        };

        var getProfile = function () {
            return profile;
        }

        return {
            setProfile: setProfile,
            getProfile: getProfile
        }

    }
        

}());