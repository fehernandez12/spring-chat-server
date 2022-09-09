var stompClient = null;
var readerResult = null;

const setConnected = (connected, user) => {
    document.getElementById('announcement').innerText = `${user} se ha unido al chat.`;
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('announcement').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('conversation').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
    var imageInput= document.getElementById('image');
    imageInput.onchange = () => getBase64(imageInput.files[0]);
};

const connect = () => {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    const user = document.getElementById('from').value;
    (user.length > 0 && stompClient.connect({}, (frame) => {
        setConnected(true, user);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', (messageOutput) => {
            console.log(readerResult);
            showMessageOutput(JSON.parse(messageOutput.body), readerResult);
        });
    })) || Swal.fire({
        title: '¡Cuidado!',
        text: 'El nombre no puede estar vacío, manco.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
};

const disconnect = () => {
    if (stompClient != null) {
        stompClient.disconnect();
        Swal.fire({
            title: '¡Genial!',
            text: 'Te has desconectado exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
    setConnected(false);
    console.log('Disconnected!');
};

const sendMessage = () => {
    var from = document.getElementById('from').value;
    var text = document.getElementById('text').value;
    (text.length == 0 && Swal.fire({
        title: '¡Cuidado!',
        text: 'El mensaje no puede estar vacío, manco.',
        icon: 'error',
        confirmButtonText: 'OK'
    })) || stompClient.send("/app/chat", {}, JSON.stringify({'from':from, 'text':text, 'image': readerResult }));
    document.getElementById('text').value = '';
};

const showMessageOutput = (messageOutput, image) => {
    console.log(image);
    var response = document.getElementById('response');
    var messageDiv = document.createElement('div');
    messageDiv.classList.add(['alert']);
    messageDiv.classList.add(['alert-dark']);
    messageDiv.style.wordWrap = 'break-word';
    messageDiv.appendChild(createMessageNode(messageOutput.from, messageOutput.text, messageOutput.time, image));
    response.appendChild(messageDiv);
}

const createMessageNode = (from, text, time, image) => {
    var messageNode = document.createElement('span');
    messageNode.innerHTML = `<b>${from}:</b> ${text}<br/><small>${time}</small>${(image && `<br><img src="${image}" alt="Imagen" />`) || ''}`;
    return messageNode;
}

const getBase64 = (file) => {
    Swal.fire({
        timer: 2000,
        timerProgressBar: true,
        title: '¡Un momento!',
        text: 'Estoy cargando la imagen...',
        icon: 'info',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: false
    });
    var reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
            readerResult = reader.result;
            document.getElementById('disconnect').disabled = false;
        };
        reader.onerror = (error) => {
            console.log(error);
            document.getElementById('disconnect').disabled = false;
        };
    }

}