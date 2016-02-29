angular.module('startupReviewApp').controller('homeCtrl', [
  '$scope',
  function($scope) {
    $scope.companies = [{
      name: 'AdHawk',
      shortDescription: 'Simplify your digital advertising.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor, risus id mattis faucibus, mauris felis ultricies felis, a molestie sem enim in velit.',
      location: 'New York City',
      votes: 18,
      reviews: 45,
      profilePic: 'https://s3.amazonaws.com/startupreview/adhawk.png',
      author: {
        firstName: 'Jole',
        lastName: 'Edgerton',
        profilePic: 'https://s3.amazonaws.com/startupreview/joleedgerton.png',
        role: 'Design Lead',
        organization: 'Hubspot'
      }
    }, {
      name: 'GitHub',
      shortDescription: 'Help people build software.',
      description: 'Curabitur vitae suscipit risus. Cras eu ligula porta, aliquam velit quis, luctus est. Ut sagittis erat sed vestibulum malesuada.',
      location: 'San Francisco',
      votes: 12,
      reviews: 23,
      profilePic: 'https://s3.amazonaws.com/startupreview/github.png',
      author: {
        firstName: 'Sarah',
        lastName: 'Jean',
        profilePic: 'https://s3.amazonaws.com/startupreview/sarahjean.png',
        role: 'CEO',
        organization: 'BrewHouse'
      }
    }];
  }
]);
