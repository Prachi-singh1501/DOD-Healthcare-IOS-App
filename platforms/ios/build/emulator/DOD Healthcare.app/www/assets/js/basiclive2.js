﻿// Create Agora client
var client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// RTM Global Vars
var isLoggedIn = false;

var localTracks = {
    videoTrack: null,
    audioTrack: null
};
var remoteUsers = {};
// Agora client options
var options = {
    appid: null,
    channel: null,
    uid: null,
    token: null,
    accountName: null
};

$("#join-form").submit(async function (e) {
    e.preventDefault();
    $("#join").attr("disabled", true);
    try {
        options.appid = $("#appid").val();
        options.token = $("#token").val();
        options.channel = $("#channel").val();
        options.accountName = $('#accountName').val();
        var apptype = $("#SessionAppType").val();

        
        await join(apptype);


    } catch (error) {
        console.error(error);
    } finally {
        $("#leave").attr("disabled", false);
    }
})

async function JoinBtn() {
    //alert("click");
    $("#join").attr("disabled", true);
    try {
        options.appid = $("#appid").val();
        options.token = $("#token").val();
        options.channel = $("#channel").val();
        options.accountName = $('#accountName').val();
        var apptype = $("#SessionAppType").val();
        console.log(options);
        console.log(apptype);
        await join(apptype);
    } catch (error) {
        console.error(error);
    } finally {
        $("#leave").attr("disabled", false);
    }
}


$("#join").click(function (e) {
    //alert("click");
    $("#join").attr("disabled", true);
    try {
        options.appid = $("#appid").val();
        options.token = $("#token").val();
        options.channel = $("#channel").val();
        options.accountName = $('#accountName').val();
        var apptype = $("#SessionAppType").val();
        console.log(options);
        console.log(apptype);
         join(apptype);
    } catch (error) {
        console.error(error);
    } finally {
        $("#leave").attr("disabled", false);
    }

})



$("#leave").click(function (e) {
    leave();
})

async function join(apptype) {
    //alert(apptype);
    $("#mic-btn").prop("disabled", false);
    $("#video-btn").prop("disabled", false);

    var apptype = $("#SessionAppType").val();
    if (apptype.includes("Video")) {
        $("#remote-playerlist").removeAttr('style');
        RTMJoin();
        // add event listener to play remote tracks when remote user publishs.
        client.on("user-published", handleUserPublished);
        client.on("user-left", handleUserLeft);
        // join a channel and create local tracks, we can use Promise.all to run them concurrently
        [options.uid, localTracks.audioTrack, localTracks.videoTrack] = await Promise.all([
            // join the channel
            client.join(options.appid, options.channel, options.token || null),
            // create local tracks, using microphone and camera
            AgoraRTC.createMicrophoneAudioTrack(
                { AEC: true, ANS: true }
            ),
            AgoraRTC.createCameraVideoTrack()
        ]);
        // play local video track
        localTracks.videoTrack.play("local-player");
        $("#local-player-name").text(`localVideo(${options.uid
            })`);
        // publish local tracks to channel
        await client.publish(Object.values(localTracks));
        console.log("publish success");
    }
    else {
        RTMJoin();
        // add event listener to play remote tracks when remote user publishs.
        client.on("user-published", handleUserPublished);
        client.on("user-left", handleUserLeft);
        // join a channel and create local tracks, we can use Promise.all to run them concurrently
        [options.uid, localTracks.audioTrack, localTracks.videoTrack] = await Promise.all([
            // join the channel
            client.join(options.appid, options.channel, options.token || null),
            // create local tracks, using microphone and camera
            AgoraRTC.createMicrophoneAudioTrack(
                { AEC: true, ANS: true }
            ),
            AgoraRTC.createCameraVideoTrack()
        ]);
        // play local video track
        localTracks.videoTrack.play("local-player");
        $("#local-player-name").text(`localVideo(${options.uid
            })`);
        // publish local tracks to channel
        await client.publish(Object.values(localTracks));
        console.log("publish success");
        $("#video-btn").parent().hide();
        var track = localTracks.videoTrack;
        track.stop();
        track.close();
        localTracks.videoTrack = undefined;
        $("#local-player").css('background', 'url(../../Content/website_assets/img/videocall_background.png)');
        $("#local-player").css('background-position', 'bottom');
        $("#local-player").css('background-size', 'cover');
        $("#local-player").css('border-radius', '10px');

    }



    if (apptype.includes('Audio')) {
        console.log("Start Audio");


    }

}
async function leave() {
    for (trackName in localTracks) {
        var track = localTracks[trackName];
        console.log(track);
        if (track) {
            track.stop();
            track.close();
            $('#mic-btn').prop('disabled', true);
            $('#video-btn').prop('disabled', true);
            localTracks[trackName] = undefined;
            //window.location.href = "../Dashboard";

            app.router.navigate('/home/', { reloadAll: true });

        }
    }
    // remove remote users and player views
    remoteUsers = {};
    $("#remote-playerlist").html("");
    // leave the channel
    await client.leave();
    $("#local-player-name").text("");
    $("#join").attr("disabled", false);
    $("#leave").attr("disabled", true);
    console.log("client leaves channel success");
}

