// @flow
import ApmLogo from './svg/ApmLogo.js'

type MainMenuProps = {
  accountName: string,
  logoutPath: string,
  accountPath: string
}

function insertHeader (element: string | HTMLElement, props: MainMenuProps) {
  if (typeof element === 'string') {
    element = getElement(element)
  }
  element.innerHTML = getTemplate(props)
  addDropdownListener(element)

  // returning the element makes testing easier
  return element
}

export { insertHeader }

function getElement (selector: string) {
  let element = document.querySelector(selector)

  if (!element) {
    throw new Error('Could not find header element with selector ' + selector)
  }

  return element
}

const getTemplate = (props: MainMenuProps) => {
  const template = `
    <header class="mainMenu_header" role="banner">
      <div class="mainMenu_logo">
        ${ApmLogo()}
        <span class="invisible">American Public Media</span>
      </div>
      <nav class="mainMenu_nav" role="navigation">
        <ul class="mainMenu_list">
          <li><a class="mainMenu_link mainMenu_link-active mainMenu_link-highlighted" href="#">Playlist</a></li>
          <li><a class="mainMenu_link" href="#">Archive</a></li>
        </ul>
        <div class="mainMenu_account">
          <button
            type="button"
            class="mainMenu_link"
          >
            ${props.accountName} &#9662;
          </button>
          <ul class='mainMenu_menu'>
            <li>
              <a href='${props.accountPath}' class="mainMenu_link" id="account">My Account</a>
            </li>
            <li>
              <a href='${props.logoutPath}' class="mainMenu_link" id='logout'>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `
  return template
}

function addDropdownListener (element: HTMLElement) {
  let acctButton = element.querySelector('.mainMenu_account button')

  if (acctButton) {
    acctButton.addEventListener('click', function () {
      let acctMenu = element.querySelector('.mainMenu_account ul.mainMenu_menu')

      if (!acctMenu) {
        return
      }

      let visible = acctMenu.classList.contains('is-visible')
      if (visible) {
        acctMenu.classList.remove('is-visible')
      } else {
        acctMenu.className += ' is-visible'
      }
    })
  }
}
