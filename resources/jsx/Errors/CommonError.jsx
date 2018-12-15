let React = require('react');

class CommonError extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let context = this;

        return (
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="alert alert-danger" role="alert">
                        {context.props.message}
                    </div>
                </div>
                {context.props.additionalHtml}
            </React.Fragment>
        );
    }
}

module.exports.CommonError = CommonError;