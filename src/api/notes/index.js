const { Router } = require('express')
const { create, list, view, update, destroy } = require('./controller')

const router = new Router()

/**
 * @api {post} /notes Create Note
 * @apiName CreateNote
 * @apiGroup Note
 * @apiSuccess {Object} 200 A string at no more than 140 characters.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Note not found.
 * @apiError 401 admin access only.
 */
router.post('/', create)

/**
 *
 * @api {get} /notes/:uuid Retrieve a Note's Profile.
 * @apiName RetrieveNote
 * @apiGroup Note
 * @apiPermission verifiedUser
 * @apiParam {String} access_token verifiedUser token.
 * @apiSuccess {Object} 200 Note's profile data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 *
 * @apiError 401 Note access only.
 */
router.get('/:uuid', view)

/**
 * @api {put} /notes Create Note
 * @apiName UpdateNote
 * @apiGroup Note
 * @apiSuccess {Object} 200 Note's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Note not found.
 * @apiError 401 admin access only.
 */
router.put('/', update)

/**
 * @api {get} /notes Retrieve a list of notes
 * @apiName List Notes
 * @apiGroup notes
 * @apiPermission Notes
 * @apiUse listParams
 * @apiSuccess {Object[]} note List of notes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', list)

/**
 *
 * @api {delete} /notes/:uuid Delete Note
 * @apiName DeleteNote
 * @apiGroup Note
 * @apiSuccess (Success 201) {Boolean} success true
 * @apiError 404  not found.
 */
router.delete('/:uuid', destroy)

module.exports = router
