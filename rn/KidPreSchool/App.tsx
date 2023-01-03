/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';

import NavigationContainer from '~/navigators/NavigationContainer';
import RootNavigator from '~/navigators/RootNavigator';
import { configureAppStore } from '~/redux/store/configureStore';
import { defaultTheme } from '~/theme/theme';

const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs();
  const store = configureAppStore();
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StoreProvider store={store}>
        <PaperProvider theme={defaultTheme}>
          <NavigationContainer theme={defaultTheme}>
            <RootNavigator />
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
