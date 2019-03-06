const request = require('supertest')
const app = require('./app')

describe('Test the root path', () => {
    it('It should response the GET method', done => {
        request(app).get('/').then(response => {
            expect(response.statusCode).toBe(200)
            done()
        })
    })
})

describe('POST /post', () => {
    it('responds with json', done => {
        request(app)
            .post('/post')
            .send({title: 'first test post'})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});


describe('GET /posts/1', () => {
    it('responds with json', done => {
        request(app)
            .get('/posts/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
