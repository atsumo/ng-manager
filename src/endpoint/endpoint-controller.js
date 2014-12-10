angular
.module('ngManager')
.controller('EndpointCtrl', function( $q, $scope, $rootScope, $schemaForm, $endpointService, $apiService, $errorService) {

    $scope.endpoints = $endpointService.getAll();

    $scope.remove = function(index) {
      $endpointService.remove(index);
    };

    $scope.select = function(index) {
      $endpointService.select(index);
      $apiService
      .setup()
      .then(function() {
        location.hash = 'top';
      }, function(err) {
        $errorService.showError(err);
      })
      ;
    };

    var add = function(endpoint) {
      $endpointService.add(endpoint);
    };

    $rootScope.$emit('content.title', {
      section: 'Settings',
      page: 'Endpoints'
    });

    // Showing form for adding new schema
    $scope.showForm = function($event) {

      $schemaForm.showDialog({
        title: 'Add the endpoint',
        event: $event,
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            url: { type: 'string', format: 'uri', style: 'long' },
            /*
            boolean: { type: 'boolean' },
            number: {type: 'number'},
            checkboxes: {
              type: 'array',
              enum: ['dr','jr','sir','mrs','mr','NaN','dj']
            },
            array: {
              type: 'array',
              items: {
                string_in_array: { type: 'string' },
                boolean_in_array: { type: 'boolean'}
              }
            }
            */
          },
          required: ['name','url']
        },
        submit: function(scope) {
          var deferred = $q.defer();
          var entity = scope.entity;
          add(entity);
          deferred.resolve();
          return deferred.promise;
        }
      });

    };

  }
);
