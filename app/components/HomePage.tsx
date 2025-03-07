import Link from 'next/link';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {HomePagePropsInterface} from '../interfaces';

export default function HomePage(props: HomePagePropsInterface) {
    const userIsAuthenticated = props.userIsAuthenticated;

    return (
      <>
        <Header userIsAuthenticated={userIsAuthenticated}/>
        <Main userIsAuthenticated={userIsAuthenticated}/>
        <Footer userIsAuthenticated={userIsAuthenticated}/>
      </>
    );
}
