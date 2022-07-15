import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from "react-native";
import axios from "axios";

import authScreenStyles from "../../styles/screens/authScreen"
const { textField, textFieldWrapper } = textInputStyle
import textInputStyle from "../../styles/forms/textInputStyles";

const apiEndpoint = "https://spencervp.devcamp.space/memipedia/memipedia_user_token"

export default () => {
    const [formToShow, setFormtoShow] = useState("LOGIN")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const screenTypeText = () => {
        return (formToShow === "LOGIN" ? "Need an account? Register" : "Already have an account? Login")
    }

    const handleAuthTypePress = () => {
        (formToShow === "LOGIN" ? setFormtoShow("REGISTER") : setFormtoShow("LOGIN"))
    }

    const headerText = () => {
        return (formToShow === "LOGIN" ? "Login" : "Register")
    }

    const handleSubmit = () => {
        const params = {
            auth: {
                email: email,
                password: password
            }
        }
        axios.post(apiEndpoint, params)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <View style={authScreenStyles.container}>
            <Text style={{color: "white"}}>{headerText()}</Text>

            <View style={textFieldWrapper}>
                <TextInput spellCheck={false} autoCapitalize='none' placeholder='Email' value={email} onChangeText={val => setEmail(val)}
                 style={textInputStyle.textField}>
                 </TextInput>
            </View>
            <View>
                 <TextInput secureTextEntry={true} autoCapitalize='none' placeholder='Password' value={password} onChangeText={val => setPassword(val)}
                    style={textField}>
                 </TextInput>
            </View>

            <TouchableOpacity onPress={handleAuthTypePress}><Text style={{color: "white"}}>{screenTypeText()}</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}><Text style={{color: "white"}}>{headerText()}</Text></TouchableOpacity>
        </View>
    )
    
}