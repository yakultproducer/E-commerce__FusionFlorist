require('dotenv').config();

const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const app = express()

const indexRouter = require('./routes/index')
const productsRouter = require('./routes/products')
const aboutRouter = require('./routes/about')
const loginRouter = require('./routes/login')
const cartRouter = require('./routes/cart')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout1')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))


mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        ttl: 24 * 60 * 60 // 1 day life in DB
    }),
    cookie: {
        maxAge: null, // Session cookie will be deleted when the browser(not just tab) is closed
        expires:null,
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        sameSite: 'strict' // Helps to prevent CSRF attacks
    } 
}))

app.use('/', indexRouter)
app.use('/products', productsRouter)
app.use('/about', aboutRouter)
app.use('/login', loginRouter)
app.use('/cart', cartRouter)

// Diagnostic Route
app.get('/check-db', async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.send('MongoDB is connected');
    } catch (error) {
        res.status(500).send('MongoDB connection error: ' + error.message);
    }
});

app.listen(process.env.PORT || 3000)