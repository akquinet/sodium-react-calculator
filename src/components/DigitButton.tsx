import * as React from "react"
import * as FRP from "sodium-frp-react"
import * as S from "sodiumjs"

interface Props {
    readonly digit: number
}

export default class DigitButton extends React.PureComponent<Props> {


    private clickDigit = () => this.clickStreamSink.send(S.Unit)

    private clickStreamSink = new S.StreamSink<S.Unit>()
    get clickStream() : S.Stream<S.Unit> {
        return this.clickStreamSink
    }

    constructor(props:Props) {
        super(props)
        console.log('constructor on digit '+props.digit )
    }

    componentDidMount(): void {
        console.log('componentDidMount() DigitButton' + this.props.digit)
    }

    render() {
        return (
            <div>
                <FRP.button onClick={this.clickDigit}>{this.props.digit}</FRP.button>
            </div>
        )
    }
}
