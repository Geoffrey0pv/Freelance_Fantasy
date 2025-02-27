$(function(){

    console.log('Archivo chat.js cargado');

    console.log(user, room_id)

    var url = 'ws://' + window.location.host + '/ws/room/' + room_id + '/'
    console.log(url)

    var chatSocket = new WebSocket(url)
    console.log(chatSocket)

    chatSocket.onopen = function(e){
        console.log('WEBSOCKET ABIERTO')
    }

    chatSocket.onclose = function(e){
        console.log('WEBSOCKET CERRADO')
    }

    chatSocket.onmessage = function(data) {
        const datamsj = JSON.parse(data.data);
        if (datamsj.connected_users) {
            updateUserList(datamsj.connected_users);
        } else if (datamsj.messages) {
            // Cargar los mensajes existentes
            loadExistingMessages(datamsj.messages);
        } else {
            // Manejar el mensaje del chat
            var msj = datamsj.message;
            var username = datamsj.username;
            var datetime = datamsj.datetime;

            document.querySelector('#boxMessages').innerHTML += `
                <div class="alert alert-success" role="alert">
                    ${msj}
                    <div>
                        <small class="fst-italic fw-bold">${username}</small>
                        <small class="float-end">${datetime}</small>
                    </div>
                </div>
            `;
        }
    }

    function loadExistingMessages(messages) {
        messages.forEach(msg => {
            document.querySelector('#boxMessages').innerHTML += `
                <div class="alert alert-success" role="alert">
                    ${msg.message}
                    <div>
                        <small class="fst-italic fw-bold">${msg.username}</small>
                        <small class="float-end">${msg.datetime}</small>
                    </div>
                </div>
            `;
        });
    }

    document.querySelector('#btnMessage').addEventListener('click', sendMessage)
    document.querySelector('#inputMessage').addEventListener('keypress', function(e){
        if(e.keyCode == 13){
            sendMessage()
        }
    })

    function sendMessage(){
        var message = document.querySelector('#inputMessage')

        if(message.value.trim() !== ''){
            loadMessageHTML(message.value.trim())
            chatSocket.send(JSON.stringify({
                message: message.value.trim(),
            }))

            console.log(message.value.trim())

            message.value = ''
        } else {
            console.log('Envió un mensaje vacío')
        }
    }

    function loadMessageHTML(m){
        var currentDatetime = new Date();
        var dateObject = new Date(currentDatetime)

        var year = dateObject.getFullYear();
        var month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
        var day = ('0' + dateObject.getDate()).slice(-2);
        var hours = ('0' + dateObject.getHours()).slice(-2);
        var minutes = ('0' + dateObject.getMinutes()).slice(-2);
        var seconds = ('0' + dateObject.getSeconds()).slice(-2);

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

        document.querySelector('#boxMessages').innerHTML +=
        `
        <div class="alert alert-primary" role="alert">
            ${m}
            <div>
                <small class="fst-italic fw-bold">${user}</small>
                <small class="float-end">${formattedDate}</small>
            </div>
        </div>
        `
    }

    function updateUserList(users) {
        const userList = document.querySelector('#userList');
        userList.innerHTML = ''; // Limpiar la lista actual
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = user; // Agrega el nombre de usuario
            userList.appendChild(li);
        });
    }

})







