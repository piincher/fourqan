import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@views/Home';
import Profile from '@views/Profile';
import Upload from '@views/upload';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          headerTitle: '',
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-music-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
