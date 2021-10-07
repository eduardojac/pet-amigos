import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { styles, LoadingIcon } from '../FazerLogin/styles.js';
import firebase from '../../../firebaseconection';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { render } from 'react-dom';


export default function FazerLogin() {
    const [animacao, setAnimacao] = useState(false)


    // Navegação entre telas
    const navigation = useNavigation();

    const AbrirHome = () => {
        navigation.navigate('Home')
    }

    const AbrirTelaPerfil = () => {
        navigation.reset({
            routes: [{ name: 'EscolherPerfil' }]
        })
    }

    const AbrirRecuperarSenha = () => {
        navigation.reset({
            routes: [{ name: 'RecuperarSenha' }]
        })
    }

    const [loading, setLoading] = useState('true')

    //Fazer login
    const [esconderSenha, setEsconderSenha] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmail = (txtEmail) => {
        setEmail(txtEmail)
    }
    const onChangePassword = (txtPassword) => {
        setPassword(txtPassword)
    }
    const login = () => {
        setAnimacao(true)
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            navigation.navigate('Home')
        }).catch(() => {
            setAnimacao(false)
            falha()
        })
    }
    const falha = () =>
        Alert.alert("Usuário ou senha incorretos!")


    // Salvar os dados do usuário

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.pet}>Pet</Text>
            <Text style={styles.amigos}>Amigos</Text>

            <Image style={styles.logo} source={require('../../../assets/src/patinhaLogin.png')} />


            <View style={styles.inputArea}>
                <TextInput style={styles.inputLogin} placeholder='Login' value={email} onChangeText={txtEmail => onChangeEmail(txtEmail)}>
                </TextInput>
                <TouchableOpacity>
                    <MaterialIcons style={styles.iconeEmail} name="email" size={20} color="black" />
                </TouchableOpacity>


            </View>
            <View style={styles.inputArea}>
                <TextInput style={styles.inputSenha} placeholder='Senha' secureTextEntry={esconderSenha} value={password} onChangeText={txtPassword => onChangePassword(txtPassword)}></TextInput>
                <TouchableOpacity style={styles.iconeOlho} onPress={() => setEsconderSenha(!esconderSenha)}>
                    {esconderSenha ?
                        <Ionicons name="eye" size={20} color="black" />
                        :
                        <Ionicons name="eye-off" size={20} color="black" />
                    }
                </TouchableOpacity>
            </View>
            <ActivityIndicator color="black" size='large' animating={animacao}/>
            <TouchableOpacity style={styles.botaoAcessar} onPress={login}>
                <Text style={styles.textBotaoAcessar}>ACESSAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoCadastro} onPress={AbrirTelaPerfil}>
                <Text style={{ fontSize: 17 }}>Não tem cadastro? Cadastre-se!</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoEsqueceuSenha} onPress={AbrirRecuperarSenha}>
                <Text style={{ fontSize: 17 }}>Esqueci minha senha</Text>
            </TouchableOpacity>

        </SafeAreaView>


    )
}


//<TouchableOpacity onPress={AbrirHome}><Text>Direto</Text></TouchableOpacity>