async function RTMJoin() { // Create Agora RTM client
    const clientRTM = AgoraRTM.createInstance($("#appid").val(), { enableLogUpload: false });
    var accountName = $('#accountName').val();
    // Login
    clientRTM.login({ uid: accountName }).then(() => {
        console.log('AgoraRTM client login success. Username: ' + accountName);
        isLoggedIn = true;
        // RTM Channel Join
        var channelName = $('#channel').val();
        channel = clientRTM.createChannel(channelName);
        channel.join().then(() => {
            console.log('AgoraRTM client channel join success.');
            // Get all members in RTM Channel
            channel.getMembers().then((memberNames) => {
                console.log("------------------------------");
                console.log("All members in the channel are as follows: ");
                console.log(memberNames);
                var newHTML = $.map(memberNames, function (singleMember) {
                    if (singleMember != accountName) {
                        return (`<li class="mt-2">
                  <div class="row">
                      <p>${singleMember}</p>
                   </div>
                   <div class="mb-4">
                     <button class="text-white btn btn-control mx-3 remoteMicrophone micOn" id="remoteAudio-${singleMember}">Toggle Mic</button>
                     <button class="text-white btn btn-control remoteCamera camOn" id="remoteVideo-${singleMember}">Toggle Video</button>
                    </div>
                 </li>`);
                    }
                });
                $("#insert-all-users").html(newHTML.join(""));
            });
            // Send peer-to-peer message for audio muting and unmuting
            $(document).on('click', '.remoteMicrophone', function () {
                fullDivId = $(this).attr('id');
                peerId = fullDivId.substring(fullDivId.indexOf("-") + 1);
                console.log("Remote microphone button pressed.");
                let peerMessage = "audio";
                clientRTM.sendMessageToPeer({
                    text: peerMessage
                }, peerId).then(sendResult => {
                    if (sendResult.hasPeerReceived) {
                        console.log("Message has been received by: " + peerId + " Message: " + peerMessage);
                    } else {
                        console.log("Message sent to: " + peerId + " Message: " + peerMessage);
                    }
                })
            });
            // Send peer-to-peer message for video muting and unmuting
            $(document).on('click', '.remoteCamera', function () {
                fullDivId = $(this).attr('id');
                peerId = fullDivId.substring(fullDivId.indexOf("-") + 1);
                console.log("Remote video button pressed.");
                let peerMessage = "video";
                clientRTM.sendMessageToPeer({
                    text: peerMessage
                }, peerId).then(sendResult => {
                    if (sendResult.hasPeerReceived) {
                        console.log("Message has been received by: " + peerId + " Message: " + peerMessage);
                    } else {
                        console.log("Message sent to: " + peerId + " Message: " + peerMessage);
                    }
                })
            });
            // Display messages from peer
            clientRTM.on('MessageFromPeer', function ({
                text
            }, peerId) {
                console.log(peerId + " muted/unmuted your " + text);
                if (text == "audio") {
                    console.log("Remote video toggle reached with " + peerId);
                    if ($("#remoteAudio-" + peerId).hasClass('micOn')) {
                        localTracks.audioTrack.setEnabled(false);
                        console.log("Remote Audio Muted for: " + peerId);
                        $("#remoteAudio-" + peerId).removeClass('micOn');
                    } else {
                        localTracks.audioTrack.setEnabled(true);
                        console.log("Remote Audio Unmuted for: " + peerId);
                        $("#remoteAudio-" + peerId).addClass('micOn');
                    }
                } else if (text == "video") {
                    console.log("Remote video toggle reached with " + peerId);
                    if ($("#remoteVideo-" + peerId).hasClass('camOn')) {
                        localTracks.videoTrack.setEnabled(false);
                        console.log("Remote Video Muted for: " + peerId);
                        $("#remoteVideo-" + peerId).removeClass('camOn');
                    } else {
                        localTracks.videoTrack.setEnabled(true);
                        console.log("Remote Video Unmuted for: " + peerId);
                        $("#remoteVideo-" + peerId).addClass('camOn');
                    }
                }
            })
            // Display channel member joined updated users
            channel.on('MemberJoined', function () { // Get all members in RTM Channel
                channel.getMembers().then((memberNames) => {
                    console.log("New member joined so updated list is: ");
                    console.log(memberNames);
                    var newHTML = $.map(memberNames, function (singleMember) {
                        if (singleMember != accountName) {
                            return (`<li class="mt-2">
                      <div class="row">
                          <p>${singleMember}</p>
                       </div>
                       <div class="mb-4">
                         <button class="text-white btn btn-control mx-3 remoteMicrophone micOn" id="remoteAudio-${singleMember}">Toggle Mic</button>
                         <button class="text-white btn btn-control remoteCamera camOn" id="remoteVideo-${singleMember}">Toggle Video</button>
                        </div>
                     </li>`);
                        }
                    });
                    $("#insert-all-users").html(newHTML.join(""));
                });
            })
            // Display channel member left updated users
            channel.on('MemberLeft', function () { // Get all members in RTM Channel
                channel.getMembers().then((memberNames) => {
                    console.log("A member left so updated list is: ");
                    console.log(memberNames);
                    var newHTML = $.map(memberNames, function (singleMember) {
                        if (singleMember != accountName) {
                            return (`<li class="mt-2">
                      <div class="row">
                          <p>${singleMember}</p>
                       </div>
                       <div class="mb-4">
                         <button class="text-white btn btn-control mx-3 remoteMicrophone micOn" id="remoteAudio-${singleMember}">Toggle Mic</button>
                         <button class="text-white btn btn-control remoteCamera camOn" id="remoteVideo-${singleMember}">Toggle Video</button>
                        </div>
                     </li>`);
                        }
                    });
                    $("#insert-all-users").html(newHTML.join(""));
                });
            });
        }).catch(error => {
            console.log('AgoraRTM client channel join failed: ', error);
        }).catch(err => {
            console.log('AgoraRTM client login failure: ', err);
        });
    });
    // Logout
    document.getElementById("leave").onclick = async function () {
        console.log("Client logged out of RTM.");
        await clientRTM.logout();
    }
}

