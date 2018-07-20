/*jslint node: true */
"use strict";

var conf = require('trustnote-common/conf.js');
var eventBus = require('trustnote-common/event_bus.js');
var headlessWallet = require('trustnote-headless');
var desktopApp = require('trustnote-common/desktop_app.js');
var db = require('trustnote-common/db.js');

function sendMessageToDevice(from_address, text){
	var device = require('trustnote-common/device.js');
	device.sendMessageToDevice(from_address, 'text', text);
//	assocSessions[from_address].ts = Date.now();
}

function sendGreeting(from_address){
	// get lockup service information
	sendMessageToDevice(from_address, 'Welcome to my trustnote-bot')
}

eventBus.on('headless_wallet_ready', () => {
	// get lockup service information
	if (!conf.admin_email || !conf.from_email){
		console.log("please specify admin_email and from_email in your "+desktopApp.getAppDataDir()+'/conf.json');
		process.exit(1);
	}
});

eventBus.on('paired', (from_address) => {
	console.log('paired '+from_address);
	sendGreeting(from_address);
});

eventBus.on('text', (from_address, text) => {
	text = text.trim();
	if (!text.match(/^You said/))
		sendMessageToDevice(from_address, "You said: " + text);
});

eventBus.on('new_my_transactions', (arrUnits) => {
	// handle new unconfirmed payments
	// and notify user
	
	// sendMessageToDevice(device_address_determined_by_analyzing_the_payment, "Received your payment");
});

eventBus.on('my_transactions_became_stable', (arrUnits) => {
	// handle payments becoming confirmed
	// and notify user
	
    // sendMessageToDevice(device_address_determined_by_analyzing_the_payment, "Your payment is confirmed");
});

module.exports = headlessWallet;
