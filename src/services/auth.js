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
    },
    resetToken() {
        localStorage.clear()
    }
}

export default auth