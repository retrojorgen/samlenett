var bcrypt = require('bcrypt-nodejs');
module.exports = function (dbHandler) {

	var Schema = dbHandler.Schema;

	var userSchema = dbHandler.Schema({
	    username: String,
	    password: String,
	    profileImageId: String,
	    coverPhotoId: String,
	    collectionImages: [],
	    role: String,
	    nick: String,
	    slug: String,
		description: String,
	    mainCollectionId:Schema.Types.ObjectId,
	    created: { type: Date, default: Date.now },
	});


	userSchema.pre('save', function (next) {
		var user = this;


		if (this.isModified('password') || this.isNew) {
			console.log('user is ', user, user.password);
			user.password = bcrypt.hashSync(user.password);
			next();
		} else {
			return next();
		}
	});

	userSchema.methods.comparePassword = function (passw, cb) {
		bcrypt.compare(passw, this.password, function (err, isMatch) {
			if (err) {
				return cb(err);
			}
			cb(null, isMatch);
		});
	};





	var consoleSchema = dbHandler.Schema({
		console: String
	});

	var publisherSchema = dbHandler.Schema({
		publisher: String
	});

	var gameSearchSchema = dbHandler.Schema({
		title: String,
		publisher: String,
		console: String
	});

	var resetPasswordSchema = dbHandler.Schema({
		userId: Schema.Types.ObjectId,
		generatedKey: Number,
		created: { type: Date, default: Date.now }
	});

	var settingsSchema = dbHandler.Schema({
	    type: String,
	    title: Object,
	    console: Object,
	    publisher: Object,
	    front: Object,
	    back: Object,
	    region: Object,
	    condition: Object,
	    status: Object,
	    notePublic: Object,
	    notePrivat: Object,
	    askingPrice: Object,
	    soldForPrice: Object
	});

	var eventSchema = dbHandler.Schema({
		type: String,
		referenceObject: Object,
		referenceId: Schema.Types.ObjectId,
		referenceUserSlug: String,
		referenceUserNick: String,
		referenceUserProfileImageId: String,
		referenceUserId: String,
		created: { type: Date, default: Date.now }
	});

	var gameSchema = dbHandler.Schema({
		userId: Schema.Types.ObjectId,
		collectionId: Schema.Types.ObjectId,
	    title: String,
	    console: String,
	    publisher: String,
	    front: String,
	    back: String,
	    region: String,
	    condition: String,
	    status: String,
	    notePublic: String,
	    notePrivat: String,
	    gameAdded: { type: Date, default: Date.now },
	    salesStatus: Boolean,
	    acquiredStatus: Boolean,
	    askingPrice: Number,
	    soldForPrice: Number,
		gameRefId: Schema.Types.ObjectId,
	    images: []
	});

	var collectionSchema = dbHandler.Schema({
		type: String,
		userId: Schema.Types.ObjectId,
	    title: String,
	    slug: String,
	    collectionImageId: String,
	    description: String,
	    collectionAdded: { type: Date, default: Date.now }
	});	

	var imageSchema = dbHandler.Schema({
	    location: String,
	    type: String,
	    imageAdded: { type: Date, default: Date.now }
	});	


	var convertToObjectId = function (idString) {
		return dbHandler.Types.ObjectId(idString);
	};


	return {
		User : dbHandler.model('User', userSchema),
		Settings : dbHandler.model('Settings', settingsSchema),
		Game: dbHandler.model('Game', gameSchema),
		Collection: dbHandler.model('Collection', collectionSchema),
		ImageObj: dbHandler.model('Image', imageSchema),
		Console: dbHandler.model('Console', consoleSchema),
		Publisher: dbHandler.model('Publisher', publisherSchema),
		GameSearch: dbHandler.model('GameSearch', gameSearchSchema),
		Event: dbHandler.model('Event', eventSchema),
		ResetPasswordSchema: dbHandler.model('resetPassword', resetPasswordSchema),
		convertToObjectId: convertToObjectId
	}
}