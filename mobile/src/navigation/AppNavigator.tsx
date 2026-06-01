import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import OtpVerifyScreen from "../screens/auth/OtpVerifyScreen";

import ParentHomeScreen from "../screens/parent/HomeScreen";
import TeacherHomeScreen from "../screens/teacher/HomeScreen";
import BranchHeadHomeScreen from "../screens/branchHead/HomeScreen";
import SuperAdminHomeScreen from "../screens/superAdmin/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

         <Stack.Screen name="OtpVerify"  
          component={OtpVerifyScreen} 
        />

        <Stack.Screen
          name="ParentHome"
          component={ParentHomeScreen}
        />

        <Stack.Screen
          name="TeacherHome"
          component={TeacherHomeScreen}
        />

        <Stack.Screen
          name="BranchHeadHome"
          component={BranchHeadHomeScreen}
        />

        <Stack.Screen
          name="SuperAdminHome"
          component={SuperAdminHomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}