import * as React from "react";
import * as S from "sodiumjs";

export abstract class AbstractButton<Props> extends React.PureComponent<Props> {

    protected clickButton = () => this.clickStreamSink.send(S.Unit)

    protected clickStreamSink = new S.StreamSink<S.Unit>()
}

export class ReadOnlyHolder<T> {
    private _value : T | null = null

    initialize(value : T) {
        if (this._value) {
            throw new Error("Holder is initialized twice")
        } else {
            this._value = value
        }
    }

    get() : T {
        if (this._value) {
            return this._value
        } else {
            throw new Error("Holder is not initialized")
        }
    }
}