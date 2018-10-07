let API_ROOT = '/';

console.log(window.location.host);

if (window.location.host === 'localhost:3000') {
    // Development mode -- assume Flask server is running locally
    API_ROOT = 'http://localhost:5000/';
}

export { API_ROOT };