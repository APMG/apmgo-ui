// @flow
import ApmLogo from './svg/ApmLogo.js'

type MainMenuProps = {
  accountName: string,
  logoutPath: string,
  accountPath: string
}

function insertHeader (selector: string, props: MainMenuProps) {
  let element = getElement(selector)
  element.innerHTML = getTemplate(props)
  addDropdownListener(element)
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
    <header class="MainMenu_header" role="banner">
      <div class="MainMenu_logo">
        ${ApmLogo()}
        <span class="invisible">American Public Media</span>
      </div>
      <nav class="MainMenu_nav" role="navigation">
        <ul class="MainMenu_list">
          <li><a class="MainMenu_link MainMenu_active MainMenu_highlighted" href="#">Playlist</a></li>
          <li><a class="MainMenu_link" href="#">Archive</a></li>
        </ul>
        <div class="MainMenu_account">
          <button
            type="button"
            class="MainMenu_link"
          >
            ${props.accountName} &#9662;
          </button>
          <ul class='MainMenu_menu'>
            <li>
              <a href='${props.accountPath}' class="MainMenu_link" id="account">My Account</a>
            </li>
            <li>
              <a href='${props.logoutPath}' class="MainMenu_link" id='logout'>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `
  return template
}

function addDropdownListener (element: HTMLElement) {
  let acctButton = element.querySelector('.MainMenu_account button')

  if (acctButton) {
    acctButton.addEventListener('click', function () {
      let acctMenu = element.querySelector('.MainMenu_account ul.MainMenu_menu')
      if (acctMenu) {
        if (acctMenu && acctMenu.classList.contains('MainMenu_menu-visible')) {
          acctMenu.className += ' MainMenu_menu-visible'
        } else {
          acctMenu.classList.remove('MainMenu_menu-visible')
        }
      }
    })
  }
}
