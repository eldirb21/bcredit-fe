import { useLoginAnimation } from '@/hooks'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated from 'react-native-reanimated'

type Field = 'name' | 'email' | 'password' | 'confirm'

export default function RegisterScreen() {
  const router = useRouter()
  const { saveToken } = useAuth()

  const {
    bgStyle,
    circle1Style,
    circle2Style,
    formStyle,
    buttonStyle,
    headerStyle,
    animateButtonPress,
  } = useLoginAnimation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focused, setFocused] = useState<Field | null>(null)

  const handleRegister = async () => {
    animateButtonPress()

    setIsLoading(true)

    setTimeout(async () => {
      await saveToken('token-dari-api')
      router.replace('/(tabs)')
      setIsLoading(false)
    }, 1200)
  }

  const inputField = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    fieldKey: Field,
    options?: {
      placeholder?: string
      secure?: boolean
      keyboard?: 'default' | 'email-address'
    },
  ) => (
    <View
      style={[styles.inputWrapper, focused === fieldKey && styles.inputFocused]}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={options?.placeholder ?? ''}
        placeholderTextColor="#4B5563"
        secureTextEntry={options?.secure ?? false}
        keyboardType={options?.keyboard ?? 'default'}
        autoCapitalize="none"
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(fieldKey)}
        onBlur={() => setFocused(null)}
      />
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View style={[StyleSheet.absoluteFill, styles.bg, bgStyle]} />

      {/* Decorative */}
      <Animated.View style={[styles.circle1, circle1Style]} />
      <Animated.View style={[styles.circle2, circle2Style]} />
      <View style={styles.accentBar} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerStyle]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>← Kembali</Text>
          </TouchableOpacity>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>KI</Text>
            </View>
            <Text style={styles.brandName}>Koperasi Indonesia</Text>
          </View>
          <Text style={styles.pageTitle}>Buat Akun</Text>
          <Text style={styles.pageSubtitle}>
            Daftar dan mulai perjalananmu bersama kami
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View style={[styles.formCard, formStyle]}>
          {inputField('Nama Lengkap', name, setName, 'name', {
            placeholder: 'John Doe',
          })}

          <View style={{ height: 12 }} />

          {inputField('Email', email, setEmail, 'email', {
            placeholder: 'kamu@email.com',
            keyboard: 'email-address',
          })}

          <View style={{ height: 12 }} />

          {inputField('Password', password, setPassword, 'password', {
            placeholder: 'Minimal 8 karakter',
            secure: true,
          })}

          <View style={{ height: 12 }} />

          {inputField('Konfirmasi Password', confirm, setConfirm, 'confirm', {
            placeholder: 'Ulangi password',
            secure: true,
          })}

          <Text style={styles.terms}>
            Dengan mendaftar, kamu menyetujui{' '}
            <Text style={styles.termsLink}>Syarat & Ketentuan</Text> dan{' '}
            <Text style={styles.termsLink}>Kebijakan Privasi</Text> kami.
          </Text>

          <Animated.View style={buttonStyle}>
            <TouchableOpacity
              style={[
                styles.registerBtn,
                isLoading && styles.registerBtnLoading,
              ]}
              onPress={handleRegister}
              activeOpacity={0.9}
              disabled={isLoading}
            >
              <Text style={styles.registerBtnText}>
                {isLoading ? 'Membuat akun...' : 'Daftar Sekarang'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.loginRow}>
            <Text style={styles.loginHint}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => router.replace('/auth/login')}>
              <Text style={styles.loginLink}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bg: {
    backgroundColor: '#0F172A',
  },
  circle1: {
    position: 'absolute',
    top: 60,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#0EA5E9',
    opacity: 0.08,
  },
  circle2: {
    position: 'absolute',
    bottom: 80,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#38BDF8',
    opacity: 0.07,
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#0EA5E9',
  },
  scroll: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    color: '#0EA5E9',
    fontSize: 14,
    fontWeight: '500',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  brandName: {
    color: '#F1F5F9',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  pageTitle: {
    color: '#F1F5F9',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#1E293B',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 16,
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
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  input: {
    color: '#F1F5F9',
    fontSize: 15,
    paddingVertical: 4,
  },
  terms: {
    color: '#475569',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  termsLink: {
    color: '#0EA5E9',
    fontWeight: '600',
  },
  registerBtn: {
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
  registerBtnLoading: {
    backgroundColor: '#0284C7',
  },
  registerBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginHint: {
    color: '#475569',
    fontSize: 14,
  },
  loginLink: {
    color: '#0EA5E9',
    fontSize: 14,
    fontWeight: '600',
  },
})
