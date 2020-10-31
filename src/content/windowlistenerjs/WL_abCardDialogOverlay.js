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

// Import any needed modules.
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

// Load an additional JavaScript file.
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/StringBundle.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/misc.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/FileIO.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Pref.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Preferences.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GElement.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/AbManager.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GAbManager.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/AddressBook.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GAddressBook.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/TBContact.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/MailList.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GMailList.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Namespace.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/gdata.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Logger.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/CardDialogOverlay.js", window, "UTF-8");


function onLoad(activatedWhileWindowOpen) {
  WL.injectElements(`
  <tabs id="abTabs">
    <tab label="&gContactSyncTab.label;" hidden="true" id="gContactSyncTab"/>
  </tabs>

  <tabpanels id="abTabPanels" flex="1">

    <vbox flex="1">
      <hbox>
        <vbox>
          <vbox id="gcontactSyncFields" class="alignBoxWithFieldset" align="left">
            <groupbox flex="1" id="additionalEmailBox">
            <label value="&email.box;"/>
            <hbox>
              <spacer flex="1"/>
              <hbox class="CardEditWidth">
                <textbox id="ThirdEmail" flex="1" class="uri-element"/>
              </hbox>
            </hbox>
            <hbox>
              <spacer flex="1"/>
              <hbox class="CardEditWidth">
                <textbox id="FourthEmail" flex="1" class="uri-element"/>
              </hbox>
            </hbox>
          </groupbox>
          <!-- This groupbox is hidden because it is only used before Mailnews
                 Bug 63941 was applied and reorganized the card dialog -->
          <groupbox id="numbersGroupBox" flex="1" hidden="true">
            <label value="&numbers.box;"/>
            <hbox>
              <spacer flex="1"/>
              <label control="HomeFaxNumber" value="&sixth.label;" class="CardEditLabel"/>
              <hbox class="CardEditWidth">
                <textbox id="HomeFaxNumber" flex="1"/>
              </hbox>
            </hbox>
            <hbox>
              <spacer flex="1"/>
              <label control="OtherNumber" value="&seventh.label;" class="CardEditLabel"/>
              <hbox class="CardEditWidth">
                <textbox id="OtherNumber" flex="1"/>
              </hbox>
            </hbox>
          </groupbox>
        </vbox>
      </vbox>
      <vbox id="relationFields" hidden="true">
          <vbox id="gcontactSyncFields2" class="alignBoxWithFieldset" align="left">
            <groupbox flex="1" id="relationsGroupBox">
              <label value="&relations.box;"/>
              <!-- Contents are added by CardDialogOverlay.js -->
            </groupbox>
          </vbox>
      </vbox>
      </hbox>
    </vbox>
  </tabpanels>`,
  ["chrome://gContactSync/locale/overlay.dtd","chrome://messenger/locale/addressbook/abCardOverlay.dtd"]);

  window.gContactSync.CardDialogOverlay.init();
  
  //TODO Cleanup if not needed
  //init eventually needed here as well
  //window.gContactSync.ContactConverter.init();
}

function onUnload(deactivatedWhileWindowOpen) {
  // Cleaning up the window UI is only needed when the
  // add-on is being deactivated/removed while the window
  // is still open. It can be skipped otherwise.
  if (!deactivatedWhileWindowOpen) {
    return
  }
  //TODO
}