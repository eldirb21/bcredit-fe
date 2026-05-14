import { useLoginAnimation } from '@/hooks'
import { loginThunk } from '@/store/auth/auth.thunk'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated from 'react-native-reanimated'

const { width } = Dimensions.get('window')

export default function LoginScreen() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    bgStyle,
    circle1Style,
    circle2Style,
    logoStyle,
    formStyle,
    buttonStyle,
    animateButtonPress,
  } = useLoginAnimation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const handleLogin = async () => {
    animateButtonPress()

    const result = await dispatch(loginThunk({ email, password }))

    if (loginThunk.fulfilled.match(result)) {
      router.replace('/(tabs)')
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Background */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.bg, bgStyle]} />

      {/* Decorative circles */}
      <Animated.View style={[styles.circle1, circle1Style]} />
      <Animated.View style={[styles.circle2, circle2Style]} />

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>KI</Text>
        </View>
        <Text style={styles.brandName}>Koperasi Indonesia</Text>
      </Animated.View>

      {/* Form */}
      <Animated.View style={[styles.formCard, formStyle]}>
        <Text style={styles.greeting}>Selamat datang 👋</Text>
        <Text style={styles.subtitle}>Masuk ke akun kamu</Text>

        <View
          style={[styles.inputWrapper, emailFocused && styles.inputFocused]}
        >
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="kamu@email.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>

        <View
          style={[
            styles.inputWrapper,
            passwordFocused && styles.inputFocused,
            { marginTop: 12 },
          ]}
        >
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </View>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Lupa password?</Text>
        </TouchableOpacity>

        <Animated.View style={buttonStyle}>
          <TouchableOpacity
            style={[styles.loginBtn, isLoading && styles.loginBtnLoading]}
            onPress={handleLogin}
            activeOpacity={0.9}
            disabled={isLoading}
          >
            <Text style={styles.loginBtnText}>
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>atau</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.registerBtnText}>Buat Akun Baru</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    backgroundColor: '#0F172A',
  },
  circle1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#1E3A5F',
    opacity: 0.6,
  },
  circle2: {
    position: 'absolute',
    bottom: -100,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#0EA5E9',
    opacity: 0.12,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  brandName: {
    color: '#F1F5F9',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },
  formCard: {
    width: width - 40,
    backgroundColor: '#1E293B',
    borderRadius: 28,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  greeting: {
    color: '#F1F5F9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 24,
  },
  inputWrapper: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  inputFocused: {
    borderColor: '#0EA5E9',
  },
  inputLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  input: {
    color: '#F1F5F9',
    fontSize: 15,
    paddingVertical: 4,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  forgotText: {
    color: '#0EA5E9',
    fontSize: 13,
    fontWeight: '500',
  },
  loginBtn: {
    backgroundColor: '#0EA5E9',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  loginBtnLoading: {
    backgroundColor: '#0284C7',
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    color: '#475569',
    marginHorizontal: 12,
    fontSize: 13,
  },
  registerBtn: {
    borderWidth: 1.5,
    borderColor: '#334155',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  registerBtnText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 15,
  },
})
