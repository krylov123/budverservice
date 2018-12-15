let React = require('react');

class VerificationSubmitForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            waiting: false,
            mainWindow: props.mainWindow
        };
    }

    waiting = () => {
        this.setState({
            waiting: true
        });
    };

    isWavesExist = () => {
        return (typeof this.state.mainWindow.Waves !== 'undefined');
    };

    render() {
        let context = this;

        if ((context.state.waiting) && (!context.isWavesExist())){
            return (
                <div className="container border">
                    <div className="row justify-content-center">
                        <div className="alert alert-danger" role="alert">
                            You must install Waves Keeper plugin before start Verification!
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <a className={"btn btn-primary"} href={"https://chrome.google.com/webstore/detail/waves-keeper/lpilbniiabackdjcionkobglmddfbcjo"}>Download Waves Keeper</a>
                    </div>
                </div>
            );
        }

        if (context.state.waiting) return (
            <div className="container border">
                <div className="row justify-content-center">
                    <h1>Please wait...</h1>
                </div>
                <div className="row justify-content-center">
                    <img src={"/img/waiting.gif"} />
                </div>
            </div>
        );

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
                    <img src={"/img/budglass.png"} />
                </div>
                <div className="row justify-content-center">
                        <button className={"btn btn-primary"} onClick={this.waiting}>Start verification</button>
                </div>
            </div>
        );
    }
}

module.exports.VerificationSubmitForm = VerificationSubmitForm;