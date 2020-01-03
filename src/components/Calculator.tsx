import * as React from "react";
import DigitButton from "./DigitButton";
import Display from "./Display";

interface Props {
}

interface State {
}

// PureComponente => effizientere Variante für Update-Prüfung (shouldComponentUpdate()) sollte über Sodium erledigt werden
export default class Calculator extends React.PureComponent<Props, State> {

    private readonly Digit1 = React.createRef<DigitButton>()

    //private

    constructor(props:Props) {
        super(props)
        console.log('constructor on calculator ')
    }

    componentDidMount(): void {
        console.log('componentDidMount() Calculator')

    }

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th colSpan={3}><Display/></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><DigitButton digit={7}/></td>
                    <td><DigitButton digit={8}/></td>
                    <td><DigitButton digit={9}/></td>
                </tr>
                <tr>
                    <td><DigitButton digit={6}/></td>
                    <td><DigitButton digit={5}/></td>
                    <td><DigitButton digit={4}/></td>
                </tr>
                <tr>
                    <td><DigitButton digit={3}/></td>
                    <td><DigitButton digit={2}/></td>
                    <td><DigitButton digit={1} ref={this.Digit1}/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><DigitButton digit={0}/></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        )
    }
}
