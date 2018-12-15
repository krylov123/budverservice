let React = require('react');

class FormScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    allValid = () => {
        return false;
    };

    render() {
        let context = this;

        return (
            <div className="container border">
                <div className="row justify-content-center">
                    <h1>Fill all fields</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="wavesAddress">Waves Address</label>
                        <input type="text" disabled={true} className="form-control" id="wavesAddress"
                               value={context.props.data.address}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.
                        </small>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <input type="file" onChange={this.onChange}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <button disabled={() => context.allValid()} type="submit" className="btn btn-primary">Submit
                            Request
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports.FormScreen = FormScreen;