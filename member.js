function skillsMember() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      member: '=',
      skill: '='
    },
    templateUrl: 'templates/member.html'
  };
}