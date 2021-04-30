const auth = {
    getToken() {
        const token = localStorage.getItem('token')
        return token
    },
    setToken(token) {
        localStorage.setItem('token', token)
    },
    isLoggedIn() {
        return !!this.getToken()
    }
}

export default auth