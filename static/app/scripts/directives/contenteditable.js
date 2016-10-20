spilldb.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    scope: {
      game: "=",
      gameRow: "="
    },
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      };

      element.bind('focus', function() {
        scope.$apply(function() {
          console.log('got focus');
          scope.game.selected = true;
          scope.game.rowSelected = scope.gameRow;
          console.log(scope.game);
        });
      });

      element.bind('blur', function() {
        scope.$apply(function() {
          scope.game.selected = false;
          scope.game.rowSelected = false;
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
          ngModel.$viewValue = ngModel.$viewValue.replace(/<(?!br\s*\/?)[^>]+>/g, '');
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});