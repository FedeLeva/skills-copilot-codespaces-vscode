// Create web server
var express = require('express');
var router = express.Router();
var fs = require('fs');

// Create a new comment
router.post('/', function(req, res) {
    var comment = req.body;
    comment.id = Date.now();
    comment.date = new Date();
    comment.ip = req.ip;
    var data = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    data.push(comment);
    fs.writeFileSync('comments.json', JSON.stringify(data));
    res.status(201).json(comment);
});

// Get all comments
router.get('/', function(req, res) {
    var data = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    res.json(data);
});

// Get comment by id
router.get('/:id', function(req, res) {
    var data = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    var comment = data.filter(function(c) {
        return c.id == req.params.id;
    });
    if (comment.length < 1) {
        res.status(404).json({message: 'Comment not found'});
    } else {
        res.json(comment[0]);
    }
});

// Update comment by id
router.put('/:id', function(req, res) {
    var data = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    var comment = data.filter(function(c) {
        return c.id == req.params.id;
    });
    if (comment.length < 1) {
        res.status(404).json({message: 'Comment not found'});
    } else {
        var updatedComment = req.body;
        updatedComment.id = comment[0].id;
        updatedComment.date = comment[0].date;
        updatedComment.ip = comment[0].ip;
        var index = data.indexOf(comment[0]);
        data[index] = updatedComment;
        fs.writeFileSync('comments.json', JSON.stringify(data));
        res.json(updatedComment);
    }
});

// Delete comment by id
router.delete('/:id', function(req, res) {
    var data = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    var comment = data.filter(function(c) {
        return c.id == req.params.id;
    });
    if (comment.length < 1) {
        res.status(404).json({message: 'Comment not found'});
    } else {
        var index = data.indexOf(comment[0]);
        data.splice(index, 1);
        fs



