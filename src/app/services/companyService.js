angular.module('startupReviewApp').service('companyService', [
  '$q',
  function($q) {

    var COMPANIES_CACHE = [{
      id: '1',
      name: 'AdHawk',
      description: 'Simplify your digital advertising.',
      location: 'New York City',
      profilePic: 'https://s3.amazonaws.com/startupreview/adhawk.png',
      slides: [{
        url: 'https://s3.amazonaws.com/startupreview/github_slide1.png'
      }, {
        url: 'https://s3.amazonaws.com/startupreview/github_slide2.png'
      }],
      type: 'Market Platform'
    }, {
      id: '2',
      name: 'GitHub',
      description: 'Help people build software.',
      location: 'San Francisco',
      profilePic: 'https://s3.amazonaws.com/startupreview/github.png',
      slides: [{
        url: 'https://s3.amazonaws.com/startupreview/github_slide1.png'
      }, {
        url: 'https://s3.amazonaws.com/startupreview/github_slide2.png'
      }],
      type: 'Market Platform'
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
