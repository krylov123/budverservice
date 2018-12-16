let React = require('react');

class FormSuccess extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let context = this;

        return (
            <div className="container border">
                <div className="row justify-content-center">
                    <h1>Cheers! Success!</h1>
                </div>
                <div className="row justify-content-center">
                    <h3>Now its time to hangs out</h3>
                </div>
                <div className="row justify-content-center">
                    <img src={"/img/success.jpg"}/>
                </div>
            </div>
        );
    }
}

module.exports.FormSuccess = FormSuccess;