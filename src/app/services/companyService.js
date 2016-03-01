angular.module('startupReviewApp').service('companyService', [
  '$q',
  function($q) {

    var COMPANIES_CACHE = [{
      id: '1',
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
      id: '2',
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

    function CompanyService() {

    }

    CompanyService.prototype.list = function() {
      return $q(function(resolve) {
        return resolve(COMPANIES_CACHE);
      });
    };

    CompanyService.prototype.getById = function(id) {
      if (!id) throw new Error('companyService - getById() - id is required');

      var foundCompany = _.findWhere(COMPANIES_CACHE, {
        id: id
      });

      return $q(function(resolve, reject) {
        if (foundCompany) return resolve(foundCompany);
        else return reject(new Error('company with id ' + id + ' not found'));
      });
    };

    return new CompanyService();
  }
]);
