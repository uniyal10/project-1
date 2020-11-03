// class ProjectTemplate {
//   template: HTMLTemplateElement
//   container: HTMLDivElement
//   element: HTMLElement
//   constructor() {
//     this.template = document.getElementById("table-template")! as HTMLTemplateElement
//     this.container = document.getElementById("app")! as HTMLDivElement

//     const importedTemplate = document.importNode(this.template.content, true)
//     this.element = importedTemplate.firstElementChild! as HTMLElement
//     this.attach()
//   }
//   attach() {
//     this.container.insertAdjacentElement("afterbegin", this.element)
//   }
// }

class User {
  container: HTMLTableElement
  // container: HTMLDivElement
  // element: HTMLElement
  // row: HTMLElement
  firstName: string
  middleName: string
  lastName: string
  email: string
  phoneNumber: number
  role: string
  address: string
  constructor(user: User) {
    this.container = document.querySelector("table")! as HTMLTableElement
    // this.container = document.getElementById("app")! as HTMLDivElement
    this.firstName = user.firstName
    this.middleName = user.middleName
    this.lastName = user.lastName
    this.email = user.email
    this.phoneNumber = user.phoneNumber
    this.role = user.role
    this.address = user.address

    this.insert()
  }
  insert() {
    const id = Math.random() * 10
    const edit = `<a id='${id}-edit' href='#' >Edit</a>`
    const del = `<a id='${id}-del' href='#'>Delete</a>`
    const save = `<a style="display:none;color:green;" id='${id}-save' href='#'>Save</a>`
    const cancel = `<a style="display:none;color:red;" id='${id}-cancel' href='#'>Cancel</a>`
    const element = `<tr id='${id}-row'><td>${this.firstName}</td><td>${this.middleName}</td><td>${this.lastName}</td><td>${this.email}</td><td>${this.phoneNumber}</td><td>${this.role}</td><td>${this.address}</td><td>${edit}${del}${save}${cancel}</td></tr>`
    this.container.insertAdjacentHTML("beforeend", element)
    this.clickEdit(id)
    this.clickDelete(id)
  }
  handleDelete(id: number) {
    const row = document.getElementById(`${id}-row`)!
    row.parentNode!.removeChild(row)
  }
  clickDelete(id: number) {
    const element = document.getElementById(`${id}-del`)!
    element.addEventListener("click", this.handleDelete.bind(this, id))
  }
  handleEdit(id: number) {
    const row = document.getElementById(`${id}-row`)!
    const editBtn = document.getElementById(`${id}-edit`)!
    const saveBtn = document.getElementById(`${id}-save`)!
    const cancelBtn = document.getElementById(`${id}-cancel`)!
    const delBtn = document.getElementById(`${id}-del`)!

    editBtn.style.display = "none"
    delBtn.style.display = "none"

    saveBtn.style.display = "block"
    cancelBtn.style.display = "block"

    const allCol = row.querySelectorAll("td")!
    for (var i = 0; i < allCol.length - 1; i++) {
      allCol[i].setAttribute("contenteditable", "true")
    }
    allCol[0].focus()

    this.clickSave(id)
    this.clickCancel(id)
  }

  handleCancel(id: number) {
    const row = document.getElementById(`${id}-row`)!
    const data = row.querySelectorAll("td")!
    data[0].innerText = this.firstName
    data[1].innerText = this.middleName
    data[2].innerText = this.lastName
    data[3].innerText = this.email
    data[4].innerHTML = `${this.phoneNumber}`
    data[5].innerText = this.role
    data[6].innerText = this.address
    const editBtn = document.getElementById(`${id}-edit`)!
    const saveBtn = document.getElementById(`${id}-save`)!
    const cancelBtn = document.getElementById(`${id}-cancel`)!
    const delBtn = document.getElementById(`${id}-del`)!

    editBtn.style.display = "block"
    delBtn.style.display = "block"

    saveBtn.style.display = "none"
    cancelBtn.style.display = "none"
    const allCol = row.querySelectorAll("td")!
    for (var i = 0; i < allCol.length - 1; i++) {
      allCol[i].setAttribute("contenteditable", "false")
    }
  }
  clickCancel(id: number) {
    const element = document.getElementById(`${id}-cancel`)!
    element.addEventListener("click", this.handleCancel.bind(this, id))
  }
  handleSave(id: number) {
    const row = document.getElementById(`${id}-row`)!
    const editBtn = document.getElementById(`${id}-edit`)!
    const saveBtn = document.getElementById(`${id}-save`)!
    const cancelBtn = document.getElementById(`${id}-cancel`)!
    const delBtn = document.getElementById(`${id}-del`)!

    editBtn.style.display = "block"
    delBtn.style.display = "block"

    saveBtn.style.display = "none"
    cancelBtn.style.display = "none"
    const allCol = row.querySelectorAll("td")!
    for (var i = 0; i < allCol.length - 1; i++) {
      allCol[i].setAttribute("contenteditable", "false")
    }
  }

  clickSave(id: number) {
    const element = document.getElementById(`${id}-save`)!
    element.addEventListener("click", this.handleSave.bind(this, id))
  }
  // clickCancel(id: number) {

  // }
  clickEdit(id: number) {
    const element = document.getElementById(`${id}-edit`)!
    element.addEventListener("click", this.handleEdit.bind(this, id))
  }
}

class UserList {
  // firstName: string
  // lastName: string
  private static users: User[]
  private static instance: UserList
  constructor() {
    this.read()
    this.load()
  }
  static createInstance() {
    if (!UserList.instance) {
      UserList.instance = new UserList()
    }
    return UserList.instance
  }
  load() {
    console.log(UserList.users)
    for (var i = 0; i < UserList.users.length; i++) {
      new User(UserList.users[i])
    }
  }
  read() {
    const xhr = new XMLHttpRequest()
    xhr.open("get", "../data.json", false)
    xhr.onload = function () {
      console.log(UserList.users)
      UserList.users = JSON.parse(this.responseText)
      console.log(UserList.users.length)
    }
    xhr.send()
  }
}

let btn = document.getElementById("btn")! as HTMLButtonElement
let refresh = document.getElementById("refresh")!
btn.addEventListener("click", () => {
  UserList.createInstance()
  btn.style.display = "none"
  refresh.style.display = "block"
})
refresh.addEventListener("click", () => {
  location.reload(false)
})

// const obj = new ProjectTemplate()