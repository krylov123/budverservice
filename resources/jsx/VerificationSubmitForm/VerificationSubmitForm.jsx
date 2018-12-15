let React = require('react');
let CommonError = require('./../Errors/CommonError.jsx');
let Waiting = require('./../Waiting/Waiting.jsx');
let WelcomeScreen = require('./../Screens/WelcomeScreen.jsx');
let FormScreen = require('./../Screens/FormScreen.jsx');

class VerificationSubmitForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            waiting: false,
            error: false,
            errorMessage: "",
            mainWindow: props.mainWindow,
            showForm: false,
            data: {
                address: "",
                publicKey: ""
            }
        };
    }

    waiting = () => {
        this.setState({
            waiting: true
        });
    };

    showError = (message) => {
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
                console.log(
                    "OK",data);
                let address = data.address;
                let publicKey = data.publicKey;
                context.setState({
                    error: false,
                    waiting: false,
                    showForm: true,
                    data: {
                        address: address,
                        publicKey: publicKey
                    }
                });
            },
            function (data) {
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

        if(context.state.showForm) return (
            <FormScreen.FormScreen data={context.state.data} />
        );

        return (
            <WelcomeScreen.WelcomeScreen startVerification={context.startVerification} />
        );
    }
}

module.exports.VerificationSubmitForm = VerificationSubmitForm;