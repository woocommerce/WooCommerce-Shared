import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator, AppRegistry,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type ShippingZone = {
    id: number;
    title: string;
    locations: ShippingZoneLocation[];
    methods: ShippingZoneMethod[];
};

type ShippingZoneLocation = {
    code: string;
    type: string;
};

type ShippingZoneMethod = {
    id: number;
    title: string;
    description: string;
};

type RowProps = {
    title: string;
    body: string;
    caption: string;
};

function Row(props: RowProps): JSX.Element {
    return (
        <View style={styles.row}>
            <Text style={styles.row.title}> {props.title} </Text>
            <Text style={styles.row.body}> {props.body} </Text>
            <Text style={styles.row.caption}> {props.caption} </Text>
        </View>
    );
}

const App = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<ShippingZone[]>([]);

    const fetchData = async () => {
        setLoading(true);

        const zones = await getShippingZones();
        const locations = await getShippingZoneLocations();
        const methods = await getShippingZoneMethods();

        const fullZones = zones.map(zone => {
            return {
                ...zone,
                locations: locations,
                methods: methods,
            };
        });

        setLoading(false);
        setData(fullZones);
    };

    const getShippingZones = async () => {
        try {
            const url = `https://public-api.wordpress.com/rest/v1.1/jetpack-blogs/${props["blogId"]}/rest-api/?path=/wc/v3/shipping/zones`
            const response = await fetch(
                url, {
                    headers: {
                        'Authorization': `Bearer ${props["token"]}`,
                    },
                }
            );
            const json = await response.json();
            const zones: ShippingZone[] = json.data.map(obj => {
                return {
                    id: obj.id,
                    title: obj.name,
                    locations: [],
                    methods: [],
                };
            });
            return zones;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getShippingZoneLocations = async () => {
        try {
            const response = await fetch(
                'https://my-json-server.typicode.com/wzieba/FakeShipping/zone_locations',
            );
            const json = await response.json();
            const locations: ShippingZoneLocation[] = json.map(obj => {
                return {
                    code: obj.code,
                    type: obj.type,
                };
            });
            return locations;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getShippingZoneMethods = async () => {
        try {
            const response = await fetch(
                'https://my-json-server.typicode.com/wzieba/FakeShipping/zone_methods',
            );
            const json = await response.json();
            const methods: ShippingZoneMethod[] = json.map(obj => {
                return {
                    id: obj.method_id,
                    title: obj.method_title,
                    description: obj.method_description,
                };
            });
            return methods;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <SafeAreaView>
                    <ActivityIndicator/>
                </SafeAreaView>
            ) : (
                <FlatList
                    contentInsetAdjustmentBehavior="always"
                    style={styles.list}
                    data={data}
                    renderItem={({item}) => (
                        <Row
                            title={item.title}
                            body={item.locations.map(location => location.code).join(' - ')}
                            caption={item.methods.map(method => method.title).join(' - ')}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        backgroundColor: 'rgb(246, 247, 247)',
    },
    row: {
        padding: 16,
        fontSize: 23,
        borderRadius: 16,
        backgroundColor: 'white',
        margin: 16,
        marginTop: 0,
        title: {
            fontFamily: 'System',
            fontSize: 17,
            marginBottom: 4,
            color: 'rgb(0, 0, 0)',
        },
        body: {
            fontFamily: 'System',
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.6)',
        },
        caption: {
            fontFamily: 'System',
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.6)',
        },
    },
});

export default App;
AppRegistry.registerComponent('main', () => App);


