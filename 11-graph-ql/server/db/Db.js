const database = (() => {

  let instance;

  function init() {

    let _db;

    return {
      getDB: function() {
        return _db;
      },
      setDB: function(db) {
        _db = db;
      }
    };
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };
})();

module.exports = database.getInstance();
