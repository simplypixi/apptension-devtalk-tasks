const Note = require('../models/Note');
const Group = require('../models/Group');
const Author = require('../models/Author');

const mock = {
  exampleAuthor: '',
  exampleGroup: '',
  mock: function() {
    const removePromises = [
      new Promise((resolve, reject) => {
        Note.remove({}, function(err) {
          console.log('All notes removed');
          resolve()
        });
      }),
      new Promise((resolve, reject) => {
        Author.remove({}, function(err) {
          console.log('All notes removed');
          resolve()
        });
      }),
      new Promise((resolve, reject) => {
        Group.remove({}, function(err) {
          console.log('All notes removed');
          resolve()
        });
      }),
    ];

    Promise.all(removePromises).then(() => {
      const authorPromise = new Promise((resolve, reject) => {
        const exampleAuthor = new Author({name: 'John Doe'});

        exampleAuthor.save((err, author) => {
          if (err) return console.error(err);
          this.exampleAuthor = author._id;
          resolve()
        });
      });

      const groupPromise = new Promise((resolve, reject) => {
        const exampleGroup = new Group({name: 'group1'}, this.exampleAuthor);

        exampleGroup.save((err, group) => {
          if (err) return console.error(err);
          this.exampleGroup = group._id;
          resolve()
        });
      });

      Promise.all([authorPromise, groupPromise]).then(() => {
        const note1 = new Note({
          title: 'example note title',
          description: 'example note 1',
          date: '2018-04-20',
          isDone: true,
          author_id: this.exampleAuthor,
          group_id: this.exampleGroup
        });
        const note2 = new Note({
          title: 'title for note nr 2',
          description: 'example note 2',
          date: '2018-05-02',
          isDone: true,
          author_id: this.exampleAuthor,
          group_id: this.exampleGroup
        });
        const note3 = new Note({
          title: 'Uncompleted note 3',
          description: 'example note 3',
          date: '2018-05-03',
          isDone: false,
          author_id: this.exampleAuthor,
          group_id: this.exampleGroup
        });

        note1.save();
        note2.save();
        note3.save();

        console.log('Example data generated');
      });
    });
  }
};

const mockObj = (() => {
  let instance;

  function init() {
    return mock;
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

module.exports = mockObj.getInstance();
