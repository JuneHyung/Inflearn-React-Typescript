import React, {memo} from 'react';
// import React, {Component} from 'react';
const Try = memo(({tryInfo}) => {
  // const [result, setResult] = useState(tryInfo.result)
  return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
  )
})

Try.displayName='Try'
// class Try extends Component{
//   render(){
//     const {tryInfo} = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     )
//   }
// }
// class Try extends PureComponent{
//   constructor(props){
//     super(props);
//     // 다른 동작
//     // ex) const filtered = this.props.filter(()=>{ ... })
//     // this.state ={ result: filterd, ...}
//     this.state={
//       result: this.props.result,
//       try: this.props.try,
//     }
//   }
//   render(){
//     const {tryInfo} = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     )
//   }
// }

export default Try;