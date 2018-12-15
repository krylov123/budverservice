let React = require('react');

class Waiting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container border">
                <div className="row justify-content-center">
                    <h1>Please wait...</h1>
                </div>
                <div className="row justify-content-center">
                    <img src={"/img/waiting.gif"} />
                </div>
            </div>
        );
    }
}

module.exports.Waiting = Waiting;