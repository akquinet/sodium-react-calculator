import * as React from "react";

interface Props {
    readonly digit: number
}

export default class DigitButton extends React.PureComponent<Props> {
    render() {
        return (
            <div>
                <button>{this.props.digit}</button>
            </div>
        )
    }
}
