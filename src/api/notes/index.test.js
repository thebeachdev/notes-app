const request = require('supertest')
const app = require('../../../src/')
const Note = require('../../models').Note
const {
    FakeNoteTwo
} = require('../Notes/constants')
const {
    verify
} = require('../../services/jwt/')
const uuidv4 = require('uuid/v4')
const invalidMasterKey = `derp`
/**
 * Test the Sign End
 */
let agent = null
beforeAll(async () => {
    agent = await request.agent(app)
})
describe('Sigin Route - POST - api/auth/login (master) (password)', async () => {
    test(`POST /si 201 - AUTHORIZED (VALID - masterToken), (VALID - passwordToken) - VALID password entry && VALID email entry.`, async () => {
        const {
            status,
            body
        } = await agent.post(ApiRoutes.GET_SIGNIN_URL)
            .auth(FakeNoteTwo.VALID_EMAIL, FakeNoteTwo.VALID_PASSWORD)
        expect(status).toBe(200)
        expect(typeof body).toBe('object')
        expect(typeof body.success).toBe('boolean')
        expect(body.success).toBe(true)
        expect(await verify(body.token)).toBeTruthy() // the token contains the Notes uuid
    })
    test(`POST /signin 401-UNAUTHORIZED (INVALID - masterToken), (VALID - passwordToken), VALID password entry && VALID email entry.`, async () => {
        const {
            status,
            body
        } = await agent.post(ApiRoutes.GET_SIGNIN_URL)
            .auth(FakeNoteTwo.VALID_EMAIL, FakeNoteTwo.VALID_PASSWORD)
            .query({
                access_token: invalidMasterKey
            })
        // Maybe it's not an error?
        expect(status).toBe(401)
        expect(typeof body).toBe('object')
    })
    test(`POST /signin 401-UNAUTHORIZED (VALID - masterToken), (INVALID - passwordToken) -  INVALID password entry && VALID email entry.`, async () => {
        const {
            status,
            body
        } = await agent.post(ApiRoutes.GET_SIGNIN_URL)
            .auth(FakeNoteTwo.VALID_EMAIL, FakeNoteTwo.INVALID_PASSWORD)
            .query({
                access_token: `bunchaletterzandnumbers`
            })
        expect(status).toBe(401)
        expect(typeof body).toBe('object')
    })
    test(`POST /signin 401-UNAUTHORIZED (VALID - masterToken), (INVALID - passwordToken) -  VALID password entry && INVALID email entry.`, async () => {
        const {
            status,
            body
        } = await agent.post(ApiRoutes.GET_SIGNIN_URL)
            .auth(FakeNoteTwo.INVALID_EMAIL, FakeNoteTwo.INVALID_PASSWORD)
            .query({
                access_token: `bunchaletterzandnumbers`
            })
        expect(status).toBe(401)
        expect(typeof body).toBe('object')
    })
    test(`POST /signin 401-UNAUTHORIZED (INVALID - masterToken), (INVALID - passwordToken) -  INVALID password entry && INVALID email entry.`, async () => {
        const {
            status,
            body
        } = await agent.post(ApiRoutes.GET_SIGNIN_URL)
            .auth(FakeNoteTwo.INVALID_EMAIL, FakeNoteTwo.INVALID_PASSWORD)
            .query({
                access_token: invalidMasterKey
            })
        expect(status).toBe(401)
        expect(typeof body).toBe('object')
    })
})
describe('Signup Route - POST - api/auth/signup (master)', async () => {
    const aNewNote = {
        firstName: `john`,
        lastName: 'smith',
        Notename: 'johnsmith',
        email: 'johnsmith@gmail.com',
        password: 'password'
    }
    test('POST /signup 201 (master)', async () => {
        const {
            status,
            body
        } = await agent.post(ApiRoutes.POST_SIGNUP_URL)
            .set('Authorization', `Bearer bunchaletterzandnumbers`)
            .send(aNewNote)
        expect(status).toBe(201)
        expect(typeof body).toBe('object')
        expect(body.success).toBe(true)
        expect(typeof body.message).toBe('string')
        expect(body.message).toBe(AuthConstants.SUCCESSFULL_ACCOUNT_CREATED_MESSAGE)
    })
    test('POST /signup 409 (master) - Notename already exists', async () => {
        const {
            status,
            body
        } = await agent.post(ApiRoutes.POST_SIGNUP_URL)
            .set('Authorization', `Bearer bunchaletterzandnumbers`)
            .send(aNewNote)
        expect(status).toBe(409)
        expect(typeof body).toBe('object')
        expect(body.success).toBe(false)
        expect(typeof body.message).toBe('string')
        expect(body.message).toBe(AuthConstants.UNSUCCESSFULL_ACOUNT_NOT_CREATE_MESSAGE)
    })

    test('POST /signup 409 (master) - email already exists', async () => {
        const {
            status,
            body
        } = await agent.post(ApiRoutes.POST_SIGNUP_URL)
            .set('Authorization', `Bearer bunchaletterzandnumbers`)
            .send(aNewNote)
        expect(status).toBe(409)
        expect(typeof body).toBe('object')
        expect(body.success).toBe(false)
        expect(typeof body.message).toBe('string')
        expect(body.message).toBe(AuthConstants.UNSUCCESSFULL_ACOUNT_NOT_CREATE_MESSAGE)
    })

    test('POST /signup 400 (master) - invalid email', async () => {
        aNewNote.email = null
        const {
            status,
            body
        } = await agent.post(ApiRoutes.POST_SIGNUP_URL)
            .set('Authorization', `Bearer bunchaletterzandnumbers`)
            .send(aNewNote)
        expect(status).toBe(400)
        expect(typeof body).toBe('object')
        expect(body.success).toBe(false)
        expect(typeof body.message).toBe('string')
        expect(body.message).toBe(AuthConstants.MISSING_EMAIL_OR_NoteNAME_OR_PASSWORD)
    })

    test('POST /signup 400 (master) - invalid Notename', async () => {
        aNewNote.Notename = null
        const {
            status,
            body
        } = await agent.post(ApiRoutes.POST_SIGNUP_URL)
            .set('Authorization', `Bearer bunchaletterzandnumbers`)
            .send(aNewNote)
        expect(status).toBe(400)
        expect(typeof body).toBe('object')
        expect(body.success).toBe(false)
        expect(typeof body.message).toBe('string')
        expect(body.message).toBe(AuthConstants.MISSING_EMAIL_OR_NoteNAME_OR_PASSWORD)
    })

    test('POST /signup 400 (master) - invalid password', async () => {
        aNewNote.password = null
        const {
            status,
            body
        } = await agent.post(ApiRoutes.POST_SIGNUP_URL)
            .set('Authorization', `Bearer bunchaletterzandnumbers`)
            .send(aNewNote)
        expect(status).toBe(400)
        expect(typeof body).toBe('object')
        expect(body.success).toBe(false)
        expect(typeof body.message).toBe('string')
        expect(body.message).toBe(AuthConstants.MISSING_EMAIL_OR_NoteNAME_OR_PASSWORD)
    })
})
// NOTE: Note sure where to test for password validation.
// NOTE: Doesn't currently have master included in url, not sure how to hanlde 100% yet
describe('Verify Route - GET - api/auth/:token (master)', async () => {
    // Give a token, get back a verified jwt Note.
    const aToken = uuidv4().toString()
    beforeAll(async () => {
        await Note.create({
            Notename: 'testNoteOneTwo',
            firstName: 'testFirstNameOne',
            lastName: 'testLastOnetwo',
            email: 'testNote1235@gmail.com',
            password: FakeNoteTwo.VALID_PASSWORD,
            token: aToken,
            isEmailVerified: false
        })
    })
    test('GET /:token 202 (none) - Successfully Verified and JWT returned', async () => {
        // TODO: Seed database with Notes we can check for. just have api maike look ups.
        // NOTES: Would get back success: true, and jwt. jwt should container Note id,
        // if Note is not verified no uuid or jwt
        // NOTE: When a Note is succesfully verified deleted the token they have and set flag to emailVerified: true.
        // Give the uuid.,
        // WHen you check a Note after getting in back from the db, make sure to check for isVerified.
        const {
            status,
            body
        } = await agent.get(`/api/auth/${aToken}?access_token=${masterKey}`)
        // if (error) {
        //   // TODO: log errors here.
        //   console.log(error)
        // }
        // console.log(status)
        // TODO: add expect jwt.
        expect(status).toBe(202)
        expect(typeof body).toBe('object')
        expect(typeof body.success).toBe('boolean') // true
        expect(body.success).toBe(true)
        // If we had swagger this would and login would return tokens to the clients.
        // NOTE: I'm not sure about how to handle security here. Do I need master() on the email?
        // I see reason why this is secure enough, but not really sure.
        // NOTE: save a verified use with the uuid and expect back a token
    })
    test('GET /:token 401 - UNAUTHORIZED (INVALID - masterToken), (INVALID - invalid token) - INVALID TOKEN', async () => {
        const {
            status,
            body
        } = await agent.get(`/api/auth/invalidurl`)
        expect(status).toBe(401)
        expect(typeof body).toBe('object')
        // TODO: Add a few more sets of validattion.
    })
    // What could I test for? What Should I be testing for?
})
// TODO: Add Password Reset Tests.
// TODO: Add Email Reset Tests.
