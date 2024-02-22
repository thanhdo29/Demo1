import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, StyleSheet, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [detail, setDetail] = useState({});
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [itemUpdate, setItemUpdate] = useState({});

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [origin, setOrigin] = useState("");
    const [quantity, setQuantity] = useState("");
    const [img, setImg] = useState("");

    const getData = async () => {
        let url_api = "http://10.24.31.2:3000/product";
        try {
            const res = await fetch(url_api);
            const result = await res.json();
            setData(result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, [])


    const btnUpdate = (idItem) => {
        let updateData = {
            "name": name,
            "price": price,
            "origin": origin,
            "quantity": quantity,
            "img": img
        }

        fetch("http://10.24.31.2:3000/product/" + idItem, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        })
            .then(() => getData())
            .finally(() => setModalUpdate(false))
    }
    const btnDelete = (idItem) => {
        fetch("http://10.24.31.2:3000/product/" + idItem, {
            method: "DELETE",
        })
            .then(() => getData())
    }
    const btnAdd = () => {
        let updateData = {
            "name": name,
            "price": price,
            "origin": origin,
            "quantity": quantity,
            "img": img
        }

        fetch("http://10.24.31.2:3000/product", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        })
            .then(() => getData())
            .finally(() => setModalUpdate(false))
    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.product}>
                <Image style={styles.img} source={{ uri: item.img }} />
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => { setModal(true), setDetail(item) }}>
                        <Text style={{ color: 'black', fontSize: 15 }}>{item.name}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontSize: 15 }}>{item.price} đ</Text>
                    <Text style={{ color: 'black', fontSize: 15 }}>Xuất xứ: {item.origin}</Text>
                </View>
                <View style={{}}>
                    <TouchableOpacity style={styles.btn} onPress={() => { setModalAdd(true) }}>
                        <Text style={styles.text_btn}>Thêm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => { setModalUpdate(true), setItemUpdate(item) }}>
                        <Text style={styles.text_btn}>Sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={()=>{btnDelete(item.id)}}>
                        <Text style={styles.text_btn}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>Danh sách sản phẩm</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => { return item.id }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Sản phẩm chi tiết</Text>
                        <View>
                            <Text style={{ color: 'black', fontSize: 15 }}>Tên sản phẩm: {detail.name}</Text>
                            <Text style={{ color: 'black', fontSize: 15 }}>Giá: {detail.price}</Text>
                            <Text style={{ color: 'black', fontSize: 15 }}>Xuất xứ: {detail.origin}</Text>
                            <Text style={{ color: 'black', fontSize: 15 }}>Số lượng: {detail.quantity}</Text>
                        </View>

                    </View>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalUpdate}
                onRequestClose={() => {
                    setModalUpdate(!modalUpdate)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Sửa sản phẩm</Text>
                        <View style={{ marginTop: 10 }}>
                            <TextInput defaultValue={itemUpdate.name} style={styles.input} placeholder='Tên sản phẩm' onChangeText={(txt) => setName(txt)} />
                            <TextInput defaultValue={itemUpdate.price} style={styles.input} placeholder='Giá sản phẩm' onChangeText={(txt) => setPrice(txt)} />
                            <TextInput defaultValue={itemUpdate.origin} style={styles.input} placeholder='Xuất sứ ' onChangeText={(txt) => setOrigin(txt)} />
                            <TextInput defaultValue={itemUpdate.quantity} style={styles.input} placeholder='Số lượng' onChangeText={(txt) => setQuantity(txt)} />
                            <TextInput defaultValue={itemUpdate.img} style={styles.input} placeholder='Ảnh' onChangeText={(txt) => setImg(txt)} />
                        </View>
                        <TouchableOpacity onPress={() => { btnUpdate(itemUpdate.id) }} style={[styles.btn, { paddingVertical: 6, alignItems: 'center', justifyContent: 'center', marginHorizontal: 40 }]}>
                            <Text style={styles.text_btn}>Sửa</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAdd}
                onRequestClose={() => {
                    setModalAdd(!modalAdd)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Thêm sản phẩm</Text>
                        <View style={{ marginTop: 10 }}>
                            <TextInput style={styles.input} placeholder='Tên sản phẩm' onChangeText={(txt) => setName(txt)} />
                            <TextInput style={styles.input} placeholder='Giá sản phẩm' onChangeText={(txt) => setPrice(txt)} />
                            <TextInput style={styles.input} placeholder='Xuất sứ ' onChangeText={(txt) => setOrigin(txt)} />
                            <TextInput style={styles.input} placeholder='Số lượng' onChangeText={(txt) => setQuantity(txt)} />
                            <TextInput style={styles.input} placeholder='Ảnh' onChangeText={(txt) => setImg(txt)} />
                        </View>
                        <TouchableOpacity onPress={() => {btnAdd() }} style={[styles.btn, { paddingVertical: 6, alignItems: 'center', justifyContent: 'center', marginHorizontal: 40 }]}>
                            <Text style={styles.text_btn}>Sửa</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 6
    },
    product: {
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    img: {
        height: 70,
        width: 70
    },
    btn: {
        backgroundColor: 'blue',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginBottom: 3
    },
    text_btn: {
        color: 'white',
        textAlign: 'center'
    },
    centeredView: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1
    },
    modalView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        marginTop: '85%'
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 5, marginBottom: 6
    }
})

export default HomeScreen