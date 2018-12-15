let React = require('react');
let ReactDOM = require('react-dom');
let VerificationSubmitForm = require('./VerificationSubmitForm/VerificationSubmitForm.jsx');

document.addEventListener("DOMContentLoaded", function () {
    let elemId = document.getElementById("verificationSubmitForm");
    if (elemId === null) return;
    ReactDOM.render(
        <VerificationSubmitForm.VerificationSubmitForm
        />,
        elemId
    );
});
