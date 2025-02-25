export function load({ locals }) {
	const userinfo = locals.user;
	
	const username = (userinfo).displayName;
	const email = (userinfo).mail;
	const givenname = (userinfo).givenName;
	const surname = (userinfo).surname;
	const adminUser = ["PINTER Elias, 5AHITS", "STURM Leon Attila, 5BHITS", "PLONER Fabian, 5AHITS", "HUBER Julian, 5AHITS", "BROWN Ilaria, 5BHITS"]
	return {
		username,
		email,
		givenname,
		surname,
		adminUser
	};
}