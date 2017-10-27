import React from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { Container, Grid, Card, CardItem, Text, View } from "native-base";
import { connect } from "react-redux";
import { capitalize, size, toInteger } from "lodash";
import { bindActionCreators } from "redux";

import Isloading from "../isloading";
import IsConnected from "../isConnected";
import HeaderApp from "../header";
import { getData } from "../../api";
import { checkConnectedDataThunk } from "../../redux/actions/connectedActions";
import styles from "../../../assets/css/styles";

import { AdMobBanner_AdMob } from "../admob";

class FlatListItem extends React.Component {
    render() {
        return (
            <Grid style={{ marginHorizontal: 5 }}>
                <Card>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Detail', { url: this.props.item.url, name: capitalize(this.props.item.name) }) }} >
                        <CardItem style={{ justifyContent: "center" }}>
                            <Image square source={{ uri: this.props.item.image }} style={[styles.imagehome]} />
                        </CardItem>
                    </TouchableOpacity>
                </Card>
            </Grid>
        );
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isReady: false,
            data: [],

        };
        this.props.checkConnectedDataThunk();
    }

    componentWillMount() {
        getData(this.props.apiurl).then((temp) => {
            this.setState({
                data: temp,
                isReady: true
            });
        });

    }

    _onRefresh() {
        this.setState({
            refreshing: true,
        });

        getData(this.props.apiurl).then((temp) => {
            this.setState({
                data: temp,
                refreshing: false
            });
        });

    }
    render() {
        const { navigate } = this.props.navigation;
        const { month, isConnected } = this.props;
        const title_menu = "Mã giám giá tháng " + month;
        if (!isConnected) {
            return (<IsConnected navigation={this.props.navigation} menuleft="0" menuright="0" menutitle={title_menu} />);
        }

        if (!this.state.isReady) {
            return (<Isloading navigation={this.props.navigation} menuleft="0" menuright="0" menutitle={title_menu} />);
        }

        return (
            <Container>
                <HeaderApp navigation={this.props.navigation} menuleft="0" menuright="0" menutitle={title_menu} />

                <FlatList
                    style={{ marginVertical: 10 }}
                    data={this.state.data}
                    renderItem={
                        ({ item, index }) => {
                            return (
                                <FlatListItem item={item} index={index} total={toInteger(size(this.state.data) / 2)} navigation={this.props.navigation} />
                            )
                        }
                    }

                    keyExtractor={item => item.id}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    horizontal={false}
                    numColumns={2}
                    ListFooterComponent={
                        <AdMobBanner_AdMob bannerSize="fullBanner" />
                    }
                    ListHeaderComponent={
                        <AdMobBanner_AdMob bannerSize="fullBanner" />
                    }
                />

            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        apiurl: state.ApiUrl,
        month: state.today.month,
        isConnected: state.isConnected.isConnected
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ checkConnectedDataThunk: checkConnectedDataThunk }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);