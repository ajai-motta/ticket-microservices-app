import request from 'supertest'
import { app } from '../../app'
it('expects to status of 400 when no such email exists',async()=>{
    await request(app).post('/api/users/signin').send({
        
        email: 'test@test.com',
        password: 'sacredgeomety'
    }).expect(400)
    
})
it('fails when an incorrect password is provided',async()=>{
    await request(app).post('/api/users/signup').send({
            email: 'test@test.com',
            password: 'sacredgeomety'
        }).expect(201)
    await request(app).post('/api/users/signin').send({
            email: 'test@test.com',
            password: 'sacredgeomet'
        }).expect(400)
})
it('responds with acookie when given valid credentials',async ()=>{
    await request(app).post('/api/users/signup').send({
            email: 'test@test.com',
            password: 'sacredgeomety'
        }).expect(201)
    const response=await request(app).post('/api/users/signin').send({
            email: 'test@test.com',
            password: 'sacredgeomety'
        }).expect(200)
    expect(response.get('Set-Cookie')).toBeDefined
})