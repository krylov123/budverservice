let React = require('react');
let CommonError = require('./../Errors/CommonError.jsx');
let Waiting = require('./../Waiting/Waiting.jsx');

class VerificationSubmitForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            waiting: false,
            error: false,
            errorMessage: "",
            mainWindow: props.mainWindow
        };
    }

    waiting = () => {
        this.setState({
            waiting: true
        });
    };

    showError = (message) => {
        console.log(message);
        this.setState({
            error: true,
            errorMessage: message
        });
    };

    startVerification = () => {
        let context = this;
        let waves = this.state.mainWindow.Waves;
        this.waiting();
        if (!this.isWavesExist()) return;
        waves.auth({
            name: "BVS App",
            data: "Dm49U_fjm4!ds22HqoF8"
        }).then(
            function (data) {
                console.log("OK", data);
            },
            function (data) {
                console.log("NOT OK", data);
                context.showError(data.message);
            }
        );
    };

    isWavesExist = () => {
        return (typeof this.state.mainWindow.Waves !== 'undefined');
    };

    render() {
        let context = this;

        if (context.state.error) {
            return (
                <div className="container border">
                    <CommonError.CommonError message={context.state.errorMessage}/>
                </div>
            );
        }

        if ((context.state.waiting) && (!context.isWavesExist())){
            let additionalHtml = (
                <div className="row justify-content-center">
                    <a className={"btn btn-primary"} href={"https://chrome.google.com/webstore/detail/waves-keeper/lpilbniiabackdjcionkobglmddfbcjo"}>Download Waves Keeper</a>
                </div>
            );
            return (
                <div className="container border">
                    <CommonError.CommonError
                        additionalHtml = {additionalHtml}
                        message={"You must install Waves Keeper plugin before start Verification!"}
                    />
                </div>
            );
        }

        if (context.state.waiting) return (
            <Waiting.Waiting />
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
                        <button className={"btn btn-primary"} onClick={this.startVerification}>Start verification</button>
                </div>
            </div>
        );
    }
}

module.exports.VerificationSubmitForm = VerificationSubmitForm;