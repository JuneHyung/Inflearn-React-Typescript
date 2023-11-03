import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import { ThunkDispatch, logIn, logOut } from './actions/user';
import { UserState } from './reducers/user';
import { RootState } from './reducers';

interface StateToProps {
  user: UserState,
}

interface DispatchToProps {
  dispatchLogIn: ({id, password}: {id: string, password: string}) => void,
  dispatchLogOut: ()=>void,
}
class AppClass extends Component<StateToProps & DispatchToProps> {
  onClick = () =>{
    this.props.dispatchLogIn({
      id: 'junehyung',
      password: '비밀번호',
    })
  }

  onLogOut = () =>{
    this.props.dispatchLogOut();
  }
  render(){
    const {user} = this.props;
    return(
      <div>
        {user.isLoggingIn
        ? <div>로그인 중</div>
        : user.data
        ? <div>{user.data.nickname}</div>
        : '로그인 해주세요'
        } 
        {
          !user.data 
            ? <button onClick={this.onClick}>로그인</button>
            : <button onClick={this.onLogOut}>로그아웃</button>
        }
      </div>
    )
  }
}
const mapStateToProps = (state: RootState) =>({
  user: state.user,
}) // reselect

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  dispatchLogIn: (data: {id: string, password: string}) => dispatch(logIn(data)),
  dispatchLogOut: () => dispatch(logOut()),
})
export default connect(mapStateToProps, mapDispatchToProps)(AppClass);