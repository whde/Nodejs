
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(require('cors')());
require('./plugins/db')(app);
require('./plugins/token');
require('./routes/admin/user/')(app);
require('./routes/')(app);

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port 3000!`));

// 错误处理函数
app.use(async (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).send({
        message: err.message
    });
    next();
});

app.use('/images', express.static(__dirname + '/images'));
