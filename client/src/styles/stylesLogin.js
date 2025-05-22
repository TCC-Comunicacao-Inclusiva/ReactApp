import { StyleSheet } from 'react-native';

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40E0D0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20, 
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    elevation: 2, 
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    marginTop: 20, 
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  switchButton: {
    marginTop: 25, 
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFC107',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    width: '80%',
  },
  switchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default stylesLogin;
