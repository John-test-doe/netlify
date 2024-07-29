const axios = require('axios');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { token } = JSON.parse(event.body);

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=6LcurhoqAAAAANK18o3uKR3ybRKTjkdQZUyankgJ&response=${token}`
        );

        const { success, score } = response.data;

        if (success && score > 0.5) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true })
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: false })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Server error' })
        };
    }
};