const storage = window.localStorage

const renderContacts = () => {
const contacts = JSON.parse(storage.getItem('contacts'))
let div = document.querySelector('.contact-list')

if (contacts) {
  div.innerHTML = ''
  const ul = document.createElement('ul')
  contacts.forEach(contact => {
    let li = document.createElement('div')
    li.innerHTML = `  
    <div class="ui column">
        <div class="ui card">
          <div class="image">
            <img src="https://semantic-ui.com/images/avatar/large/elliot.jpg">
          </div>
            <div class="content">
                <div class="header">
                ${ contact.name }
                </div>
                <div class="description"> 
                    ${ contact.notes } <br>
                    ${ contact.email } <br>
                    ${ contact.company }
                </div>
                <div class="extra content">
                    <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a><img src="https://www.shareicon.net/data/128x128/2017/06/22/887584_logo_512x512.png" height="25" width="25">
                </div>
            </div>
            <button onClick="var c = JSON.parse(localStorage.getItem('contacts')); c.forEach((item, index, array) => item.id === ${contact.id} && array.splice(index, 1) ); localStorage.setItem('contacts', JSON.stringify(c)); window.location.reload()" class="delete-contact">Delete contact</button>   
    </div>
        `
     
      div.appendChild(li)
  })
      li.appendChild(ul) 
  } else { 
    div.innerHTML = '<p>You have no contacts in your address book</p>' 
  }
}

document.addEventListener('DOMContentLoaded', () => {
    renderContacts()
    const addContactForm = document.querySelector('.new-contact-form')
    addContactForm.addEventListener('submit', event => {
        event.preventDefault()
        
        const {
            name,
            email,
            phone,
            company,
            notes,
            twitter,
        } = addContactForm.elements
       
        const contact = {
            id: Date.now(), 
            name: name.value,
            email: email.value,
            phone: phone.value,
            company: company.value, 
            notes: notes.value,
            twitter: twitter.value,
        }
        
        console.log(`Saving the following contact: ${JSON.stringify(contact)}`)
        addContactForm.reset()
        let contacts = JSON.parse(storage.getItem('contacts')) || []
        contacts.push(contact)
        storage.setItem('contacts', JSON.stringify(contacts))
        renderContacts()
    })
})
