import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        const videoWidth = this.props.user === 'docent' ? '600px' : '200px';
        return <video style={{ width: videoWidth, height: 'auto', borderRadius:"0.4rem" }} autoPlay={true} ref={this.videoRef} />;
    }

}
