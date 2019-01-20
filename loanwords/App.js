import React, { Component } from "react";
import { View, StatusBar, AppState, AsyncStorage, Text } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { purple } from "./components/common/colors";
import { Constants } from "expo";
import {
  setLocalNotification,
  LOANWORDS_CARDS_STATE_STORAGE_KEY
} from "./utils/helpers";
import { RootNavigator } from "./components/navigators";
//import logger from "redux-logger";

//const middleware = applyMiddleware(logger());

function FlashcardsBar({ backgroundColor, ...props }) {
  return (
    <View
      style={{ backgroundColor: purple, height: Constants.statusBarHeight }}
    >
      <StatusBar translucent backgroundColor={purple} {...props} />
    </View>
  );
}

export default class App extends Component {
  _store = createStore(reducer);
  constructor(props) {
    super(props);
    this.state = {
      isStoreLoading: false,
      store: this._store
    };
  }

  componentWillMount() {
    var self = this;
    AppState.addEventListener("change", this._handleAppStateChange.bind(this));
    this.setState({ isStoreLoading: true });
    AsyncStorage.getItem(LOANWORDS_CARDS_STATE_STORAGE_KEY)
      .then(value => {
        if (value && value.length) {
          let initialStore = JSON.parse(value);
          self.setState({
            store: createStore(reducer, initialStore)
          });
        } else {
          self.setState({ store: this._store });
        }
        self.setState({ isStoreLoading: false });
      })
      .catch(error => {
        console.log(error);
        self.setState({ store: store });
        self.setState({ isStoreLoading: false });
      });
  }

  componentWillUnmount() {
    AppState.removeEventListener(
      "change",
      this._handleAppStateChange.bind(this)
    );
  }

  componentDidMount() {
    // setLocalNotification();
  }

  render() {
    if (this.state.isStoreLoading) {
      return <Text>Loading Store ...</Text>;
    } else {
      return (
        <Provider store={this.state.store}>
          <View style={{ flex: 1 }}>
            <FlashcardsBar backgroundColor={purple} barStyle="light-content" />
            <RootNavigator lang="de" />
          </View>
        </Provider>
      );
    }
  }

  _handleAppStateChange() {
    let storingValue = JSON.stringify(this.state.store.getState());
    AsyncStorage.setItem("completeStore", storingValue);
  }
}
