let React = require('react');
let axios = require('axios');

class FormScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false
        }
    }

    allValid = () => {
        if (!this.props.data.email) return false;
        return (!this.state.showAlert);
    };

    emailHandler = (elem) => {
        let showAlert = false;
        if (!this.isEmailValid(elem.target.value)) showAlert = true;
        if (elem.target.value === "") showAlert = false;
        this.setState({
            showAlert: showAlert
        });
        let oldData = this.props.data;
        oldData.email = elem.target.value;
        this.props.updateData(oldData);
    };

    idFileHandler = (elem) => {
        let oldData = this.props.data;
        oldData.idFile = elem.target.files[0];
        this.props.updateData(oldData);
    };

    isEmailValid = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    onFormSubmit = (elem) => {
        let context = this;
        elem.preventDefault();
        const url = '/submitVerification';
        const formData = new FormData();
        if (context.props.data.file !== null) formData.append('file', context.props.data.file);
        formData.append('publicKey', context.props.data.publicKey);
        formData.append('email', context.props.data.email);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url, formData, config).then(
            function (response) {
                context.props.showSuccessScreen();
            },
            function (err) {
                console.log("err", err);
                context.props.showSuccessScreen();
            });
        return;
    };

    render() {
        let context = this;
        let allValid = context.allValid();
        let alertClassName = "form-text text-muted alert-danger";
        if (!context.state.showAlert) alertClassName += " hidden";

        return (
            <div className="container border">
                <form onSubmit={context.onFormSubmit}>
                    <div className="row justify-content-center">
                        <h1>Verification</h1>
                    </div>
                    <div className="row justify-content-center">
                        <div className={"col-sm-4 col-sm-offset-4"}>
                            <div className="form-group">
                                <label htmlFor="wavesAddress">Waves Address</label>
                                <input type="text" disabled={true} className="form-control" id="wavesAddress"
                                       value={context.props.data.address}/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className={"col-sm-4 col-sm-offset-4"}>
                            <div className="form-group">
                                <label htmlFor="emailInput">Email address</label>
                                <input type="email" className="form-control" id="emailInput"
                                       aria-describedby="emailComment"
                                       placeholder="you@example.com"
                                       onChange={context.emailHandler}
                                       value={context.props.data.email}/>
                                <small id="emailComment" className={alertClassName}>Please, check your email!
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className={"col-sm-4 col-sm-offset-4"}>
                            <div className="form-group">
                                <label htmlFor="idInput">Personal ID</label>
                                <input type="file" id="idInput" onChange={context.idFileHandler}/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center padding-20">
                        <div className="form-group">
                            <button disabled={!allValid} type="submit" className="btn btn-primary">Submit
                                Request
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

module.exports.FormScreen = FormScreen;