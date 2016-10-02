spilldb.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      };

      element.bind('focus', function() {
        scope.$apply(function() {
        });
      });

      element.bind('blur', function() {
        scope.$apply(function() {
          //scope.showLog = false;
        });
      });

      element.bind('keyup', function() {
        scope.$apply(function() {
          //scope.showLog = false;
        });
      });

      element.bind('paste', function() {
        scope.$apply(function() {
          //scope.showLog = false;
          console.log('paste');
        });
      });

      ngModel.$render = function() {
        if(ngModel.$viewValue)
          ngModel.$viewValue = ngModel.$viewValue.replace(/<\/?[^>]+(>|$)/g, "");
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});