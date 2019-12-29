import * as React from "react";

interface Props {}
interface State {}

// PureComponente => effizientere Variante für Update-Prüfung (shouldComponentUpdate()) sollte über Sodium erledigt werden
export default class Calculator extends React.PureComponent<Props, State> {
    render(){
        return (
        <div>
            The Calculator
        </div>
        )
    }
}
