import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { loadUser } from '../redux/actions/authActions';
import { CatLoader } from '../components/UI/CatLoader';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Check for token in storage
    const checkAuth = async () => {
      await dispatch(loadUser());
      setInitializing(false);
    };

    checkAuth();
  }, [dispatch]);

  if (initializing) {
    return <CatLoader size="large" />;
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
