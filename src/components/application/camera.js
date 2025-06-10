let instance;

export default {

  async getDeviceId(label) {
    let useCamera = false
    let permissionObj = await navigator.permissions.query({name: 'camera'})

    if (permissionObj.state == 'prompt') {
        useCamera = true
        // request permissions
        let stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true})
        if (stream) {
          stream.getTracks().forEach(function(track) {
            track.stop()
          })
        }

    } else if (permissionObj.state == 'granted') {
      useCamera = true
    }

    let devices = []
    if (useCamera == true) {
      devices = await navigator.mediaDevices.enumerateDevices()
    }

    let cameras = [];
    let cameraFound = false

    for (const device of devices) {
      if (device.kind === "videoinput" && device.label == label) {
        if (device.deviceId) {
            return device.deviceId
        } else if (device.id){
            return device.id
        }
      }
    }
  }
}
