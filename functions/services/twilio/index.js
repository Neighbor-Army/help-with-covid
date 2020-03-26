const generateTwiML = (pre, content, post, url) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
    <Say>
    ${pre}
    <say-as interpret-as="digits">${content}</say-as>
    ${post}
    </Say>
    <Redirect>${url}</Redirect>
    </Response>`;
};

module.exports = {
    generateTwiML
};
