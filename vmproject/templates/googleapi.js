function initMap() {
  var target = document.getElementById('gmap');  
  //マップを生成して表示
  var map = new google.maps.Map(target, {
    center: {lat: 35.681167, lng: 139.767052},
    zoom: 15
  });
  
  const clbutton = document.getElementById('cl');
  //情報ウィンドウのインスタンスの生成
  var infoWindow = new google.maps.InfoWindow; 
  
  //現在地取得ボタンをクリックで動作
  clbutton.addEventListener('click',function(event){
    //ブラウザが Geolocation に対応しているかを判定
    //対応していない場合の処理
    if(!navigator.geolocation){ 
      //情報ウィンドウの位置をマップの中心位置に指定
      infoWindow.setPosition(map.getCenter());
      //情報ウィンドウのコンテンツを設定
      infoWindow.setContent('Geolocation に対応していません。');
      //情報ウィンドウを表示
      infoWindow.open(map);
    }
    
    //ブラウザが対応している場合、position にユーザーの位置情報が入る
    navigator.geolocation.getCurrentPosition(function(position) { 
      //position から緯度経度（ユーザーの位置）のオブジェクトを作成し変数に代入
      var pos = {  
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var map = new google.maps.Map(target, {
        center: pos,
        zoom: 15
      });
      //情報ウィンドウに現在位置を指定
      infoWindow.setPosition(pos);
      //情報ウィンドウのコンテンツを設定
      infoWindow.setContent('今ここ');
      //情報ウィンドウを表示
      infoWindow.open(map);
      //マップの中心位置を指定
      map.setCenter(pos);
      maker_window(map)
    }, function() {  //位置情報の取得をユーザーがブロックした場合のコールバック
      //情報ウィンドウの位置をマップの中心位置に指定
      infoWindow.setPosition(map.getCenter());
      //情報ウィンドウのコンテンツを設定
      infoWindow.setContent('Error: Geolocation が無効です。');
      //情報ウィンドウを表示
      infoWindow.open(map);
    });   
  });
maker_window(map)
search()
}

function search(){
  const address = document.getElementById('searchb');
  address.addEventListener('click',function(event){
    //地図を表示する領域の div 要素のオブジェクトを変数に代入
    target = document.getElementById('gmap'); 
    //HTMLに記載されている住所の取得
    var address = document.getElementById('address').value;
    console.log(address)
    //ジオコーディングのインスタンスの生成
    var geocoder = new google.maps.Geocoder();  
    //geocoder.geocode() にアドレスを渡して、コールバック関数を記述して処理
    geocoder.geocode({ address: address }, function(results, status){
      //ステータスが OK で results[0] が存在すれば、地図を生成
    if (status === 'OK' && results[0]){  
      new google.maps.Map(target, {
        //results[0].geometry.location に緯度・経度のオブジェクトが入っている
        center: results[0].geometry.location,
        zoom: 14
        });
      }else{ 
        //ステータスが OK 以外の場合や results[0] が存在しなければ、アラートを表示して処理を中断
        alert('失敗しました。理由: ' + status);
        return;
      }
    });
  });
}

function maker_window(map) {
  
  map.addListener('click', function(e){
    var marker = new google.maps.Marker({
      position: e.latLng,
      map: this,
      title: e.latLng.toString(),
      animation: google.maps.Animation.DROP
    });  
    
    var infoWindow = new google.maps.InfoWindow({
      content: e.latLng.toString()
    });
    
    marker.addListener('click', function(){
      infoWindow.open(map, marker); //marker の位置に情報ウィンドウを表示
    });
    
    infoWindow.addListener('closeclick', function(){
      marker.setMap(null);  //マーカーを削除
    });
  });
}




