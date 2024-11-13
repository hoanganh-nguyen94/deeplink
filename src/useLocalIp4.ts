import { useState, useEffect } from 'react';

function useLocalIPv4() {
    const [ipv4, setIpv4] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const findLocalIP = async () => {
            try {
                // WebRTC setup
                const rtcConnection = new RTCPeerConnection({
                    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
                });
                // Collect the ICE candidates from STUN server
                rtcConnection.createDataChannel('');
                rtcConnection.onicecandidate = (event) => {
                    if (!event || !event.candidate) return;
                    const candidate = event.candidate.candidate;
                    // Match IPv4 address in candidate
                    const ipMatch = candidate.match(
                        /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/
                    );
                    if (ipMatch) {
                        // @ts-ignore
                        setIpv4(ipMatch[1]);
                        rtcConnection.close();
                    }
                };
                await rtcConnection.createOffer().then((offer) => rtcConnection.setLocalDescription(offer));
            } catch (err) {
                console.error('Error finding IP:', err);
                // @ts-ignore
                setError(err);
            }
        };
        findLocalIP();
    }, []);
    return { ipv4, error };
}

export default useLocalIPv4;
