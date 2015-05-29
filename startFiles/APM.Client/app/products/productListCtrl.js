(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("ProductListCtrl",
                     ["productResource",ProductListCtrl]);

    function ProductListCtrl(productResource) {
        var vm = this;

        vm.searchCriteria = "Hand";
        vm.sortProperty = "Price";
        vm.sortDirection = "desc";

        // OData operators

        // Operator   Description             Example
        // eq         Equal                   $filter:"Price eq 10"
        // ne         Not Equal               $filter:"Price ne 10"
        // gt         Greater than            $filter:"Price gt 10"
        // ge         Greater than or equal   $filter:"Price ge 10"
        // lt         Less than               $filter:"Price lt 10"
        // le         Less than or equal      $filter:"Price le 10"
        // and        Logical and             $filter:"Price gt 10 and Price lt 20"
        // or         Logical or              $filter:"Price gt 10 or Price lt 20"
        // not        Logical negation        $filter:"(Price lt 10) and not (Price eq 10)"

        // $filter String functions

        // Function      Description                   Example
        // startswith    String begins with            $filter: "startswith(ProductCode, 'GDN')"
        // endswith      Ends with                     $filter: "endswith(ProductCode, '001')"
        // contains      String contains               $filter: "contains(ProductCode, 'GDN')"
        // tolower       Converts String to lowercase  $filter: "tolower(ProductCode) eq 'gdn-001')"
        // toupper       Converst String to uppercase  $filter: "toupper(ProductCode) eq 'GDN-001')"


        // Other odata functions

        // Aritmetic operators      Addition, subtraction, etc
        // Date functions           year,month, day, now etc
        // Numeric function         round, floor, etc 
        // Geo functions            distance, length, etc
        // Lambda operators         any, all
        // Literals                 null, etc


        





        // Note the object below sends a search query string parameter
        productResource.query({
            // gt  =   >
            // ge  =    >=
            // lt and le expressions also

            //$filter: "contains(ProductCode,'GDN') and Price ge 8 and Price le 20",
            //$orderby: "Price desc" }, function (data) {
            
            $filter: "contains(ProductCode,'" + vm.searchCriteria + "') " + 
                " or contains(ProductName,'" + vm.searchCriteria + "') ",
            $orderby: vm.sortProperty + " " + vm.sortDirection }, function (data) {
            vm.products = data;
        });

    }
}());
