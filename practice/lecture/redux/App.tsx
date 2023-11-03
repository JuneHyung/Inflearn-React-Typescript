import * as React from "react";
import { FC } from "react";
import { UserState } from "./reducers/user";
import { logIn, logOut } from "./actions/user";
import { RootState } from "./reducers";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  user: UserState;
}

const App: FC<Props> = () => {
  const { isLoggingIn, data } = useSelector<RootState, UserState>((state) => state.user);
  const dispatch = useDispatch();
  const onClick = () =>{
    dispatch(logIn({
      id: 'junehyung',
      password: '비밀번호',
    }));
  }

  const onLogOut = () =>{
    dispatch(logOut())
  }
  return (
    <div>
      {isLoggingIn ? <div>로그인 중</div> : data ? <div>{data.nickname}</div> : "로그인 해주세요"}
      {!data ? <button onClick={onClick}>로그인</button> : <button onClick={onLogOut}>로그아웃</button>}
    </div>
  );
};
export default App;
