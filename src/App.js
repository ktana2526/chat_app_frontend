import React,{Component} from 'react';
import axios from 'axios';
import moment from 'moment-timezone'

// バックエンドサーバのURL(環境変数)
const server = process.env.REACT_APP_BACKEND_SERVER;

class App extends Component {
  // コンストラクタ
  constructor(){
    super();
    this.state = {
      inputText: '', // テキストボックスの入力値(変更時に即時反映)
      messages: [], // 送受信したメッセージの出力用リスト
    }
  }

  // テキストボックスの値変更時のイベントハンドラ
  handleInputChange = (event) => {
    this.setState({inputText:event.target.value}) // テキストボックスの変更を検知すると即時stateを更新
  }

  // 送信ボタンクリック時のイベントハンドラ
  handleSendClick = (event) => {
      const params = new URLSearchParams();
      params.append( 'user_input', this.state.inputText); // テキストボックスの入力値をuser_inputに設定

      const newResponses = this.state.messages.slice();
      newResponses.push(moment().tz("Asia/Tokyo").format('hh:mm:ss') +' You > ' + this.state.inputText); // 送信メッセージを出力用リストに追加
      this.setState({messages : newResponses})

      axios.post(server + '/chat',params) // バックエンドサーバに送信(/chat)
        .then((res) => {　// 受信成功時

          const newResponses = this.state.messages.slice();
          newResponses.push(moment(Date.parse(res.data.response_timestamp)).format('hh:mm:ss') + ' Bot > ' + res.data.bot_response);  // 受信メッセージを出力用リストに追加
          this.setState({messages : newResponses})

        })
        .catch(()=>{ // 受信失敗時
          const newResponses = this.state.messages.slice();
          newResponses.push(moment().tz("Asia/Tokyo").format('hh:mm:ss') + ' Err > エラー発生(chatメッセージ送受信)');  // エラーメッセージを出力用リストに追加
          this.setState({messages : newResponses})
        });　
  }

  // クリアボタンクリック時のイベントハンドラ
  handleClearClick = (event) => {
      this.setState({messages : []}) // 出力用リストをクリア
  }

  // 履歴取得ボタンクリック時のイベントハンドラ
  handleHistoryClick = (event) => {
      axios.get(server + '/history/list') // バックエンドサーバに送信(/history/list)
        .then((res) => {　// 受信成功時

          const newResponses = this.state.messages.slice();

          res.data.forEach(item => {
            newResponses.push(moment(Date.parse(item.response_timestamp)).format('hh:mm:ss') + ' You(history) > ' + item.user_input);  // 履歴(送信メッセージ)を出力用リストに追加
            newResponses.push(moment(Date.parse(item.response_timestamp)).format('hh:mm:ss') + ' Bot(history) > ' + item.bot_response);  // 履歴(受信メッセージ)を出力用リストに追加
          });

          this.setState({messages : newResponses})

        })
        .catch(()=>{ // 受信失敗時
          const newResponses = this.state.messages.slice();
          newResponses.push(moment().tz("Asia/Tokyo").format('hh:mm:ss') + ' Err > エラー発生(履歴取得)');  // エラーメッセージを出力用リストに追加
          this.setState({messages : newResponses})
        });　
  }

  // 履歴削除ボタンクリック時のイベントハンドラ
  handleHistoryDeleteClick = (event) => {
      axios.get(server + '/history/delete') // バックエンドサーバに送信(history/delete)
        .then((res) => {　// 受信成功時
          const newResponses = this.state.messages.slice();
          newResponses.push(moment().tz("Asia/Tokyo").format('hh:mm:ss') +' Ope > 履歴を削除しました。(' + res.data.row_count + '件)');
          this.setState({messages : newResponses})
        })
        .catch(()=>{ // 受信失敗時
          const newResponses = this.state.messages.slice();
          newResponses.push(moment().tz("Asia/Tokyo").format('hh:mm:ss') + ' Err > エラー発生(履歴削除)');  // エラーメッセージを出力用リストに追加
          this.setState({messages : newResponses})
        });　
  }

  // 描画処理
  render = () => {
    const messageList = [];
    for(let i in this.state.messages){
        // stateのメッセージの送受信履歴を全て出力用リストに追加
        messageList.push(<div key={i}>{this.state.messages[i]}</div>)
    }

    return (
      <div>
        <input type='text' style={{margin: '5px'}} value={this.state.inputText} onChange={this.handleInputChange}/>{/*テキストボックス*/}
        <button onClick={this.handleSendClick}>送信</button> {/*送信ボタン*/}
        <button onClick={this.handleClearClick}>クリア</button> {/*クリアボタン*/}
        <button onClick={this.handleHistoryClick}>履歴取得</button> {/*履歴取得ボタン*/}
        <button onClick={this.handleHistoryDeleteClick}>履歴削除</button> {/*履歴削除ボタン*/}
        {messageList} {/*メッセージの送受信履歴*/}
      </div>
    );
  }
}

export default App;
