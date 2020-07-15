// Importing Express
import Express from 'express';
// Importing ORM Mongoose
import Mongoose from 'mongoose';
// Registering body-parser module
import BodyParser from 'body-parser';
// Importing Morgan
import Morgan from 'morgan';
// Importing config
import config from '@config';
// Importing Path
import path from 'path';
// Importing Routes
import v1Router from '@routes';
// Importing webpack
import Webpack from 'webpack';
// Importing Webpack config
import WebpackConfig from '../webpack.config';
// Importing Hot Module
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importing Webpack middleware
import WebpackDevMiddleware from 'webpack-dev-middleware';

// Connecting to database
Mongoose.connect(config.databaseUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// Creating an instance of express
const app = Express();

// Registering body-parser
app.use(BodyParser.json());

// Registering morgan
app.use(Morgan('dev'));

// Creating the compiler
const compiler = Webpack(WebpackConfig);

// Adding the compiler to the express middleware
app.use(
    WebpackDevMiddleware(compiler, {
        hot: true,
        publicPath: WebpackConfig.output.publicPath,
    })
);

// Adding the compiler to the Hot webpack Module
app.use(WebpackHotMiddleware(compiler));

// Add Router to the middleware chain
app.use(v1Router);

// Static server middleware, this must be defined
// after any webpack middleware
app.use(Express.static(path.resolve(__dirname, 'public')));

// Respond any url like this...
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Function of listen
app.listen(3000, () => {
    console.log('> Server started');
});
