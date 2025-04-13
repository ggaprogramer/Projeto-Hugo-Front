import Main from './Main';
import {HomePagePropsInterface} from '../interfaces';

export default function HomePage(props: HomePagePropsInterface) {
    const userIsAuthenticated = props.userIsAuthenticated;

    return (
      <>
        <Main userIsAuthenticated={userIsAuthenticated}/>
      </>
    );
}
