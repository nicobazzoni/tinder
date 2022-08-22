
import { Button,  Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
    <StackNavigator />
  </AuthProvider>
  </NavigationContainer>
  
  );
}


