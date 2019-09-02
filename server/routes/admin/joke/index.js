module.exports = app => {
    const auth = require('../../../mid/auth');
    const child_process = require('child_process');

    app.post('/main/api/joke/spider', auth(), function (req, res) {
        let command = 'python3 '+__dirname+'/../../../Python/Joke/joke.py';
        console.log('开始爬取笑话');
        console.log(command);
        let workerProcess = child_process.exec(command, function (error, stdout, stderr) {
            if (error) {
                console.log(error.stack);
                console.log('Error code: '+error.code);
                console.log('Signal received: '+error.signal);
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        });

        workerProcess.on('exit', function (code) {
            console.log('子进程已退出，退出码 '+code);
        });
        let resData = {
            code: 0,
            msg: "后台正在爬取中..."
        };
        res.send(resData);
    });
};
