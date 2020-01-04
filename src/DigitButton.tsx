import * as React from "react"
import * as S from "sodiumjs"

interface Props {
    readonly digit: number
}

export default class DigitButton extends React.PureComponent<Props> {


    private clickDigit = () => this.clickStreamSink.send(S.Unit)

    private clickStreamSink = new S.StreamSink<S.Unit>()

    // TODO - This should be a reuasble Holder-Object-Class
    private _digitStream : S.Stream<number> | null = null
    get digitStream() : S.Stream<number> {
        if (this._digitStream) {
            return this._digitStream
        } else {
            throw new Error("_digitStream is not initialized")
        }
    }

    constructor(props:Props) {
        super(props)
        console.log('constructor on digit '+props.digit )
    }

    componentDidMount(): void {
        console.log('componentDidMount() DigitButton' + this.props.digit)

        this._digitStream = this.clickStreamSink.map( () => this.props.digit )
    }

    render() {
        return (
            <div>
                <button onClick={this.clickDigit}>{this.props.digit}</button>
            </div>
        )
    }
}
