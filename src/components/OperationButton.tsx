import * as React from "react"
import * as S from "sodiumjs"
import {Operator, operatorSymbol} from "../logic/operator";
import {AbstractButton, ReadOnlyHolder} from "./utilities";

interface Props {
    readonly operator: Operator
}

export default class OperationButton extends AbstractButton<Props> {

    operatorStream = new ReadOnlyHolder<S.Stream<Operator>>();

    constructor(props: Props) {
        super(props)
        console.log('constructor on operator ' + props.operator)
    }

    componentDidMount(): void {
        console.log('componentDidMount() OperationButton' + this.props.operator)

        this.operatorStream.initialize(
            this.clickStreamSink.map(() => this.props.operator)
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.clickButton}>{operatorSymbol(this.props.operator)}</button>
            </div>
        )
    }
}
