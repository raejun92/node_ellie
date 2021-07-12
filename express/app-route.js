import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express(); 

app.use(express.json()); // REST API -> Body
app.use(express.urlencoded({extended: false})); // HTML Form -> Body
// app.use(express.static('folder')); // folder에 있는 모든 리소스를 사용자가 읽기 가능

app.use('/posts', postRouter);
app.use('/users', userRouter);

/* app
.route('/posts')
.get((req, res, next) => {
	res.status(201).send('GET: /posts');
})
.post((req, res) => {
	res.status(201).send('POST: /posts');
});

app
.route('./posts/:id')
.put((req, res) => {
	res.status(201).send('PUT: /posts/:id');
})
.delete((req, res) => {
	res.status(201).send('DELETE: /posts/:id');
}); */





/* app.get('/posts', (req, res) => {
	res.status.(201).send('GET: /posts');
});

app.post('/posts', (req, res) => {
	res.status(201).send('POST: /posts');
})

app.put('/posts/:id', (req, res) => {
	res.status(201).send('PUT: /posts/:id');
})

app.delete('/posts/:id', (req, res) => {
	res.status(201).send('DELETE: /posts/:id');
}) */

app.listen(8080);