module.exports = {
	ENV: process.env.NODE_ENV || 'development',
	PORT:process.env.PORT ||	 3000 ,
	URL:process.env.BASE_URL ||	 'http://localhost:3000',
	MONGODB_URI :process.env.MONGODB_URI ||	 'mongodb://mbaye1:mbaye1@ds145923.mlab.com:45923/restifydb' ,
	JWT_SECRET : process.env.JWT_SECRET || 'secret'	 
}