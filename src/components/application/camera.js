
class Camera {

  localStorage = window.localStorage
  useCamera = false
  devices = []


  async isPersisted() {
    // read permissions
    return this.getCurrentCameraLabel() != null
  }

  async configure() {
    await this.readCameraPermissions()
    await this.readAllCameras()
    let labels = this.getCameraLabels()

    if (! await this.isPersisted()) {
      for (const label of labels) {
        if (labels.length == 1 || label.includes("back")) {
          this.localStorage.setItem("cameraLabel", label)
        }
      }
    }
  }

  async readCameraPermissions() {
    let permissionObj = await navigator.permissions.query({name: 'camera'})
    if (permissionObj.state == 'prompt') {
        this.useCamera = true

        // request permissions - only works in browser so far
        let stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true})
        if (stream) {
          stream.getTracks().forEach(function(track) {
            track.stop()
          })
        }

    } else if (permissionObj.state == 'granted') {
      this.useCamera = true
    }
  }

  async readAllCameras() {
    if (this.useCamera == true) {
      let devices = await navigator.mediaDevices.enumerateDevices()
      for (const device of devices) {
        if (device.kind === "videoinput") {
          this.devices.push({
            label: device.label,
            id: device.id || device.deviceId
          })
        }
      }
    }
  }

  getCameraLabels() {
    return this.devices.map(device => device.label);
  }

  getCurrentCameraLabel() {
    return this.localStorage.getItem("cameraLabel")
  }

  async getDeviceId() {
    const device = this.devices.find(device => device.label === this.getCurrentCameraLabel());
    return device ? device.id : null;
  }
}

export default new Camera()
