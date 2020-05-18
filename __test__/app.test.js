const request = require('supertest')
const {app} = require('../src/app')

describe('App', () => {
    it('should get the app', async () => {
        const response = await request(app)
            .get('/')
            .expect(200)

        expect(response.body).toMatchObject({message: 'rent car api'})
        
    })
})