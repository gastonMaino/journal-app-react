import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebaseConfig'
import { login } from '../actions/auth';
import { LoadingScreen } from '../components/Auth/LoadingScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch()
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch( startLoadingNotes(user.uid) );

            } else {
                setIsLoggedIn(false)
            }

            setChecking(false);
        })

    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) {
        return <LoadingScreen />
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path ='/auth'
                        isLoggedIn={isLoggedIn}
                        component={AuthRouter}
                    />
                    <PrivateRoute
                        exact
                        path='/'
                        isLoggedIn={isLoggedIn}
                        component={JournalScreen}
                    />
                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
