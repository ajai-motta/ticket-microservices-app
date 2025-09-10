import request from 'supertest'
import {app} from '../../app'
it('returns a status of 201 after singn up',async ()=>{
    return  request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'sacredgeomety'
    }).expect(201)
})
it('returns a status code with error message',async ()=>{
    return  request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'sacredgeomety'
    }).expect(400)
})