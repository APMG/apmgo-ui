/* global ApmAccount */
var apmAccount = new ApmAccount('/apm_accounts')
var acctMenu = document.querySelector('.account ul.menu')
var acctButton = document.querySelector('.account button')
var logoutLink = document.querySelector('.account a#logout')
var accountLink = document.querySelector('.account a#account')
acctButton.innerText = apmAccount.get_name()
acctButton.addEventListener('click', function () {
  if (acctMenu.classList.contains('open')) {
    acctMenu.className += ' open'
  } else {
    acctMenu.classList.remove('open')
  }
})

accountLink.href = 'https://accounts.publicradio.org'
logoutLink.href = apmAccount.log_out_path()
//
//
//
// // Constructor
//
// var Nav = function ($el) {
//   // The containing DOM element
//   this.$el = $el
//
//   // Enabled state of the module
//   this.isEnabled = false
// }
//
// // -----------------------------
// // Setup functions
// // -----------------------------
//
// Nav.prototype.init = function() {
// this.selectElements()
//   .bindWindow()
//   .checkNavDisplay()
// }
//
// Nav.prototype.selectElements = function() {
//   this.$navDrops = $('#navDrops')
//   this.$navContainer = this.$el.find('#headerNav')
//   this.$menuContainers = this.$navContainer.children('li')
//   this.$buttons = this.$menuContainers.find('h3 a')
//   this.$menus = this.$menuContainers.children('.inner')
//
//   return this
// }
//
// Nav.prototype.enable = function() {
//   if (this.isEnabled === true) return
//
//   this.isEnabled = true
//   this.moveMenusToMobile()
//   this.bindEventHandlers()
// }
//
// Nav.prototype.disable = function() {
//   if (this.isEnabled === false) return
//
//   this.isEnabled = false
//   this.resetMenus()
//   this.moveMenusToDesktop()
//   this.unbindEventHandlers()
// }
//
// Nav.prototype.bindWindow = function() {
//   $(window).on('resize', this.onWindowResize.bind(this))
//
//   return this
// }
//
// Nav.prototype.bindEventHandlers = function() {
//   this.$buttons.on('click', this.onButtonClick.bind(this))
//
//   return this
// }
//
// Nav.prototype.unbindEventHandlers = function() {
//   this.$buttons.off('click')
//
//   return this
// }
//
// Nav.prototype.checkNavDisplay = function() {
//   if (this.$navDrops.is(':visible')) {
//     this.enable()
//   } else {
//     this.disable()
//   }
//
//   return this
// }
//
// // -----------------------------
// // Event Handlers
// // -----------------------------
//
// Nav.prototype.onWindowResize = function() {
//   this.checkNavDisplay()
// }
//
// Nav.prototype.onButtonClick = function(e) {
//   e.preventDefault()
//   var $target = $(e.target)
//   var id = $target.closest('li').attr('id')
//   var $menu = this.$menus.filter('[data-parent="#' + id + '"]')
//
//   if ($target.closest('li').hasClass('active') === false) {
//     this.closeMenus()
//     $target.closest('li').addClass('active')
//     this.openMenu($menu)
//   } else {
//     this.closeMenus()
//   }
// }
//
// // -----------------------------
// // Helpers
// // -----------------------------
//
// // The display state for mobile
// Nav.prototype.moveMenusToMobile = function() {
//   this.$menus.appendTo(this.$navDrops)
// }
//
// // The display state for desktop
// Nav.prototype.moveMenusToDesktop = function() {
//   this.$menus.each(function() {
//     var parentSelector = $(this).data('parent')
//     var $parent = $(parentSelector)
//
//     $(this).appendTo($parent)
//   })
// }
//
// Nav.prototype.openMenu = function($menu) {
//   $menu.slideDown('fast')
// }
//
// Nav.prototype.closeMenus = function() {
//   this.$buttons.closest('li').removeClass('active')
//   this.$menus.slideUp('fast')
// }
//
// Nav.prototype.resetMenus = function() {
//   this.$buttons.closest('li').removeClass('active')
//   this.$menus.attr('style', '')
// }
//
// return Nav
