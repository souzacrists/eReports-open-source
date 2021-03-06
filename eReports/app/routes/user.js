module.exports = app => {
	const url = '/api/v1/user'
	const Controller = app.controllers.user
	const Validate = app.validates.user
	const auth = app.controllers.auth
	const isAdmin = app.middleware.permission

	// route login jwt
	app.route('/')
		.get((req, res) => res.json({msg: 'Bem vindo api delivery', version: '0.0.1'}))
		.post(auth)

	app.route('/user/new')
	.post(Validate.create, Validate.unique, Controller.create)
	
	app.route(`${url}/forgot/password/:_id`)
    .put(Validate.createSocialUser, Controller.passwordUpdate)

	app.route(url)
	.get(isAdmin, Controller.listAll)

	// app.route(`${url}/:_id`)
	app.route(`/put/:_id`)
	.get(Validate.listOne, Controller.listOne)
	.put(Validate.update, Controller.update)
	.delete(Validate.delete, Controller.delete)
}
