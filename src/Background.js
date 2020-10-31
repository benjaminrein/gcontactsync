/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is gContactSync.
 *
 * The Initial Developer of the Original Code is
 * Josh Geenen <gcontactsync@pirules.org>.
 * Portions created by the Initial Developer are Copyright (C) 2008-2017
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 * Benjamin Rein
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

(async () => {

  messenger.WindowListener.registerDefaultPrefs("defaults/preferences/gContactSync.js");

  messenger.WindowListener.registerChromeUrl([
    ["content",  "gcontactsync",           "content/"],
    ["resource", "gcontactsync",           "skin/"],
    ["locale",   "gcontactsync", "en-US",  "locale/en-US/"],
    ["locale",   "gcontactsync", "cs",     "locale/cs/"],
    ["locale",   "gcontactsync", "de",     "locale/de/"],
    ["locale",   "gcontactsync", "es-ES",  "locale/es-ES/"],
    ["locale",   "gcontactsync", "it",     "locale/it/"],
    ["locale",   "gcontactsync", "nl",     "locale/nl/"],
    ["locale",   "gcontactsync", "pt-BR",  "locale/pt-BR/"],
    ["locale",   "gcontactsync", "pt-PT",  "locale/pt-PT/"],
    ["locale",   "gcontactsync", "sl-SI",  "locale/sl-SI/"],
    ["locale",   "gcontactsync", "sv-SE",  "locale/sv-SE/"],
    ["locale",   "gcontactsync", "zh-CN",  "locale/zh-CN/"]
  ]);

  messenger.WindowListener.registerOptionsPage("chrome://gcontactsync/content/options.xul");

  messenger.WindowListener.registerWindow(
    "chrome://messenger/content/addressbook/addressbook.xul",
    "chrome://gcontactsync/content/windowlistenerjs/WL_AddressBookOverlay.js");
  messenger.WindowListener.registerWindow(
    "chrome://messenger/content/messenger.xul",
    "chrome://gcontactsync/content/windowlistenerjs/WL_MessengerOverlay.js");
  messenger.WindowListener.registerWindow(
    "chrome://messenger/content/addressbook/abEditCardDialog.xul",
    "chrome://gcontactsync/content/windowlistenerjs/WL_abCardDialogOverlay.js");
  messenger.WindowListener.registerWindow(
    "chrome://messenger/content/addressbook/abNewCardDialog.xul",
    "chrome://gcontactsync/content/windowlistenerjs/WL_abCardDialogOverlay.js");

  /* TODO: WindowListener API: Attempt to register an injector script for non-existent window: chrome://global/content/customizeToolbar.xul
  messenger.WindowListener.registerWindow(
    "chrome://gcontactsync/content/AccountSetupWizard.xul",
    "chrome://gcontactsync/content/windowlistenerjs/WL_AccountSetupWizard.js");
  messenger.WindowListener.registerWindow(
    "chrome://gcontactsync/content/NewRefreshToken.xul",
    "chrome://gcontactsync/content/windowlistenerjs/WL_NewRefreshToken.js");
  messenger.WindowListener.registerWindow(
    "chrome://global/content/customizeToolbar.xul",
    "chrome://gcontactsync/content/windowlistenerjs/WL_customizeToolbar.js");
  */

  /* TODO: WindowListener.registerShutdownScript() needed for e.g. observers, custom autocomplete components and custom XPCOM components
       - Multiple observers found by doing a full text search for observer in the source
       - Regarding autocomplete components a search for "Components.interfaces.nsIComponentRegistrar" turned up nothing.
  */

  messenger.WindowListener.startListening();
})()