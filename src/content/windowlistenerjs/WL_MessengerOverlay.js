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
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/misc.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/StringBundle.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/SyncSummaryData.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Namespace.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GElement.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/gdata.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/AbManager.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GAbManager.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/AbListener.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Group.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Property.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/TBContact.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GContact.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/MailList.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GMailList.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Pref.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/FileIO.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Preferences.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Logger.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Overlay.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/AddressBook.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GAddressBook.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/ConverterElement.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/ContactConverter.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/onDrop.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Sync.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/HttpRequest.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/GHttpRequest.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/LoginManager.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/Import.js", window, "UTF-8");
Services.scriptloader.loadSubScript("chrome://gcontactsync/content/OAuth2.js", window, "UTF-8");

Services.scriptloader.loadSubScript("chrome://gcontactsync/content/MessengerOverlay.js", window, "UTF-8");


function onLoad(activatedWhileWindowOpen) {
  WL.injectCSS("resource://gcontactsync/overlay.css");

  WL.injectElements(`
    <toolbarbutton id="button-sync"
                 label="&sync.label;"
                 tooltiptext="&sync.tooltip;"
                 oncommand="gContactSync.Sync.begin(true, null);"
                 class="gContactSync-Button toolbarbutton-1 chromeclass-toolbar-additional"/>

    <statusbarpanel id="gContactSyncStatusText"
                  onclick="gContactSync.showLog();"
                  label="&initialStatus.label;"
                  tooltiptext="&status.tooltip;"/>
    <menu id="gContactSyncMenu"
        label="&gContactSyncMenu.label;"
        accesskey="&gContactSyncMenu.accesskey;">
    <menupopup id="gContactSyncMenuPopup">
     <menuitem id="syncMenuItem"
               label="&syncMenuItem.label;"
               accesskey="&syncMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.Sync.begin(true, null);"/>
     <menuitem id="newAcctMenuItem"
               label="&newAcctMenuItem.label;"
               accesskey="&newAcctMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.Overlay.openAccountWizard(false);"/>
     <menuitem id="acctMenuItem"
               label="&acctMenuItem.label;"
               accesskey="&acctMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openAccounts();"/>
     <menuitem id="prefMenuItem"
               label="&prefMenuItem.label;"
               accesskey="&prefMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openPreferences();"/>
     <menuitem id="forumMenuItem"
               label="&forumMenuItem.label;"
               accesskey="&forumMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openURL('extensions.gContactSync.forumURL');"/>
     <menuitem id="faqMenuItem"
               label="&faqMenuItem.label;"
               accesskey="&faqMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openURL('extensions.gContactSync.faqURL');"/>
     <menuitem id="errorMenuItem"
               label="&errorMenuItem.label;"
               accesskey="&errorMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openURL('extensions.gContactSync.errorURL');"/>
     <menuitem id="logMenuItem"
               label="&logMenuItem.label;"
               accesskey="&logMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.showLog();"/>
     <menuitem id="gcMenuItem"
               label="&gcMenuItem.label;"
               accesskey="&gcMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openURL('extensions.gContactSync.googleContactsURL');"/>
       <menuseparator/>
    </menupopup>
    </menu>
    <menu id="gContactSyncAppMenu"
        label="&gContactSyncMenu.label;"
        accesskey="&gContactSyncMenu.accesskey;">
    <menupopup id="gContactSyncMenuPopup">
     <menuitem id="syncMenuItem"
               label="&syncMenuItem.label;"
               accesskey="&syncMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.Sync.begin(true, null);"/>
     <menuitem id="newAcctMenuItem"
               label="&newAcctMenuItem.label;"
               accesskey="&newAcctMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.Overlay.openAccountWizard();"/>
     <menuitem id="acctMenuItem"
               label="&acctMenuItem.label;"
               accesskey="&acctMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openAccounts();"/>
     <menuitem id="prefMenuItem"
               label="&prefMenuItem.label;"
               accesskey="&prefMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openPreferences();"/>
     <menuitem id="forumMenuItem"
               label="&forumMenuItem.label;"
               accesskey="&forumMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openURL('extensions.gContactSync.forumURL');"/>
     <menuitem id="faqMenuItem"
               label="&faqMenuItem.label;"
               accesskey="&faqMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openURL('extensions.gContactSync.faqURL');"/>
     <menuitem id="errorMenuItem"
               label="&errorMenuItem.label;"
               accesskey="&errorMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openURL('extensions.gContactSync.errorURL');"/>
     <menuitem id="logMenuItem"
               label="&logMenuItem.label;"
               accesskey="&logMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.showLog();"/>
     <menuitem id="gcMenuItem"
               label="&gcMenuItem.label;"
               accesskey="&gcMenuItem.accesskey;"
               class="menuitem-iconic icon-mail16 menu-iconic"
               oncommand="gContactSync.openURL('extensions.gContactSync.googleContactsURL');"/>
       <menuseparator/>
       <menu id="gContactSyncImport"
             label="&Import.label;"
             accesskey="&Import.accesskey;">
         <menupopup>
           <menuitem label="&Facebook.label;"
                     oncommand="gContactSync.Import.step1('facebook');"/>
           <!-- Not supported quite yet -->
           <!--<menuitem label="&LinkedIn.label;"
                     oncommand="gContactSync.Import.step1('linkedin');"/>-->
           <menuitem label="&Twitter.label;"
                     oncommand="gContactSync.Import.step1('twitter');"/>
         </menupopup>
       </menu>
      <menuitem id="finishImport"
                label="&FinishImport.label;"
                oncommand="gContactSync.Import.step3();"/>
    </menupopup>
    </menu>`,
  ["chrome://gContactSync/locale/overlay.dtd"]);

  WL.injectElements(`
    <hbox id="status-bar" class="statusbar chromeclass-status">
      <statusbarpanel id="gContactSyncStatusText" insertafter="totalMessageCount" hidden="true"/>
    </hbox>
    <menubar id="mail-menubar">
      <menu id="gContactSyncMenu" insertbefore="tasksMenu"/>
    </menubar>
    <vbox id="appmenuSecondaryPane">
      <menu id="gContactSyncAppMenu" insertbefore="appmenu_tasksMenu"/>
    </vbox>
    <toolbarpalette id="MailToolbarPalette">
      <toolbarbutton id="button-sync"/>
    </toolbarpalette>`,
  ["chrome://gContactSync/locale/overlay.dtd"]);
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