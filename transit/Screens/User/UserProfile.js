import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
// import AsyncStorage from "@react-native-community/async-storage"
import TrunkCard from "../../Shared/TrunkCard"

// import axios from "axios"
// import baseURL from "../../assets/common/baseUrl"

// import AuthGlobal from "../../Context/store/AuthGlobal"
// import { logoutUser } from "../../Context/actions/Auth.actions"
import { useEffect } from 'react/cjs/react.development';

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [orders, setOrders] = useState()

    useFocusEffect(
        useCallback(() => {
        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}users/${context.stateUser.user.sub}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((user) => setUserProfile(user.data))
            })
            .catch((error) => console.log(error))

        axios
        .get(`${baseURL}trunks`)
        .then((x) => {
            const data = x.data;
            console.log(data)
            const userTrunks = data.filter(
                (trunk) => trunk.user._id === context.stateUser.user.sub
            );
            setTrunks(userTrunks);
        })
        .catch((error) => console.log(error))

        return () => {
            setUserProfile();
            setTrunks();
        }

    }, [context.stateUser.isAuthenticated]))

    return (
       <Container style={styles.container}>
           <ScrollView contentContainerStyle={styles.subContainer}>
               <Text style={{ fontSize: 30 }}>
                   {userProfile ? userProfile.name : "" }
               </Text>
               <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : ""}
                    </Text>
               </View>
               <View style={{ marginTop: 80 }}>
                    <Button title={"Sign Out"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]}/>
               </View>
               <View style={styles.trunk}>
                   <Text style={{ fontSize: 20 }}>My Trunks</Text>
                   <View>
                       {trunks ? (
                           trunks.map((x) => {
                               return <TrunkCard key={x.id} {...x} />;
                           })
                       ) : (
                           <View style={styles.trunk}>
                               <Text>You have no trunks</Text>
                           </View>
                       )}
                   </View>
               </View>
           </ScrollView>
       </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    trunk: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})

export default UserProfile;