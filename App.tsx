import { NavigationContainer } from '@react-navigation/native'
import { magic } from '@views/auth/SignIn'
import { SupabaseProvider } from 'context/SupabaseProvider'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFont } from 'src/hooks/useFont'
import { AuthNavigator } from 'src/navigation/AuthNavigation'

magic.preload()
const App = () => {
    const { loadFonts } = useFont()
    if (!loadFonts) {
        return null
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <SupabaseProvider>
                    <magic.Relayer />
                    <AuthNavigator />
                </SupabaseProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App

const styles = StyleSheet.create({})
