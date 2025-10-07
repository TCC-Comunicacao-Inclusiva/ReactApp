import { StyleSheet } from 'react-native';

const stylesInicio = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012E40', // fundo global do app
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fafafa', // título claro sobre fundo escuro
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#F28705', // botão principal laranja
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    width: '85%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default stylesInicio;
