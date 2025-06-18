import Registry from './registry.js'



let apiHost = window.localStorage.getItem("apiUrl") || 'http://127.0.0.1:5000'

export default {

  setApiHost(url) {
    apiHost = url
  },

  getApiHost() {
    return apiHost
  },

  defaults: {
    images: false,

    getImages() {
      if (!this.images) {
        this.fetchImages()
        return false
      }

      return this.images
      //http://localhost:5000/config/default-images
    },

    fetchImages() {
      if (!this.images) {
        let target = this
        function reqListener() {
          let jsonResponse = JSON.parse(this.responseText)
          target.images = jsonResponse
          Registry.eventBus.trigger('dataDefaultImagesLoadSuccess', target.images)
        }
        const req = new XMLHttpRequest()
        req.addEventListener("load", reqListener)
        req.open("GET", apiHost + "/config/default-images")
        req.send()

        return false
      } else {
        return true
      }
    },
  },

  locations: {
    locations: false,

    getNext(location) {
      if (!this.locations) {
        return false
      }
      let index = this.locations.indexOf(location);
      if(index >= 0 && index < this.locations.length - 1) {
        return this.locations[index + 1]
      }
      return false
    },

    getPrevious(location) {
      if (!this.locations) {
        return false
      }
      let index = this.locations.indexOf(location)
      if(index >= 1 && index < this.locations.length) {
        return this.locations[index - 1]
      }
      return false
    },

    search(string) {
      if (!this.locations) {
        this.fetchLocations()
        return []
      }

      string = string.toLowerCase()
      function filterByString(item) {
        if (string == '') {
          return true
        }
        let found = false

        if (item.name && item.name.toLowerCase().includes(string)) {
          found = true
        }

        if (item.description && item.description.toLowerCase().includes(string)) {
          found = true
        }

        return found
      }

      return this.locations.filter(filterByString)
    },

    getLocationById(id) {
      if (!this.locations) {
        this.fetchLocations()
        return false
      }

      function filterByID(item) {
        return Number.isFinite(item.id) && item.id == id
      }

      return this.locations.filter(filterByID)[0]
    },

    getLocations() {
      if (!this.locations) {
        this.fetchLocations()
        return []
      }

      return this.locations
    },

    getLocationsByLocationTypeId(locationTypeId) {
      if (!this.locations) {
        this.fetchLocations()
        return []
      }
      console.log("Find locations for " + locationTypeId)

      function filterByLocationTypeID(item) {
        console.log(item.locationTypeId)
        return Number.isFinite(item.locationTypeId) && item.locationTypeId == locationTypeId
      }

      return this.locations.filter(filterByLocationTypeID)
    },


    fetchLocations() {
      if (this.locations == false) {
        let target = this
        function reqListener() {
          let jsonResponse = JSON.parse(this.responseText)
          target.locations = jsonResponse
          Registry.eventBus.trigger('dataLocationLoadSuccess', target.locations)
        }
        const req = new XMLHttpRequest()
        req.addEventListener("load", reqListener)
        req.open("GET", apiHost + "/locations")
        req.send()

        return false
      } else {
        return true
      }
    },

    reload() {
      this.locations = false
      this.fetchLocations()
    },

    updateEntry(location) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("PUT", apiHost + "/location/" + location.id)
      req.send(JSON.stringify(location))
    },

    addEntry(location) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("POST", apiHost + "/locations")
      req.send(JSON.stringify(location))
    },

    deleteEntry(location) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("DELETE", apiHost + "/location/" + location.id)
      req.send()
    }
  },

  locationTypes: {
    locationTypes: false,

    getNext(locationType) {
      if (!this.locationTypes) {
        return false
      }
      let index = this.locationTypes.indexOf(locationType);
      if(index >= 0 && index < this.locationTypes.length - 1) {
        return this.locationTypes[index + 1]
      }
      return false
    },

    getPrevious(locationType) {
      if (!this.locationTypes) {
        return false
      }
      let index = this.locationTypes.indexOf(locationType)
      if(index >= 1 && index < this.locationTypes.length) {
        return this.locationTypes[index - 1]
      }
      return false
    },

    search(string) {
      if (!this.locationTypes) {
        this.fetchLocationTypes()
        return []
      }

      string = string.toLowerCase()
      function filterByString(item) {
        if (string == '') {
          return true
        }
        let found = false

        if (item.name && item.name.toLowerCase().includes(string)) {
          found = true
        }

        if (item.description && item.description.toLowerCase().includes(string)) {
          found = true
        }

        return found
      }

      return this.locationTypes.filter(filterByString)
    },

    getLocationTypeById(id) {
      if (!this.locationTypes) {
        this.fetchLocationTypes()
        return false
      }

      function filterByID(item) {
        return Number.isFinite(item.id) && item.id == id
      }

      return this.locationTypes.filter(filterByID)[0]
    },

    getLocationTypes() {
      if (!this.locationTypes) {
        this.fetchLocationTypes()
        return []
      }

      return this.locationTypes
    },

    fetchLocationTypes() {
      if (this.locationTypes == false) {
        let target = this
        function reqListener() {
          let jsonResponse = JSON.parse(this.responseText)
          target.locationTypes = jsonResponse
          Registry.eventBus.trigger('dataLocationTypeLoadSuccess', target.locationTypes)
        }
        const req = new XMLHttpRequest()
        req.addEventListener("load", reqListener)
        req.open("GET", apiHost + "/locationTypes")
        req.send()

        return false
      } else {
        return true
      }
    },

    reload() {
      this.locationTypes = false
      this.fetchLocationTypes()
    },

    updateEntry(locationType) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("PUT", apiHost + "/locationType/" + locationType.id)
      req.send(JSON.stringify(locationType))
    },

    addEntry(locationType) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("POST", apiHost + "/locationTypes")
      req.send(JSON.stringify(locationType))
    },

    deleteEntry(locationType) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("DELETE", apiHost + "/locationType/" + locationType.id)
      req.send()
    }
  },


  boxes: {
    boxes: false,

    getNext(box) {
      let boxes = box.locationId ? this.getBoxesByLocationId(box.locationId) : this.boxes
      if (!boxes) {
        return false
      }
      let index = boxes.indexOf(box);
      if(index >= 0 && index < boxes.length - 1) {
        return boxes[index + 1]
      }
      return false
    },

    getPrevious(box) {
      let boxes = box.locationId ? this.getBoxesByLocationId(box.locationId) : this.boxes
      if (!boxes) {
        return false
      }
      let index = boxes.indexOf(box);
      if(index >= 1 && index < boxes.length) {
        return boxes[index - 1]
      }
      return false
    },

    search(string) {
      if (!this.boxes) {
        this.fetchBoxes()
        return []
      }

      string = string.toLowerCase()
      function filterByString(item) {
        if (string == '') {
          return true
        }

        let found = false

        if (item.name && item.name.toLowerCase().includes(string)) {
          found = true
        }

        if (item.description && item.description.toLowerCase().includes(string)) {
          found = true
        }

        return found
      }

      return this.boxes.filter(filterByString)
    },

    getBoxById(id) {
      if (!this.boxes) {
        this.fetchBoxes()
        return false
      }

      function filterByID(item) {
        return Number.isFinite(item.id) && item.id == id
      }

      return this.boxes.filter(filterByID)[0]
    },

    getBoxesByLocationId(locationId) {
      if (!this.boxes) {
        this.fetchBoxes()
        return []
      }

      function filterByLocationID(item) {
        return Number.isFinite(item.parentLocationId) && item.parentLocationId == locationId
      }

      return this.boxes.filter(filterByLocationID)
    },

    getBoxesByBoxId(boxId) {
      if (!this.boxes) {
        this.fetchBoxes()
        return []
      }

      function filterByBoxID(box) {
        return Number.isFinite(box.boxId) && box.boxId == boxId
      }

      return this.boxes.filter(filterByBoxID)
    },

    getBoxesByPersonId(personId) {
      if (!this.boxes) {
        this.fetchBoxes()
        return []
      }

      function filterByPersonID(item) {
        return Number.isFinite(item.personId) && item.personId == personId
      }

      return this.boxes.filter(filterByPersonID)
    },


    getBoxes() {
      if (!this.boxes) {
        this.fetchBoxes()
        return []
      }

      return this.boxes
      return true
    },

    fetchBoxes() {
      if (this.boxes == false) {
        let target = this
        function reqListener() {
          let jsonResponse = JSON.parse(this.responseText)
          target.boxes = jsonResponse
          Registry.eventBus.trigger('dataBoxLoadSuccess', target.boxes)
        }

        const req = new XMLHttpRequest();
        req.addEventListener("load", reqListener);
        req.open("GET", apiHost + "/boxes");
        req.send();
      }
    },

    reload() {
      this.boxes = false
      this.fetchBoxes()
    },

    updateEntry(box) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("PUT", apiHost + "/box/" + box.id)
      req.send(JSON.stringify(box))
    },

    addEntry(box) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("POST", apiHost + "/boxes")
      req.send(JSON.stringify(box))
    },

    deleteEntry(box) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("DELETE", apiHost + "/box/" + box.id)
      req.send()
    }
  },

  persons: {
    persons: false,

    getNext(person) {
      if (!this.persons) {
        return false
      }
      let index = this.persons.indexOf(person);
      if(index >= 0 && index < this.persons.length - 1) {
        return this.persons[index + 1]
      }
      return false
    },

    getPrevious(person) {
      if (!this.persons) {
        return false
      }
      let index = this.persons.indexOf(person)
      if(index >= 1 && index < this.persons.length) {
        return this.persons[index - 1]
      }
      return false
    },

    search(string) {
      if (!this.persons) {
        this.fetchPersons()
        return []
      }

      string = string.toLowerCase()
      function filterByString(item) {
        if (string == '') {
          return true
        }
        let found = false

        if (item.name && item.name.toLowerCase().includes(string)) {
          found = true
        }

        if (item.description && item.description.toLowerCase().includes(string)) {
          found = true
        }

        return found
      }

      return this.persons.filter(filterByString)
    },

    getPersonById(id) {
      if (!this.persons) {
        this.fetchPersons()
        return false
      }

      function filterByID(item) {
        return Number.isFinite(item.id) && item.id == id
      }

      return this.persons.filter(filterByID)[0]
    },

    getPersons() {
      if (!this.persons) {
        this.fetchPersons()
        return []
      }

      return this.persons
    },

    fetchPersons() {
      if (this.persons == false) {
        let target = this
        function reqListener() {
          let jsonResponse = JSON.parse(this.responseText)
          target.persons = jsonResponse
          Registry.eventBus.trigger('dataPersonLoadSuccess', target.persons)
        }
        const req = new XMLHttpRequest()
        req.addEventListener("load", reqListener)
        req.open("GET", apiHost + "/persons")
        req.send()

        return false
      } else {
        return true
      }
    },

    reload() {
      this.persons = false
      this.fetchPersons()
    },

    updateEntry(person) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("PUT", apiHost + "/person/" + person.id)
      req.send(JSON.stringify(person))
    },

    addEntry(person) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("POST", apiHost + "/persons")
      req.send(JSON.stringify(person))
    },

    deleteEntry(person) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("DELETE", apiHost + "/person/" + person.id)
      req.send()
    }
  },

  items: {
    items: false,

    getNext(item) {
      let items = item.boxId ? this.getItemsByBoxId(item.boxId) : this.items

      if (!items) {
        return false
      }
      let index = items.indexOf(item);
      if(index >= 0 && index < items.length - 1) {
        return items[index + 1]
      }
      return false
    },

    getPrevious(item) {
      let items = item.boxId ? this.getItemsByBoxId(item.boxId) : this.items

      if (!items) {
        return false
      }
      let index = items.indexOf(item);
      if(index >= 1 && index < items.length) {
        return items[index - 1]
      }
      return false
    },

    search(string) {
      if (!this.items) {
        this.fetchItems()
        return []
      }

      string = string.toLowerCase()
      function filterByString(item) {
        if (string == '') {
          return true
        }
        let found = false

        if (item.name && item.name.toLowerCase().includes(string)) {
          found = true
        }

        if (item.description && item.description.toLowerCase().includes(string)) {
          found = true
        }

        return found
      }

      return this.items.filter(filterByString)
    },

    getItemById(id) {
      if (!this.items) {
        this.fetchItems()
        return []
      }

      function filterByID(item) {
        return Number.isFinite(item.id) && item.id == id
      }

      return this.items.filter(filterByID)[0]
    },

    getItemsByBoxId(boxId) {
      if (!this.items) {
        this.fetchItems()
        return []
      }

      function filterByBoxID(item) {
        return Number.isFinite(item.boxId) && item.boxId == boxId
      }

      return this.items.filter(filterByBoxID)
    },

    getItems() {
      if (!this.items) {
        this.fetchItems()
        return []
      }

      return this.items
    },

    fetchItems() {
      if (this.items == false) {
        let target = this
        function reqListener() {
          let jsonResponse = JSON.parse(this.responseText)
          target.items = jsonResponse
          Registry.eventBus.trigger('dataItemLoadSuccess', target.items)
        }

        const req = new XMLHttpRequest();
        req.addEventListener("load", reqListener);
        req.open("GET", apiHost + "/items");
        req.send();
      }

    },


    reload() {
      this.items = false
      this.fetchItems()
    },

    updateEntry(item) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("PUT", apiHost + "/item/" + item.id)
      req.send(JSON.stringify(item))
    },

    addEntry(item) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("POST", apiHost + "/items")
      req.send(JSON.stringify(item))
    },

    deleteEntry(item) {
      let target = this
      function reqListener() {
        let jsonResponse = JSON.parse(this.responseText)
        target.reload()
      }

      const req = new XMLHttpRequest()
      req.addEventListener("load", reqListener)
      req.open("DELETE", apiHost + "/item/" + item.id)
      req.send()
    }
  },

}
