import { StyleSheet } from 'react-native';

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#012E40', // fundo global
    padding: 20,
  },
  photoContainer: {
    width: 160,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#F28705', // borda laranja de destaque
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fafafa', // branco para contraste
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#025159',
  },
  button: {
    backgroundColor: '#038C8C', // botão principal teal
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    marginTop: 10,
    width: '80%',
  },
  buttonRegister: {
    backgroundColor: '#F28705', // botão secundário laranja
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    marginTop: 60,
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextRegister: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#03A696', // botão alternar teal-claro
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    width: '80%',
  },
  switchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default stylesLogin;
