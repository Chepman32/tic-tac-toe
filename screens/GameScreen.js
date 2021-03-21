import React, {Component, useState, useEffect} from 'react';
import Board from '../components/Board';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  Share,
  Vibration,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AwesomeAlert from 'react-native-awesome-alerts';
import { constants } from '../constants/Constants';
import { IMLocalized, init } from '../localization';
import AsyncStorage from '@react-native-community/async-storage';

class Game extends Component {
  constructor(props) {
    super(props);
    init()
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  componentDidMount() {
    init()
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{squares: squares}]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    console.log(this.props.vibration)
    console.log(this.props.vibration)
    this.props.vibration === "On" ? Vibration.vibrate(50) : null
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  newGame() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const showAlert = winner || this.state.stepNumber == 9 ? true : false;
    const title = winner ? IMLocalized("Winner is") + winner + "!" : 'Match tied';

    const moves = history.map((step, move) => {
      // const desc = move ? 'Go to move #' + move : 'Go to game start';
      const desc = `#${move}`;

      if (move === 0) {
        return null;
      } else {
        return (
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: move % 2 == 0 ? '#3333' : '#1b1b1b',
            }}
            key={move}
            onPress={() => {
              this.jumpTo(move);
            }}>
            <Text
              style={{color: move % 2 == 0 ? '#333' : '#b4b4b4', fontSize: 24}}>
              {desc}
            </Text>
          </TouchableOpacity>
        );
      }
    });

    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            IMLocalized('Checkout this awesome Tictactoe Game in') + " Google Play | https://play.google.com/store/apps/developer?id=Anton+Chepur",
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

    let status;
    if (winner) {
      status = `${winner} Won!`;
    } else {
      status = IMLocalized("Player ") + ` ${this.state.xIsNext ? 'X' : 'O'}` + IMLocalized(" turn");
    }

    return (
      <>
        <StatusBar backgroundColor="#1b1b1b" barStyle="light-content" />

        <View style={styles.game}>
          <Icon
            style={styles.menuIcon}
            name="menuunfold"
            size={30}
            color="lightgrey"
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Icon
            style={{position: 'absolute', right: 20, top: 20, zIndex: 999}}
            name="sharealt"
            size={30}
            color="lightgrey"
            onPress={onShare}
          />
          <Text style={styles.status}> {status} </Text>

          <View style={styles.gameBoard}>
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </View>
          <View style={styles.gameInfo}>
            <TouchableOpacity
              style={styles.newGame}
              onPress={() => {
                this.newGame();
              }}>
              <Text style={styles.newText}>{IMLocalized("Reset")} </Text>
            </TouchableOpacity>

            <AwesomeAlert
              cancelButtonStyle={{
                ...styles.newGame,
                backgroundColor: '#1b1b1b',
                width: constants.MAX_WIDTH * 0.5,
              }}
              cancelButtonTextStyle={styles.newText}
              confirmButtonStyle={{
                ...styles.newGame,
                backgroundColor: '#1b1b1b',
                width: constants.MAX_WIDTH * 0.5,
              }}
              confirmButtonTextStyle={styles.newText}
              actionContainerStyle={{flexDirection: 'column'}}
              overlayStyle={{backgroundColor: '#000'}}
              titleStyle={styles.title}
              contentContainerStyle={styles.alert}
              show={showAlert}
              showProgress={false}
              title={title}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText={IMLocalized("New Game")}
              confirmText={IMLocalized("Share")}
              onCancelPressed={() => {
                this.newGame();
              }}
              onConfirmPressed={onShare}
            />
          </View>
          <View
            style={{
              zIndex: 99999,
              position: 'absolute',

              bottom: 0,
              left: 0,
            }}>
            {moves}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  status: {
    color: '#fff',
    marginVertical: 10,
    fontSize: constants.MAX_WIDTH * 0.08,
  },
  game: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  gameInfo: {
    color: '#fff',
    marginLeft: 20,
  },
  newGame: {
    backgroundColor: '#1b1b1b',
    height: constants.MAX_HEIGHT * 0.08,
    borderRadius: constants.MAX_HEIGHT * 0.042,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newText: {
    width: constants.MAX_WIDTH,
    textAlign: "center",
    fontSize: constants.MAX_HEIGHT * 0.04,
    color: 'lightgrey',
  },
  menuIcon: {
    position: 'absolute',
    top: constants.MAX_HEIGHT * 0.04,
    left: constants.MAX_HEIGHT * 0.03,
    // backgroundColor: '#000',
    // color: '#fff',
    zIndex: 999,
  },
  alert: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    flexDirection: 'column',
  },
  title: {
    fontSize: constants.MAX_HEIGHT * 0.05,
    textAlign: "center",
    color: '#fff',
  },
});

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default function GameScreenContainer({navigation}, {route}) {
  init()
  const [getValue, setGetValue] = useState(false);
  useEffect(() => {
    getValueFunction()
    
  })
  useEffect(() => {
    getValueFunction()
    console.log("route", route)
  }, [])
  const getValueFunction = () => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem('any_key_here').then(
      (value) => {
        //AsyncStorage returns a promise so adding a callback to get the value
        setGetValue(value)
      //Setting the value in Text
      console.log("getValueFunction", value)
      }
    );
  };
  return (
    <Game GameScreen {...{navigation}} vibration={getValue} />
  );
}