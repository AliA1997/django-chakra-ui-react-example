const server = "http://localhost:8000/api/";
const getOptions = {
    method: "GET",
    mode: 'cors',
    headers: {
      'Accept': 'application/json'
    }
};

const postOptions = (body) => ({
    method: "POST",
    mode: "cors", 
    type: "application/json",
    headers: {
        'Accept': 'application/json'
    },
    body: JSON.stringify(body)
})

const putOptions = (body) => ({
    method: "PUT",
    mode: "cors", 
    type: "application/json",
    headers: {
        'Accept': 'application/json'
    },
    body: JSON.stringify(body)
})

class HomeApi {
  static async getHomes() {
    const response = await fetch(server + "houses/?format=json", getOptions);
    return await response.json();
  }

  static async getAddressOptions() {
    const response = await fetch(server + "addresses/?format=json", getOptions);   
    return await response.json();
    }

  static async getHome(id) {
    const response  = await fetch(server + "houses/" + id + "/?format=json", getOptions);
    return await response.json();
  }

  static async createHome(form) {
    await fetch(server + "houses/", postOptions(form));
    return;
  }

  static async createAddress(form) {
    await fetch(server + "addresses/", postOptions(form));
    return;
  }

  static async updateHome(form, id) {
    await fetch(server + "houses/" + id, putOptions(form));
    return;
  }

  static async updateAddress(form, id) {
    await fetch(server + "addresses/" + id, putOptions(form));
    return;
  }

  static async deleteHome(id) {}
}

export default HomeApi;
