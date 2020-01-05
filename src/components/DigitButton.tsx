import * as React from "react"
import * as S from "sodiumjs"
import {AbstractButton, ReadOnlyHolder} from "./utilities";

interface Props {
    readonly digit: number
}

export default class DigitButton extends AbstractButton<Props> {

    digitStream = new ReadOnlyHolder<S.Stream<number>>();

    constructor(props: Props) {
        super(props);
        console.log(`constructor on digit ${props.digit}`);
    }

    componentDidMount(): void {
        console.log(`componentDidMount() DigitButton${this.props.digit}`);

        this.digitStream.initialize(this.clickStreamSink.map(() => this.props.digit));
    }

    render() {
        return (
            <div>
                <button onClick={this.clickButton}>{this.props.digit}</button>
            </div>
        )
    }
}
