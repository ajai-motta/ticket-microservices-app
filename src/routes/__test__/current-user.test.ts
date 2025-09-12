import request from 'supertest'
import { app } from '../../app'
it('returns a status of 201 after singn up',async ()=>{
    
    const cookie=await global.signup()
    if(!cookie){
        throw Error('well well no sweets for you')
    }
   const response= await request(app).get('/api/users/currentuser').set('Cookie',cookie).send().expect(200);
   expect(response.body.currentUser.email).toEqual('test@test.com')
})
it('responds with status code 200 and current user null',async()=>{
    const response=await request(app).get('/api/users/currentuser').send().expect(200)
    expect(response.body.currentUser).toEqual(null)
})