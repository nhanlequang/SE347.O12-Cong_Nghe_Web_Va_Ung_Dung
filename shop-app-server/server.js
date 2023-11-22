const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./config/db/dbConnect');
const userRoutes = require('./routes/user/UserRoutes');
const { errorHandler, notFound } = require('./middlewares/error/errorHandler');
const cors = require('cors');
const voucherRoutes = require('./routes/voucher/VoucherRoutes');
// declaire app express
const app = express();

// connect to db mongo 
dbConnect();

// use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// use routes + path 
// User Route
app.use('/api/users', userRoutes);
app.use('/api/vouchers', voucherRoutes);



// Error handler
app.use(notFound);
app.use(errorHandler);

// Server run here
const port = process.env.PORT;
app.listen(port, console.log("Server is running at port: " + port));