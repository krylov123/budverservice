let React = require('react');

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let context = this;

        return (
            <div className="container border">
                <div className="row">
                </div>
                <div className="row justify-content-center">
                    <h1>Know your buddy!</h1>
                </div>
                <div className="row justify-content-center">
                    <h3>Bud Verification Service</h3>
                </div>
                <div className="row justify-content-center">
                    <img src={"/img/budglass.png"}/>
                </div>
                <div className="row justify-content-center">
                    <button className={"btn btn-primary"} onClick={context.props.startVerification}>Start verification</button>
                </div>
            </div>
        );
    }
}

module.exports.WelcomeScreen = WelcomeScreen;