import React, { Component } from "react";
import "../src/App.css";
class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("constructor");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    console.log(nextProps);
    console.log(prevState);
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    console.log(nextProps);
    console.log(nextState);
    return true;
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    console.log(prevProps);
    console.log(prevState);
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  render() {
    console.log("render");
    return (
      <div className={"App"}>
        <h1>로또 번호</h1>

        {this.props.lotto.map((lo, i) => {
          return (
            <h3 className={"lotto"} key={i}>
              {i !== 6 ? lo + " 번" : "+ 보너스 번호 " + lo}
            </h3>
          );
        })}
        <br />
        <br />
        <button onClick={this.props.getLotto}>로또 번호 돌리기</button>
      </div>
    );
  }
}

export default Me;