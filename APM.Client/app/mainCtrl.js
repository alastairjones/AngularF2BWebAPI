(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("MainCtrl",
                ["userAccount",
                     "currentUser",
                    MainCtrl]);

    function MainCtrl(userAccount,currentUser) {
        var vm = this;

        // This will reference the service to see if 
        // we are logged in 
        vm.isLoggedIn = function () {
            return currentUser.getProfile().isLoggedIn;
        };
        
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.registerUser = function () {
            vm.userData.confirmPassword = vm.userData.password;

            userAccount.registration.registerUser(vm.userData,
                function (data) {
                    vm.confirmPassword = "";
                    vm.message = "... Registration successfull";
                    vm.login();
                },
                function (response) // Handle WedApi2 IHttpActionResult
                {
                    vm.message = response.statusText + "\r\n";

                    // Now check if there was any server side validation 
                    // errors of the model we passed in 
                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            vm.message += response.data.modelState[key] + "\r\n";
                        }
                    }

                    // If the server had an exception then display the message
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;
                });
        }

        vm.login = function () {
            //
            vm.userData.grant_type = "password"; 
            vm.userData.userName = vm.userData.email;

            userAccount.login.loginUser(vm.userData,
                   // Success
                  function (data) {
                      vm.message = "";
                      vm.password = "";
                      // Now store the access token for use elsewhere in the app
                      currentUser.setProfile(vm.userData.userName, data.access_token);
                  },
                  // Error
                  function (response) {
                      vm.password = "";
                      vm.message = response.statusText + "\r\n";
                      if (response.data.exceptionMessage)
                          vm.message += response.data.exceptionMessage;

                      if (response.data.error)
                      {
                          vm.message += response.data.error;
                      }

                  }
             )
        }
    }

}());