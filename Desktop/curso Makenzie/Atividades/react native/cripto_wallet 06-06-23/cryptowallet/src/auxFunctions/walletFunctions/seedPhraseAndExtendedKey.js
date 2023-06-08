import * as bip39 from 'bip39';
global.Buffer = require('buffer').Buffer;
//import * as bip32 from 'react-native-bip32-utils';
import CryptoJS from 'crypto-js';
//import BcryptReactNative from 'bcrypt-react-native';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';

//import {pbkdf2Sync} from 'react-native-crypto';

// // // Gerar uma frase de recuperação com 12 palavras
// // export const seedPhrase = bip39.generateMnemonic(192); // 192 bits de entropia para uma frase de 18 palavras

// // console.log("Frase de recuperação:", seedPhrase);

// // //Criar a seed
// // const seed = crypto.pbkdf2Sync(seedPhrase, "salt", 2048, 64, "sha512");

// // // Derivação da chave mestra (master key)
// // const root_key = bip32.fromSeed(seed);
// // const masterKey = root_key.derivePath("m/"); //raiz da chave mestra

// // // Derivação de chaves extendidas
// // const accountExtendedKey = masterKey.derivePath("m/44'/0'/0'"); //padrão BIP-44 , 0(biticoin), 0(primeira conta no app)
// // export const newExtendedKey = accountExtendedKey.derivePath("0");

export class BtcWalletCreation {
  constructor() {}

  createNewSeedPhrase = async () => {
    try {
      rng = bufferSize => {
        const buffer = new Uint8Array(bufferSize);
        return buffer.map(() => Math.floor(isaac.random() * bufferSize));
      };
      const seedPhrase = bip39.generateMnemonic(256, rng); // default to 128
      console.log(seedPhrase);
      return;
    } catch (e) {
      console.log('error');
      return console.log(e);
    }
  };
  createSalt = async () => {
    try {
      bcrypt.setRandomFallback(len => {
        const buf = new Uint8Array(len);
        return buf.map(() => Math.floor(isaac.random() * 256));
      });
      const salt = await bcrypt.genSaltSync();
      console.log(`salt: ${salt}`);
      return salt;
    } catch (error) {
      console.log(error);
    }
  };

  createDerivedKey = salt => {
    return new Promise((resolve, reject) => {
      //const newSeedPhrase = async () => await this.createNewSeedPhrase();
      const newSeedPhrase = 'patos patos patos patos patos patos';

      if (!newSeedPhrase) {
        reject('Frase nao definida');
      }
      try {
        const keySize = 64;
        const iterations = 2048;

        const derivedKey = () => {
          CryptoJS.PBKDF2(newSeedPhrase, salt.toString('binary'), {
            keySize,
            iterations,
            hasher: CryptoJS.algo.SHA512,
          });
        };
        console.log(derivedKey);
        resolve(derivedKey);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
  createDerivedKeyHex = derivedKey => {
    return new Promise((resolve, reject) => {
      if (!derivedKey) {
        reject('Faltando chave de derivação');
      }
      try {
        const derivedKeyHex = derivedKey.toString(CryptoJS.enc.Hex);
        console.log(derivedKeyHex);
        resolve(derivedKeyHex);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  getDerivedSeed = derivedKeyHex => {
    return new Promise((resolve, reject) => {
      if (!derivedKeyHex) {
        reject('Faltando chave de derivação hex');
      }
      try {
        const derivedSeed = CryptoJS.SHA512(derivedKeyHex);
        console.log(derivedSeed);
        resolve(derivedSeed);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  // createExtendedKey() {
  //   const root_key = bip32.fromSeed(this.createNewSeed());
  //   const masterKey = root_key.derivePath('m/'); //raiz da chave mestra
  //   const accountExtendedKey = masterKey.derivePath("m/44'/0'/0'"); //padrão BIP-44 , 0(biticoin), 0(primeira conta no app)
  //   return accountExtendedKey.derivePath('0');
  // }
  // get extendedKey() {
  //   return this.createExtendedKey();
  // }
}
