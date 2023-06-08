import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BtcWalletCreation} from './src/auxFunctions/walletFunctions/seedPhraseAndExtendedKey';

export default function App() {
  async function createWallet() {
    console.log('teste');
    const testeClasse = new BtcWalletCreation();
    //console.log(testeCLasse.getTest);

    try {
      const seedPhrase = await testeClasse.createNewSeedPhrase();
      const salt = await testeClasse.createSalt();
      const derivedKey = await testeClasse.createDerivedKey(salt);
      const derivedKeyHex = await testeClasse.createDerivedKeyHex(derivedKey);
      const derivedSeed = await testeClasse.getDerivedSeed(derivedKeyHex);

      console.log(derivedSeed.toString());
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={createWallet}>
        <Text>Teste!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
