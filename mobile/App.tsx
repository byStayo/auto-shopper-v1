import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

const WEB_URL =
  (Constants.expoConfig?.extra?.webUrl as string | undefined) ??
  'https://closet-shopper-app.stelios.poke.site'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="auto" />
      <WebView
        source={{ uri: WEB_URL }}
        style={styles.web}
        onLoadEnd={() => setLoading(false)}
        allowsInlineMediaPlayback
        originWhitelist={['*']}
        startInLoadingState
      />
      {loading ? (
        <View style={styles.loader} pointerEvents="none">
          <ActivityIndicator size="large" color="#328f97" />
        </View>
      ) : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e7f3ec',
  },
  web: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
