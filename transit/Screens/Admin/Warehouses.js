import React, { useEffect, useState } from "react"
import { 
    View, 
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet 
} from "react-native"
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage"
import { add } from "react-native-reanimated";

var { width } = Dimensions.get("window")

const Item = (props) => {
    return (
        <View style={styles.item}>
            <Text>{props.item.name}</Text>
            <EasyButton
                danger
                medium
                onPress={() => props.delete(props.item._id)}
            >
                <Text style={{ color: "white", fontWeight: "bold"}}>Delete</Text>
            </EasyButton>
        </View>
    )
}

const Warehouses = (props) => {

    const [warehouses, setWarehouses] = useState([]);
    const [warehouseName, setWarehouseName] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
        .get(`${baseURL}warehouses`)
        .then((res) => setWarehouses(res.data))
        .catch((error) => alert("Error to load warehouses"))

        return () => {
            setWarehouses();
            setToken();
        }
    }, [])

    const addWarehouse = () => {
        const warehouse = {
            name: warehouseName
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
        .post(`${baseURL}warehouses`, warehouse, config)
        .then((res) => setWarehouses([...warehouses, res.data]))
        .catch((error) => alert("Error to load warehouses"));

        setWarehouseName("");
    }

    const deleteWarehouse = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
        .delete(`${baseURL}warehouses/${id}`, config)
        .then((res) => {
            const newWarehouses = warehouses.filter((item) => item.id !== id);
            setWarehouses(newWarehouses);
        })
        .catch((error) => alert("Error to load warehouses"));
    }

    return (
        <View style={{ position: "relative", height: "100%"}}>
            <View style={{ marginBottom: 60 }}>
                <FlatList 
                    data={warehouses}
                    renderItem={({ item, index }) => (
                        <Item item={item} index={index} delete={deleteWarehouse} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.bottomBar}>
                <View>
                    <Text>Add Warehouse</Text>
                </View>
                <View style={{ width: width / 2.5 }}>
                    <TextInput 
                        value={warehouseName}
                        style={styles.input}
                        onChangeText={(text) => setWarehouseName(text)}
                    />
                </View>
                <View>
                    <EasyButton
                        medium
                        primary
                        onPress={() => addWarehouse()}
                    >
                        <Text style={{ color: "white", fontWeight: "bold"}}>Submit</Text>
                    </EasyButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        width: width,
        height: 60,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    },
    item: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5
    }
})

export default Warehouses;