async function subscribe(user, mediaType) {
    const uid = user.uid;
    // subscribe to a remote user
    await client.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === 'video') {
        const player = $(`
      <div id="player-wrapper-${uid}">
        <p class="player-name">remoteUser(${uid})</p>
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
        $("#remote-playerlist").append(player);
        user.videoTrack.play(`player-${uid}`);
    }
    if (mediaType === 'audio') {
        var apptype = $("#SessionAppType").val();
        if (apptype.includes('Audio')) {
            $("#remote-playerlist").css('background', 'url(../../Content/website_assets/img/videocall_background_remote.png)');
            $("#remote-playerlist").css('background-position', 'center');
            $("#remote-playerlist").css('background-size', 'contain');
            $("#remote-playerlist").css('background-repeat', 'no-repeat');
            $("#remote-playerlist").css('height', '100vh');
        }

        
        user.audioTrack.play();
    }
}

// Handle user publish
function handleUserPublished(user, mediaType) {
    var apptype = $("#SessionAppType").val();
    if (apptype.includes('Video')) {

    }
    else {
        $("#video-btn").parent().hide();

    }

    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
}

// Handle user left
function handleUserLeft(user) {
    const id = user.uid;
    delete remoteUsers[id];
    $(`#player-wrapper-${id}`).remove();
}

// Initialise UI controls
enableUiControls();

// Action buttons
function enableUiControls() {

    $(document).unbind().on("click", "#mic-btn", function (e) {
    //$("#mic-btn").click(function () {
        toggleMic();
    });
    $(document).unbind().on("click", "#video-btn", function (e) {
    //$("#video-btn").click(function () {
        toggleVideo();
    });
}

// Toggle Mic
function toggleMic() {
    if ($("#mic-icon").hasClass('bi-mic-fill')) {
        localTracks.audioTrack.setEnabled(false);
        console.log("Audio Muted.");
    } else {
        localTracks.audioTrack.setEnabled(true);
        console.log("Audio Unmuted.");
    }
    $("#mic-icon").toggleClass('bi-mic-fill').toggleClass('bi-mic-mute-fill');
}

// Toggle Video
function toggleVideo() {
    if ($("#video-icon").hasClass('bi-camera-video-fill')) {
        localTracks.videoTrack.setEnabled(false);
        console.log("Video Muted.");
    } else {
        localTracks.videoTrack.setEnabled(true);
        console.log("Video Unmuted.");
    }
    $("#video-icon").toggleClass('bi-camera-video-fill').toggleClass('bi-camera-video-off-fill');
}
