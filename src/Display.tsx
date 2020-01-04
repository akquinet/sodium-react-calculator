import * as React from "react";
import * as S from "sodiumjs";

interface Props {
}

interface State {
    displayedNumber: number
}

export default class Display extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            displayedNumber: 4711
        }

    }

    private _displayCell: S.Cell<number> | null = null
    set displayCell(cell: S.Cell<number>) {
        if (this._displayCell) {
            throw new Error("_displayCell is already set")
        } else {
            this._displayCell = cell
            S.Operational.updates(cell).listen(num => {
                console.log("Display updated to "+ num + " old value is "+ this.state.displayedNumber)
                this.setState(
                    {
                        displayedNumber : num
                    }
                )
            })
            console.log("Added cell listener for display")
        }
    }

    render() {
        return (
            <div>
                <input value={this.state.displayedNumber} type={'number'}/>
            </div>
        )
    }
}
