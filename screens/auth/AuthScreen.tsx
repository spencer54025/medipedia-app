import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from "react-native";

import authScreenStyles from "../../styles/screens/authScreen"
const { textField, textFieldWrapper } = textInputStyle
import textInputStyle from "../../styles/forms/textInputStyles";
import API from "../../utils/api";
import Button from "../../componets/helpers/Button"


interface IAuthScreenProps {
    navigation: {
        navigate: (arg: string) => void;
    }
}

export default (props: IAuthScreenProps) => {
    const [formToShow, setFormtoShow] = useState("LOGIN")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const screenTypeText = () => {
        return (formToShow === "LOGIN" ? "Need an account? Register" : "Already have an account? Login")
    }

    const handleAuthTypePress = () => {
        (formToShow === "LOGIN" ? setFormtoShow("REGISTER") : setFormtoShow("LOGIN"))
    }

    const buttonText = () => {
        return (formToShow === "LOGIN" ? "Login" : "Register")
    }

    const handleLogin = () => {
        const params = {
            auth: {
                email: email,
                password: password
            }
        }
        API.post("memipedia_user_token", params)
        .then(res => {
            if (res.data.jwt) {
                props.navigation.navigate("Feed");
            }
            else{
                Alert.prompt("wrong password or email", "Please try again")
            }
        })
        .catch(err => {
            console.log(err)
            setIsSubmitting(false)
        })
    }

    const handleRegister = () => {
        const params = {
            user: {
                email: email,
                password: password
            }
        }
        API.post("memipedia_users", params)
        .then(res => {
            if (res.data.memipedia_user) {
                props.navigation.navigate("Feed");
            }
            else{
                setIsSubmitting(false)
                alert("Error creating user account")
            }
        })
        .catch(err => {
            console.log("Error creating user account")
            setIsSubmitting(false)
        })
    }

    const handleSubmit = () => {
        if(formToShow === "LOGIN"){
            handleLogin()
        }
        else{
            handleRegister()
        }
        setIsSubmitting(false)
    }

    return (
        <View style={authScreenStyles.container}>
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

            <TouchableOpacity style={{marginTop: 10, marginBottom: 20 }} onPress={handleAuthTypePress}><Text style={{color: "white"}}>{screenTypeText()}</Text></TouchableOpacity>
            
            {isSubmitting ?
            <Button text={"submitting..."} onPress={handleSubmit} disabled={true}/> :
            <Button text={buttonText()} onPress={handleSubmit} />
            }
        </View>
    )
    
}