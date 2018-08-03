const mongoDB = require('./config.js');
const mongoose = require('mongoose');

require('dotenv').config();

let db = false;
mongoose.connect(mongoDB.MONGOLINK, {
  useMongoClient: true,
}, (error) => {
  if (error) {
    console.error(error);
  } else {
    db = true;
    console.log('connected to', mongoDB);
  }
});
setInterval(() => {
  if (!db) {
    console.log('NOT CONNECTED TO DB');
  }
}, 1000);

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  email: String,
});
//
const challengeSchema = new Schema({
  name: String,
  description: String,
  tests: Object,
});

const gameSchema = new Schema({
  winner: {
    type: String, ref: 'User',
  },
  challenge: {
    type: String, ref: 'Challenge',
  },
});

const solutionSchema = new Schema({
  testId: String,
  solution: String,
  username: String,
});

const userProfileSchema = new Schema({
  username: String,
  points: Number,
  badges: Array,
  // wins: Number,
});
const Challenge = mongoose.model('Challenge', challengeSchema);
const User = mongoose.model('User', userSchema);
const Game = mongoose.model('Game', gameSchema);
const Solution = mongoose.model('Solution', solutionSchema);
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

exports.makeChallenge = (req, res) => {
  // console.log('make cha called');
  Challenge.find({
    name: req.body.name,
  }).exec((notFound, found) => {
    if (found.length > 0) {
      res.status(200).send('already exists');
    } else {
      Challenge.create(req.body, (err, made) => {
        if (err) {
          res.send(err);
        } else {
          res.status(201).send(made);
        }
      });
    }
  });
};

exports.returnOneChallenge = (req, res) => {
  Challenge.find({
    _id: req.body.id,
  }).exec((err, found) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(found);
    }
  });
};

exports.getChallenges = (req, res) => {
  Challenge.find({}).exec((err, challenges) => {
    if (err) {
      res.send(err);
    } else {
      res.send(challenges);
    }
  });
};

exports.getChallengeById = (req, res) => {
  Challenge.findOne(req.query).exec((err, success) => {
    if (err) {
      res.send(err);
    } else {
      res.send(success);
    }
  });
};

exports.findUser = (dataObject, cb) => {
  User.findOne(dataObject).exec((err, success) => {
    if (err) {
      cb(err);
    } else {
      if (!success) {
        User.create({
          username: dataObject.email,
          email: dataObject.email,
        }, (err2, instance) => cb(instance));
      } else {
        cb(success);
      }
    }
  },
  );
};

exports.findUserById = (req, res) => {
  User.findOne(req.query).exec((err, success) => {
    if (err) {
      res.send(err);
    } else {
      res.send(success);
    }
  });
};

exports.gameWin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((foundError, suc) => {
    console.log(req.body)
    if (foundError) {
      res.send(foundError);
    } else {
      Game.find({
        winner: suc._id,
        challenge: req.body.gameId,
      }).exec((err, found) => {
        if (err) {
          res.send(err);
        } else if (found.length === 0) {
          Game.create({
            winner: suc._id,
            challenge: req.body.gameId,
          }, (err2, instance) => {
            err2 ? console.error(err) : console.log('saved', instance);
          });
        }
      });
    }
    res.send('challenge saved');
  });
};

exports.getGameWinners = (req, res) => {
  Game.find({}).exec((err, games) => {
    if (err) {
      res.send(err);
    } else {
      res.send(games);
    }
  });
};
exports.addSolution = (req, res) => {
  Solution.create(req.body, (err, made) => {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(made);
    }
  });
}
exports.getSolutions = (req, res) => {
  Solution.find(req.query).exec((err, solutions) => {
    if (err) {
      res.send(err);
    } else {
      res.send(solutions);
    }
  });
};

exports.addUserProfile = (req, res) => {
  UserProfile.findOneAndUpdate({ username: req.body.username }, {
    username: req.body.username,
    $inc: { points: req.body.points },
    badges: req.body.badges,
  }, { upsert: true, new: true, runValidators: true }, // options
    // callback
  (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.send('userProfile updated in db');
    }
  });
};

exports.getUserProfile = (callback) => {
  UserProfile.find()
    .sort('-points')
    .exec(callback);
};
