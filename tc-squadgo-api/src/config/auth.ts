interface auth {
	jwt: {
		expiresIn: string
		secret: string
		algorithm: 'HS256'
	}
}

export default {
	jwt: {
		expiresIn: '12h',
		secret: '1234ksdfhkjsdfhks@@@ljsahdja2!!!akjdhksa',
		algorithm: 'HS256'
	}
} as auth
