module.exports = function (dbHandler) {

	var Schema = dbHandler.Schema;

	var userSchema = dbHandler.Schema({
	    username: String,
	    password: String,
	    profileImageUrl: String,
	    coverPhotoUrl: String,
	    collectionImages: [],
	    role: String,
	    nick: String,
	    slug: String,
	    mainCollectionId:Schema.Types.ObjectId,
	    created: { type: Date, default: Date.now },
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



	return {
		User : dbHandler.model('User', userSchema),
		Settings : dbHandler.model('Settings', settingsSchema),
		Game: dbHandler.model('Game', gameSchema),
		Collection: dbHandler.model('Collection', collectionSchema),
		ImageObj: dbHandler.model('Image', imageSchema)
	}
}