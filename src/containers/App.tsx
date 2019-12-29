import *  as React from 'react'
import * as C from "../circuits"
import * as V from "../views"
import Calculator from '../components/Calculator';

export class App extends React.PureComponent {

  private readonly doc = C.Document$.create();

  render() {
      // <V.DocumentView doc$={this.doc} />
    return <Calculator/>
  }
}
