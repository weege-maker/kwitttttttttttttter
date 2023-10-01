const firebaseConfig = {
    apiKey: "AIzaSyCuw_GLHy-OZFajrFXRwUwZ6dTmX-KXKeo",
    authDomain: "kiter-31882.firebaseapp.com",
    databaseURL: "https://kiter-31882-default-rtdb.firebaseio.com",
    projectId: "kiter-31882",
    storageBucket: "kiter-31882.appspot.com",
    messagingSenderId: "92449286924",
    appId: "1:92449286924:web:d4e71c19b5bf712904b729"
  };
  firebase.initializeApp(firebaseConfig);
 
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");




//document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!" + "Bienvenido a la sala: " + room_name;

function send (){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like:0
    });
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;


                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log ("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById (button_id).value;
    update_like = Number(likes) + 1 ;
    console.log(update_like);

    firebase.database().ref(room_name).child(message_id).update({
        like: update_like
        });
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html")
}