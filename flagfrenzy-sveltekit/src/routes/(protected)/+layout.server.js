export function load({ locals }) {
	const userinfo = locals.user;
	
	const username = (userinfo).displayName;
	const email = (userinfo).mail;
	const givenname = (userinfo).givenName;
	const surname = (userinfo).surname;
	const adminUser = ["PINTER Elias, 5AHITS"]
	return {
		username,
		email,
		givenname,
		surname,
		adminUser
	};
}