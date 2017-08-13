define(function () {
	app.registerController('SignInCtrl', ['$scope', '$rootScope', '$http', '$state', function ($scope, $rootScope, $http, $state) {
		$scope.status = "";
		$scope.user = {
			auth: "",
			password: ""
		};

		$scope.authenticate = function (user) {
			$scope.status = "Authenticating..";

			var pwd = user.password;
			user.password = "";

			$http.post('/auth/login', {
				auth: user.auth,
				password: pwd
			}).success(function (data, status) {
				$scope.status = "Login Successful";
				window.location = document.baseURI;
			}).error(function (data, status) {
				if (status == 400) {
					// Login Failed
					$scope.status = data.message;
					if (!data.message) {
						$scope.status = "Invalid login"
					}

					return;
				}

				$scope.status = status + ' Request Failed. Try again later.';
			});
		}
	}]);
});