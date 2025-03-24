import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  moves: {
    fontSize: 18,
    marginBottom: 10,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ddd',
  },
  tile: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  splashTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#333',
  },
  // Styles pour le champ de saisie et les scores
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  scoresContainer: {
    marginTop: 30,
    width: '80%',
  },
  scoresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scoreItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  scoreText: {
    fontSize: 16,
  },
  noScoresText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});