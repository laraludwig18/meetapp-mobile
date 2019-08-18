module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('users', 'provider');
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'provider');
  },
};
