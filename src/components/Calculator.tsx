import * as React from "react"
import DigitButton from "./DigitButton"
import Display from "./Display"
import * as S from "sodiumjs"
import OperationButton from "./OperationButton";
import {CalculatorState, Operator} from "../logic/operator";

interface Props {
}

// PureComponente => effizientere Variante für Update-Prüfung (shouldComponentUpdate()) sollte über Sodium erledigt werden
export default class Calculator extends React.PureComponent<Props> {

    private readonly digit1 = React.createRef<DigitButton>();
    private readonly digit2 = React.createRef<DigitButton>();
    private readonly digit3 = React.createRef<DigitButton>();
    private readonly digit4 = React.createRef<DigitButton>();
    private readonly digit5 = React.createRef<DigitButton>();
    private readonly digit6 = React.createRef<DigitButton>();
    private readonly digit7 = React.createRef<DigitButton>();
    private readonly digit8 = React.createRef<DigitButton>();
    private readonly digit9 = React.createRef<DigitButton>();
    private readonly digit0 = React.createRef<DigitButton>();
    private readonly display = React.createRef<Display>();
    private readonly opPlus = React.createRef<OperationButton>();
    private readonly opMinus = React.createRef<OperationButton>();
    private readonly opCompute = React.createRef<OperationButton>();

    constructor(props: Props) {
        super(props);
        console.log('constructor on calculator ')
    }

    componentDidMount(): void {
        console.log('componentDidMount() Calculator');

        this.display.current!.displayCell = S.Transaction.run(() => {
            const statusC = new S.CellLoop<CalculatorState>();

            const updatedStateS = this.wireDigitAndOperatorStreams(statusC);

            statusC.loop(
                updatedStateS.hold(
                    new CalculatorState(0, 0, 0, Operator.None)));

            return statusC.map(status => status.display);
        });

    }

    private wireDigitAndOperatorStreams(statusC: S.Cell<CalculatorState>) {
        const updatedEnteredNumberS = this.wireDigitStream(statusC);

        const updatedStateFromCompute = this.wireComputeStream(statusC);

        const updatedStateFromOperatorS = this.wireOperators(statusC);

        return updatedEnteredNumberS
            .orElse(updatedStateFromOperatorS)
            .orElse(updatedStateFromCompute);
    }

    private wireDigitStream(statusC: S.Cell<CalculatorState>): S.Stream<CalculatorState> {
        const digitS = this.combineDigitStreams();
        return digitS.snapshot(
            statusC,
            (dig, status) =>
                status.withDisplayAndMain(status.main * 10 + dig));
    }


    private combineDigitStreams(): S.Stream<number> {
        return this.digit1.current!.digitStream.get()
            .orElse(this.digit2.current!.digitStream.get())
            .orElse(this.digit3.current!.digitStream.get())
            .orElse(this.digit4.current!.digitStream.get())
            .orElse(this.digit5.current!.digitStream.get())
            .orElse(this.digit6.current!.digitStream.get())
            .orElse(this.digit7.current!.digitStream.get())
            .orElse(this.digit8.current!.digitStream.get())
            .orElse(this.digit9.current!.digitStream.get())
            .orElse(this.digit0.current!.digitStream.get())
    }

    private wireOperators(statusC: S.Cell<CalculatorState>) {
        const combinedOperatorsWithoutComputeStream =
            this.opMinus.current!.operatorStream.get()
                .orElse(this.opPlus.current!.operatorStream.get());


        return combinedOperatorsWithoutComputeStream.snapshot(statusC,
            (op, status) =>
                status.applyActiveOperatorAndSetOperator(op));
    }

    private wireComputeStream(statusC: S.Cell<CalculatorState>): S.Stream<CalculatorState> {
        return this.opCompute.current!.operatorStream.get()
            .snapshot(statusC,
                (u, status) =>
                    status
                        .applyActiveOperatorAndSetOperator(Operator.None)
                        .resetMainAndback());
    }


    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th colSpan={4}><Display ref={this.display}/></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><DigitButton digit={7} ref={this.digit7}/></td>
                    <td><DigitButton digit={8} ref={this.digit8}/></td>
                    <td><DigitButton digit={9} ref={this.digit9}/></td>
                    <td><OperationButton operator={Operator.Plus} ref={this.opPlus}/></td>
                </tr>
                <tr>
                    <td><DigitButton digit={4} ref={this.digit4}/></td>
                    <td><DigitButton digit={5} ref={this.digit5}/></td>
                    <td><DigitButton digit={6} ref={this.digit6}/></td>
                    <td><OperationButton operator={Operator.Minus} ref={this.opMinus}/></td>
                </tr>
                <tr>
                    <td><DigitButton digit={1} ref={this.digit1}/></td>
                    <td><DigitButton digit={2} ref={this.digit2}/></td>
                    <td><DigitButton digit={3} ref={this.digit3}/></td>
                    <td rowSpan={2}><OperationButton operator={Operator.Compute} ref={this.opCompute}/></td>
                </tr>
                <tr>
                    <td/>
                    <td><DigitButton digit={0} ref={this.digit0}/></td>
                    <td/>
                </tr>
                </tbody>
            </table>
        )
    }
}

