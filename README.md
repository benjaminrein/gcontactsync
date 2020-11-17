gcontactsync
============

Synchronizes contacts &amp; groups between Thunderbird or SeaMonkey and Google Contacts. Imports Facebook friends and more.

#### State of Thunderbird 78 migration using Window Listener API
* currently only working with TB 68, because migration to TB 78 compatibility is the last step of the migration
* JS initialisation completely converted to Window Listener API where applicable
	* background sync is working again
	* still more testing is needed to iron out bugs
* XUL overlays are in very bad shape
	* for now I just converted them to use the Window Listener wrapper
	* at least 3 elements are displayed below the statusbar, which should be in the addon toolbar instead. Cause unknown.
	* error messages in console
		* WindowListener API: Attempt to register an injector script for non-existent window: chrome://global/content/customizeToolbar.xul; maybe using https://github.com/thundernest/addon-developer-support/tree/master/scripts/hackToolbarbutton helps
	* double menu entry Extras > Add-On-Settings 
	* gContactSync menu is missing
* Accounts and AccountSetupWizard need testing and most likely some repairs
* Adressbook with additional fields needs testing and most likely some repairs
* check if all ressources which are not initialised with WL API are cleaned up after use	
* XUL migration: https://developer.thunderbird.net/add-ons/updating/tb78/changes
* XUL to XHTML rename: https://github.com/thundernest/addon-developer-support/wiki/WindowListener-API:-Finalizing
	
##### This is much more work than anticipated. Maybe we have a better chance of getting this to work with a joint effort. Pull requests are welcome. Especially the XUL stuff is very nasty without XUL experience.