const button = document.querySelector('button'),
    audio = document.querySelector('audio'),
    a = document.querySelector('a');
function recordMedia() {
    navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
    }).then(stream => {
        var recorder = new MediaRecorder(stream),
            chunks = [];

        recorder.start();
        
        recorder.ondataavailable = function(e){
            chunks.push(e.data);
        };
        recorder.onstop = function(){
            const blob = new Blob(chunks);
            audio.src = URL.createObjectURL(blob);
        }
        button.innerHTML = "Stop";
        button.onclick = function () {
            recorder.stop();
            button.innerHTML = "Start"
            button.onclick = recordMedia;
        }
    })
}