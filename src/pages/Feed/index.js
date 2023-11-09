import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome"; //importar icones da rede
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from '@react-navigation/native';
import { styles } from '../Feed/styleFeed.js'
import { useMeuContexto } from '../Contexto/index.js';
import MenuBar from '../Feed/MenuBar.js'; // Import the MenuBar component


const Stack = createNativeStackNavigator();
////Navegação entre Telas\\\\
export default function Feed() {

    return (

        <Stack.Navigator>
            <Stack.Screen
                name="Body" component={Body}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="App" component={App}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MostrarPlanta" component={MostrarPlanta}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}
////Fim da Navegação entre Telas\\\\


////App Da Tela de Feed\\\\
export function App() {

    const navigation = useNavigation()
    const [mostrarinforma, setMostrarinforma] = useState(<Body />);

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.ScrollTamanho}>
                {mostrarinforma}
            </ScrollView>
            <Footer />
            <StatusBar style="auto" />
        </View>
    );
}
////Fim do App Da Tela de Feed\\\\


////Body da Tela de Feed\\\\
function Body() {

    const navigation = useNavigation()
    const { plantInfo } = useMeuContexto();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (

        <View style={styles.container}>

            <View style={styles.Header}>
                <View style={styles.iconsHeader}>
                    <TouchableOpacity onPress={toggleMenu}>
                        <Image
                            source={require('./../../../src/Icons/navegacao.png')} style={{ width: 50, height: 50 }}
                        />
                        {/* < FontAwesome
                            name='bars'
                            size={45}
                            color='#8b8a7a'
                        /> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                        <Image
                            source={require('./../../../src/Icons/usuario.png')} style={{ width: 50, height: 50 }}
                        />
                    </TouchableOpacity>
                </View>
            </View >

            <ScrollView style={styles.ScrollTamanho}>

                <View style={styles.Body}>

                    <ScrollView contentContainerStyle={styles.grid}>

                        {plantInfo.map((objPlanta, index) => (

                            <View style={styles.card} key={index}>
                                <View style={{justifyContent: 'space-around', width:"100%"}}>


                                    <View style={{ flexDirection: 'row', alignItems:'center' }}>


                                        <View style={styles.principalImage}>
                                            <View style={styles.image}>
                                                <Image
                                                    style={styles.plantas}
                                                    source={objPlanta.imagensUm}
                                                />
                                            </View>
                                        </View>


                                        <View style={styles.elementos}>

                                            <View style={styles.nomePlanta}>
                                                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#8b8a7a', marginTop: 10, marginRight: 45 }}>{objPlanta.titulo}</Text>
                                            </View>
                                            <View style={styles.descricao}>
                                                <Text style={{ fontSize: 14, color: '#8b8a7a', marginTop: 5, marginRight: 30 }}>{objPlanta.sobre}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.principalBtn}>
                                        <View style={styles.btn}>
                                            <TouchableOpacity onPress={() => {
                                                // setId(objPlanta.id)
                                                // navigation.navigate('MostrarPlanta')
                                                navigation.navigate('MostrarPlanta', { id: objPlanta.id });
                                            }}>
                                                <FontAwesome
                                                    name='plus'
                                                    size={25}
                                                    color='white'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>


                                <View style={styles.linha}></View>
                            </View>

                        ))}

                    </ScrollView>

                </View>

            </ScrollView>

            {isMenuOpen && <MenuBar onCloseMenu={toggleMenu} />}

            <View style={styles.Footer}>

                <View style={styles.footerEsquerda}>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <Image
                            source={require('./../../../src/Icons/pesquisar.png')} style={{ width: 60, height: 60 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.footerMeio}>
                    <TouchableOpacity onPress={() => navigation.navigate('Feed')} style={{ marginTop: 10 }}>
                        <Image
                            source={require('./../../../src/Icons/feed.png')} style={{ width: 68, height: 68 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.footerDireita}>
                    <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}>
                        <Image
                            source={require('./../../../src/Icons/favoritos.png')} style={{ width: 60, height: 60 }}
                        />
                    </TouchableOpacity>
                </View>

            </View>

        </View>

    );
}
////Fim da Tela de Feed\\\\



////Tela de Informativo-Função para Mostrar toda tela ao clicar nos Botões da Tela de Feed\\\\
function MostrarPlanta() {

    const { plantInfo, plantFavoritos } = useMeuContexto();

    function favoritarPlantas() {

        plantFavoritos.push(planta)

    }

    const route = useRoute();
    const idEscolhido = route.params.id;
    const planta = plantInfo.find((planta) => planta.id === idEscolhido);

    const { titulo, sobre, luz, agua, fertilizante, origem, imagemUm, imagemDois, id } = planta;

    console.log(titulo)

    console.log(idEscolhido)
    const navigation = useNavigation()

    // for (let index = 0; index < plantInfo.length; index++) {
    //     if (plantInfo[index].id == id) {
    //         setPlanta(plantInfo[index])

    //     }

    // }

    const handleNavigateToFeed = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Feed' }]

        });
    };

    return (

        <View style={styles.container}>
            <View style={styles.Header}>
                <View style={styles.iconsHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <Image
                            source={require('./../../../src/Icons/navegacao.png')} style={{ width: 50, height: 50 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                        <Image
                            source={require('./../../../src/Icons/usuario.png')} style={{ width: 50, height: 50 }}
                        />
                    </TouchableOpacity>
                </View>
            </View >
            <ScrollView style={styles.ScrollTamanho}>
                <View style={styles.Body}>
                    <View style={styles.conteudo}>
                        <View style={styles.HeaderBody}>
                            <View style={styles.HeaderBodyEsquerda}>
                                <View style={styles.HeaderBodyImagemUm}>
                                    <View style={styles.imagemUm}>
                                        <Image
                                            source={planta.imagensUm}
                                            style={{ width: '100%', height: '100%', borderRadius: 17, }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.HeaderBodyTituloPlanta}>
                                    <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#8b8a7a' }}>{titulo}</Text>
                                </View>
                            </View>
                            <View style={styles.HeaderBodyDireita}>
                                <View style={styles.imagemDois}>
                                    <Image
                                        source={planta.imagensDois}
                                        style={{ width: '100%', height: '100%', borderRadius: 17, }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.DivInforma}>
                            <View style={styles.emoji}>
                                <Text style={{ fontSize: 35 }}>☀️</Text>
                            </View>
                            <View style={styles.InformaTextoDiv}>
                                <Text>
                                    <Text style={styles.tituloDescricao}>LUZ: </Text>
                                    <Text style={styles.TextoDescricao}>{planta.luz}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.linha}></View>
                        <View style={styles.DivInforma}>
                            <View style={styles.emoji}>
                                <Text style={{ fontSize: 35 }}>💧</Text>
                            </View>
                            <View style={styles.InformaTextoDiv}>
                                <Text>
                                    <Text style={styles.tituloDescricao}>ÁGUA: </Text>
                                    <Text style={styles.TextoDescricao}>{planta.agua}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.linha}></View>
                        <View style={styles.DivInforma}>
                            <View style={styles.emoji}>
                                <Text style={{ fontSize: 35 }}>🌱</Text>
                            </View>
                            <View style={styles.InformaTextoDiv}>
                                <Text>
                                    <Text style={styles.tituloDescricao}>FERTILIZANTE: </Text>
                                    <Text style={styles.TextoDescricao}>{planta.fertilizante}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.linha}></View>
                        <View style={styles.DivInforma}>
                            <View style={styles.emoji}>
                                <Text style={{ fontSize: 35 }}>📍</Text>
                            </View>
                            <View style={styles.InformaTextoDiv}>
                                <Text>
                                    <Text style={styles.tituloDescricao}>ORIGEM: </Text>
                                    <Text style={styles.TextoDescricao}>{planta.origem}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.linha}></View>
                        <View style={styles.DivBotao}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: '#eaead4', justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity onPress={favoritarPlantas}>

                                    <View style={{ width: 135, height: 45, backgroundColor: '#24c28d', borderRadius: 20, justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ fontSize: 22, color: 'white', marginBottom: 5, }}> + Favoritar </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.Footer}>
                <View style={styles.footerEsquerda}>
                    <TouchableOpacity onPress={handleNavigateToFeed}>
                        <Image
                            source={require('./../../../src/Icons/voltar.png')} style={{ width: 60, height: 60 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.footerMeio}>
                    <TouchableOpacity onPress={() => navigation.navigate('Feed')} style={{ marginTop: 10 }}>
                        <Image
                            source={require('./../../../src/Icons/feed.png')} style={{ width: 68, height: 68 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.footerDireita}>
                    <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}>
                        <Image
                            source={require('./../../../src/Icons/favoritos.png')} style={{ width: 60, height: 60 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
////Fim da Função MostrarPlanta\\\\