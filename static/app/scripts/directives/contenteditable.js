spilldb.directive("contenteditable", function($rootScope) {
  return {
    restrict: "A",
    require: "ngModel",
    scope: {
      game: "=",
      gameRow: "=",
      noBreak: "="
    },
    link: function(scope, element, attrs, ngModel) {
      function read() {
        ngModel.$setViewValue(element.html());
      };

      element.bind('focus', function() {
        scope.$apply(function() {
          scope.game.selectedRow = scope.gameRow;

        });
      });

      element.bind('blur', function() {
        scope.$apply(function() {
        });
      });

      element.bind('keyup', function() {
        scope.$apply(function() {
        });
      });

      element.bind('paste', function() {
        scope.$apply(function() {
        });
      });

      ngModel.$render = function() {
        if(ngModel.$viewValue && !scope.noBreak) {
          ngModel.$viewValue = ngModel.$viewValue.replace(/<(?!br\s*\/?)[^>]+>/g, '');
        }

        if(ngModel.$viewValue && scope.noBreak) {
          ngModel.$viewValue = ngModel.$viewValue.replace(/<\/?[^>]+(>|$)/g, "");
        }
        if(ngModel.$viewValue == "<br>") {
          ngModel.$viewValue = "";
        }
        element.html(ngModel.$viewValue || "");

      };

      element.bind("blur keyup change focus", function() {
        scope.$apply(read);
        scope.game.changeHandler[scope.gameRow](scope.gameRow, scope.game[scope.gameRow]);
      });
    }
  };
});