import request from 'supertest'
import {app} from '../../app'
it('returns a status of 201 after singn up',async ()=>{
    return  request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'sacredgeomety'
    }).expect(201)
})
it('returns a status code with  invalid email',async ()=>{
    return  request(app).post('/api/users/signup').send({
        email: 'test@',
        password: 'sacredgeomety'
    }).expect(400)
})
it('returns a status code with invalid password',async ()=>{
    return  request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 's'
    }).expect(400)
})
it('returns a status code with missing email and password',async ()=>{
    return  request(app).post('/api/users/signup').send({}).expect(400)
})
it('returns a status code with missing email or password',async ()=>{
    await  request(app).post('/api/users/signup').send({
         email: 'test@test.com'
    }).expect(400)
     await  request(app).post('/api/users/signup').send({
        password: 'sacredgeomety'
    }).expect(400)
})
it('returns a status of 201 after singn up',async ()=>{
    await  request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'sacredgeomety'
    }).expect(201)
    await  request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'sacredgeomety'
    }).expect(400)
})
it('returns a status of 201 after singn up',async ()=>{
    const response=await  request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'sacredgeomety'
    }).expect(201)
    expect(response.get('Set-Cookie')).toBeDefined()
})