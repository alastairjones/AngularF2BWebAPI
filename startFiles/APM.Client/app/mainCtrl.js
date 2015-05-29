(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("MainCtrl",
                ["userAccount",
                    MainCtrl]);

    function MainCtrl(userAccount) {
        var vm = this;
        vm.isLoggedIn = false;
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.registerUser = function () {
            vm.userData.confirmPassword = vm.userData.password;

            userAccount.registerUser(vm.userData,
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

        }
    }

}());