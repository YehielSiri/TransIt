import React, { useState, useCallback} from "react"
import { View, FlatList, Text} from "react-native"
// import axios from "axios"
// import baseURL from "../../assets/common/baseUrl"
import { useFocusEffect } from "@react-navigation/native"

import TrunkCard from "../../Shared/TrunkCard"


const Trunks = (props) => {

    const [trunkList, setTrunkList] = useState();

    useFocusEffect(
        useCallback(
            () => {
                getTrunks();
            return () => {
                setTrunkList();
            }
            },
            [],
        )
    )


    const getTrunks = () => {
        axios
        .get(`${baseURL}trunks`)
        .then((x) => {
            setTrunkList(x.data);
        })
        .catch((error) => console.log(error))
    }

    return (
        <View>
            <FlatList 
                data={trunkList}
                renderItem={({ item }) => (
                    <TrunkCard navigation={props.navigation} {...item} editMode={true}/>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Trunks;