import { insertHeader } from './MainMenu'

describe('MainMenu', function () {
  const testProps = {
    accountName: 'test_acct_name',
    logoutPath: 'test_logout_path',
    accountPath: 'test_acct_path'
  }

  const testSelector = 'test-selector'

  let testEl

  beforeEach(() => {
    if (testEl) {
      document.body.removeChild(testEl)
    }
    testEl = document.createElement('div', {id: testSelector})
    document.body.appendChild(testEl)
  })

  it('contains various texts', function () {
    let rendered = insertHeader(testEl, testProps)
    expect(containsText(rendered, testProps.accountName)).toBe(true)
    expect(containsText(rendered, testProps.accountPath)).toBe(true)
    expect(containsText(rendered, testProps.logoutPath)).toBe(true)
    expect(containsText(rendered, 'My Account')).toBe(true)
    expect(containsText(rendered, 'Log Out')).toBe(true)
    expect(containsText(rendered, 'Archive')).toBe(true)
    expect(containsText(rendered, 'Playlist')).toBe(true)
    expect(containsText(rendered, 'American Public Media')).toBe(true)
    expect(containsText(rendered, 'svg')).toBe(true)
  })

  it('toggles visible class on click', function () {
    let rendered = insertHeader(testEl, testProps)
    let acctButton = rendered.querySelector('button.mainMenu_link')
    let acctMenu = rendered.querySelector('ul.mainMenu_menu')

    expect(acctButton).not.toBe(null)
    expect(acctMenu).not.toBe(null)

    expect(acctMenu.classList.contains('is-visible')).toBe(false)
    acctButton.click()
    expect(acctMenu.classList.contains('is-visible')).toBe(true)
  })
})

function containsText (element, search) {
  return element.innerHTML.indexOf(search) !== -1
}
