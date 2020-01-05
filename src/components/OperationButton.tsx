import * as React from "react"
import * as S from "sodiumjs"
import {Operator} from "../logic/operator";
import {AbstractButton} from "./AbstractButton";

interface Props {
    readonly operator: Operator
}

export default class OperationButton extends AbstractButton<Props> {
    
    // TODO - This should be a reusable Holder-Object-Class
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
        console.log('constructor on operator '+ props.operator )
    }

    componentDidMount(): void {
        console.log('componentDidMount() OperationButton' + this.props.operator)

        this._digitStream = this.clickStreamSink.map( () => this.props.operator )
    }

    render() {
        return (
            <div>
                <button onClick={this.clickButton}>{this.props.operator}</button>
            </div>
        )
    }
}
