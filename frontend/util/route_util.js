import React from "react";
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Auth = ({ loggedIn, children }) => {
    const location = useLocation();
    
    return !loggedIn ? children : <Navigate to="/browse" replace state={{ from: location }} />;
};

const Protected = ({ loggedIn, children }) => {
    const location = useLocation();
    
    return loggedIn ? children : <Navigate to="/" replace state={{ from: location }} />;
};

const mapStateToProps = state => {
    return { loggedIn: Boolean(state.session.id) };
}

export const AuthRoute = connect(mapStateToProps)(Auth);

export const ProtectedRoute = connect(mapStateToProps)(Protected);


