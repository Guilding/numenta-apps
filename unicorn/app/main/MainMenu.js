// Copyright © 2016, Numenta, Inc. Unless you have purchased from
// Numenta, Inc. a separate commercial license for this software code, the
// following terms and conditions apply:
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU Affero Public License version 3 as published by the
// Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.
//
// You should have received a copy of the GNU Affero Public License along with
// this program. If not, see http://www.gnu.org/licenses.
//
// http://numenta.org/licenses/

import defaultMenu from 'electron-default-menu';
let electron = require('electron');

/**
 * Main top system menu (File/Open.., etc) for application
 */

let menu = defaultMenu();

let aboutMenuItem = menu[0].submenu[0];
if (aboutMenuItem.label === 'About HTM Studio') {
  // Don't show the default Electron dialog.
  delete aboutMenuItem.role;

  // Do this instead.
  aboutMenuItem.click = () => {
    const BrowserWindow = electron.BrowserWindow;
    let win = new BrowserWindow({width: 283, height: 230, title: ''});
    win.loadURL(`file://${__dirname}/../browser/about.html`);
  };
} else {
  throw new Error(
    `Unexpected menu item in first position: ${aboutMenuItem.label}`
  );
}

let helpMenu = menu.find((item) => item.label === 'Help');
if (helpMenu) {
  // Learn More
  helpMenu.submenu.splice(0, 1); // Remove old behavior
  helpMenu.submenu.push({
    label: 'Lean More',
    click() {
      let url = 'http://numenta.com/htm-studio';
      electron.shell.openExternal(url);
    }
  });

  // FAQ
  helpMenu.submenu.push({
    label: 'Frequently Asked Questions',
    click() {
      let url = 'http://numenta.com/htm-studio#faq';
      electron.shell.openExternal(url);
    }
  });

  // Provide Feedback
  helpMenu.submenu.push({
    label: 'Provide Feedback',
    click() {
      let url = 'http://numenta.com/htm-studio#feedback';
      electron.shell.openExternal(url);
    }
  });

} else {
  throw new Error('Could not find Help menu.');
}

export default menu;
