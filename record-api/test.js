var express = require('express')
var path = require('path')
var fs = require('fs')
var mysql = require('mysql')
var app = express();
var multer = require('multer')
var upload = multer({dest: './upload_tmp/'});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'test_sql'
})
connection.connect()
// var sql = 'SELECT * FROM songs_list';
// var addSql = 'INSERT INTO websites(id,lyric) VALUES("561313205","[00:00.00] 作曲 : 葛夏\n[00:01.00] 作词 : 葛夏\n[00:09.09]\n[00:12.69]\n[00:16.50]\n[00:30.80]是你 让我相信爱情\n[00:38.13]是你 给了我关心\n[00:45.60]是你 让我明白了\n[00:53.24]爱就要付出真心\n[00:59.94]我需要 这样的怀抱\n[01:07.23]抱着你一起欢笑\n[01:14.68]我需要 这样的依靠\n[01:22.07]靠着肩我慢慢摇\n[01:29.46]想你 虽然每天都在一起\n[01:36.81]我爱你 你是否会在意\n[01:44.21]想你 虽然每天都在一起\n[01:51.65]我爱你 不是随便说说\n[01:59.02]而已......\n[02:28.99]我需要 这样的怀抱\n[02:35.77]抱着你一起欢笑\n[02:43.26]我需要 这样的依靠\n[02:50.72]靠着肩一起变老\n[02:58.11]想你 虽然每天都在一起\n[03:05.36]我爱你 你是否会在意\n[03:12.88]想你 虽然每天都在一起\n[03:20.20]我爱你 不是随便说说\n[03:27.65]想你 虽然每天都在一起\n[03:34.99]我爱你 你是否会在意\n[03:42.43]想你 虽然每天都在一起\n[03:49.82]我爱你 不是随便说说\n[03:57.54]而已.......\n[04:09.15]\n")';
// connection.query(sql, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results)
// })
// connection.query(addSql,function(err,data){
//     if(err){
//         console.log('插入数据失败')
//     } else {
//         console.log('插入数据成功');
        
//     }
// })
// connection.end()

var dir = '/v1'

//设置允许跨域请求
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.use(express.static(__dirname))
// 获取歌曲歌词
app.get(dir + '/lyric', function(req, res) {
    var id = req.query.id
    connection.query('SELECT * FROM websites WHERE id ='+id, function (error, results, fields) {
        if (error) throw error;
        if(results.length>0){
            return res.send({
                code:200,
                lyric:results[0].lyric
            })
        }
        return res.send({
            code:10009,
            errmsg:'此id不存在'
        })
    });
})

// 获取歌曲列表
app.get(dir + '/list', function(req, res) {
    connection.query('SELECT * FROM songs_list', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})

// 获取歌曲详情
app.get(dir + '/music/detail', function(req, res) {
    var id = req.query.id||0
    connection.query('SELECT * FROM songs_list WHERE id ='+id, function (error, results, fields) {
        if (error) throw error;
        if(results.length>0){
            return res.send(results[0])
        }
        return res.send({
            code:10009,
            errmsg:'此id不存在'
        })
    })
})
app.post('/upload', upload.single('file'), function(req, res, next){
    var newPath1 = "upload_tmp/" + req.file.originalname
    fs.rename(req.file.path, "upload_tmp/" + req.file.originalname, function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
        var extname = path.extname('"upload_tmp/"' + req.file.originalname);
        console.log(extname)
        const newpath2 = "upload_tmp/"+Date.now()+extname
        fs.rename(newPath1,newpath2,function(err){
            if (err) throw err;
            console.log('更改成功')
            res.send({code:1,filePath:newpath2})
        })
    })
});


var server = app.listen(9000, function() {
    console.log('服务访问地址http://localhost:9000')
})




// // 获取歌曲歌词
// app.get(dir + '/lyric', function(req, res) {
//     var id = req.query.id
//     var file = path.join(__dirname, 'data/lyrics.json'); //文件路径，__dirname为当前运行js文件的目录
//     var lyrics = null
//     fs.readFile(file, 'utf-8', function(err, data) {
//         if (err) {
//             res.send('文件读取失败');
//         } else {
//             lyrics = JSON.parse(data)
//             for(var i = 0; i < lyrics.length; i++) {
//                 if (lyrics[i].id == id) {
//                     return res.send(JSON.stringify(lyrics[i]))
//                 }
//             }
//             return res.send({errcode:'4004',errmsg:'id错误'})
//         }
//     });
// })
// // 获取歌曲详情
// app.get(dir + '/music/detail', function(req, res) {
//     var id = req.query.id
//     var file = path.join(__dirname, 'data/detail.json'); //文件路径，__dirname为当前运行js文件的目录
//     var lyrics = null
//     fs.readFile(file, 'utf-8', function(err, data) {
//         if (err) {
//             res.send('文件读取失败');
//         } else {
//             lyrics = JSON.parse(data)
//             for(var i = 0; i < lyrics.length; i++) {
//                 if (lyrics[i].id == id) {
//                     return res.send(JSON.stringify(lyrics[i]))
//                 }
//             }
//             return res.send({errcode:'4004',errmsg:'id错误'})
//         }
//     });
// })