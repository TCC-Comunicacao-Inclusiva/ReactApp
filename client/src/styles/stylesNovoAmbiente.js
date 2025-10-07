import { StyleSheet } from 'react-native';

const stylesNovoAmbiente = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012E40', // fundo escuro do app
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fafafa',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    elevation: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#025159',
  },
  button: {
    backgroundColor: '#038C8C', // teal
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  containerCriacao: {
    width: '90%',
    backgroundColor: '#ffffffee',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#F28705', // barra laranja de destaque
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  itemInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#025159',
  },
  addButton: {
    height: 50,
    width: 50,
    backgroundColor: '#F28705', // botão de adicionar em laranja
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  iconesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 20,
  },
  icone: {
    width: 50,
    height: 50,
    margin: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconeSelecionado: {
    borderColor: '#038C8C', // selecionado em teal
  },
  listaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    width: '100%',
    elevation: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#038C8C',
  },
  listaIcone: {
    width: 24,
    height: 24,
    marginRight: 10,
    //tintColor: '#038C8C',
  },
});

export default stylesNovoAmbiente;
