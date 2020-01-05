import * as React from "react";
import * as S from "sodiumjs";

export abstract class AbstractButton<Props> extends React.PureComponent<Props> {


    protected clickButton = () => this.clickStreamSink.send(S.Unit)

    protected clickStreamSink = new S.StreamSink<S.Unit>()
}