import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/meeting.css";

function MeetingPage() {
    const { id } = useParams();

    const clientRef = useRef(null);
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [localVideoTrack, setLocalVideoTrack] = useState(null);
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [videoOn, setVideoOn] = useState(true);
    const [audioOn, setAudioOn] = useState(true);
    const [joined, setJoined] = useState(false);
    const navigate = useNavigate();

    const usersPositions = [1, 2, 2, 2, 3, 3, 4, 4];

    useEffect(() => {
        clientRef.current = AgoraRTC.createClient({
            mode: "rtc",
            codec: "vp8",
        });

        const client = clientRef.current;

        client.on("user-published", async (user, mediaType) => {
            await client.subscribe(user, mediaType);

            if (mediaType === "video") {
                let el = document.getElementById(`remote-${user.uid}`)
                user.videoTrack.play(el);
            }
            if (mediaType === "audio") {
                user.audioTrack.play();
            }
        });

        client.on("user-unpublished", (user, mediaType) => {
            if (mediaType === "video") {
                const el = document.getElementById(`remote-${user.uid}`);
                if (el && user.videoTrack) {
                    user.videoTrack.stop();
                }
            }
        });

        client.on("user-joined", async (user) => {
            setRemoteUsers((prev) => {
                if (prev.some(u => u.uid === user.uid)) {
                    return prev;
                }
                return [...prev, user];
            });

            // Do it to publish video even if camera is off (new participant can see you at list of users)
            await switchVideo();
            await switchVideo();
        })

        client.on("user-left", (user) => { 
            setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid)); 
        });

        return () => {
            client.leave();
        };
    }, []);

    const joinChannel = async () => {
        const client = clientRef.current;

        await client.join(process.env.REACT_APP_AGORA_APP_ID, id, null, null);

        const [micTrack, camTrack] = await Promise.all([
            AgoraRTC.createMicrophoneAudioTrack(),
            AgoraRTC.createCameraVideoTrack(),
        ]);

        setLocalAudioTrack(micTrack);
        setLocalVideoTrack(camTrack);

        setRemoteUsers((prev) => [
            ...prev,
            { uid: "local", videoTrack: camTrack, audioTrack: micTrack }
        ]);

        await client.publish([micTrack, camTrack]);
        setJoined(true)
    };

    const leaveChannel = async () => {
        if (localAudioTrack) {
            localAudioTrack.close();
            setLocalAudioTrack(null);
        }
        if (localVideoTrack) {
            localVideoTrack.close();
            setLocalVideoTrack(null);
        }
        await clientRef.current.leave();
        setRemoteUsers([]);
        navigate("/dashboard");
    };

    const switchAudio = async () => {
        if (!localAudioTrack) return;
        const newAudioOn = !audioOn;
        setAudioOn(newAudioOn);
        await localAudioTrack.setEnabled(newAudioOn);
    };

    const switchVideo = async () => {
        if (!localVideoTrack) return;
        const newVideoOn = !videoOn;
        setVideoOn(newVideoOn);

        if (newVideoOn) {
            await localVideoTrack.setEnabled(true);
            await clientRef.current.publish(localVideoTrack);
        }
        else {
            await clientRef.current.unpublish(localVideoTrack);
            localVideoTrack.setEnabled(false);
        }
    };

    return (
        <div className="meeting-room">
            {!joined ? 
                (<button onClick={joinChannel}>Join</button>)
            : (
                <div style={{width: "100%", height: "100%"}}>
                    <div className="remote-users">
                        {/* todo: check if amount of users is less than 9 */}
                        {remoteUsers.map((user, index) => {
                            let usersWinAmount = Math.min(remoteUsers.length, 8)
                            let columnStart = 24 / usersPositions[usersWinAmount - 1] * index + 1
                            let columnEnd = 24 / usersPositions[usersWinAmount - 1] * (index + 1) + 1

                            let isSecondRow = (index + 1) > Math.ceil(usersWinAmount / 2) && usersWinAmount !== 2

                            if (isSecondRow) {
                                columnStart -= 24
                                columnEnd -= 24
                            }

                            if (usersWinAmount % 2 === 1 && usersWinAmount !== 1 && isSecondRow) {
                                let shift = (columnEnd - columnStart) / 2
                                columnStart += shift
                                columnEnd += shift
                            }

                            let rowStart = isSecondRow ? 2 : 1
                            let rowEnd = (usersWinAmount === 1 || usersWinAmount === 2) ? 3 : rowStart + 1

                            return (
                                <div
                                    className="user-window"
                                    key={user.uid}
                                    id={`remote-${user.uid}`}
                                    style={{
                                        gridColumn: `${columnStart}/${columnEnd}`,
                                        gridRow: `${rowStart}/${rowEnd}`
                                    }}
                                    ref={(el) => {
                                        if (el && user.videoTrack) {
                                            user.videoTrack.play(el);
                                        }
                                    }}
                                >
                                </div>
                            )
                        })}
                    </div>

                    <div className="control-panel">
                        <button className={videoOn ? "btn-on" : "btn-off"} onClick={switchVideo}>
                            Video
                        </button>
                        <button className={audioOn ? "btn-on" : "btn-off"} onClick={switchAudio}>
                            Mike
                        </button>
                        <button className="btn-leave" onClick={leaveChannel}>
                            Leave
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MeetingPage;
