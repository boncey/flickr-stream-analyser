// ==UserScript==
// @name          Flickr Groups Pending Members Manager
// @description	  Accept or decline in batch
// @namespace     http://www.flickr.com/photos/boncey/
// @version       v3.6.1
// @include       http://*flickr.com/groups_pending.gne*
// ==/UserScript==

var group = "95559002@N00"; // LBL
//var group = "2141598@N24"; // Test
var declinees = ["92185420@N03", "87186164@N05", "63464629@N02", "86993007@N04", "85682378@N05", "81672108@N07", "81252436@N07", "81041080@N05", "78327178@N06", "9923011@N08", "77636556@N08", "77377861@N02", "68599731@N04", "9356270@N07", "67575599@N05", "72630530@N04", "65013655@N07", "63631165@N08", "45846574@N02", "67203017@N05"];
var londoners = [];

window.addEventListener("load", function() { process_nsids() }, false);

function process_nsids() {

    decline_members();
    accept_members();
}

function decline_member(nsid) {

    var form = document.createElement("form");
    form.method = "POST";
    form.action = "groups_pending.gne";

    var group_id = document.createElement("input");
    group_id.type = "hidden";
    group_id.name = "id";
    group_id.value = group;
    form.appendChild(group_id);

    var user_id = document.createElement("input");
    user_id.type = "hidden";
    user_id.name = "user";
    user_id.value = nsid;
    form.appendChild(user_id);

    var done = document.createElement("input");
    done.type = "hidden";
    done.name = "done";
    done.value = "1";
    form.appendChild(done);

    var action = document.createElement("input");
    action.type = "hidden";
    action.name = "action";
    action.value = "decline";
    form.appendChild(action);

    var link_section = document.getElementById("GoodStuff");
    link_section.appendChild(form);
    form.submit();

    console.log("Declined user " + nsid);
}

function accept_member(nsid) {

    var form = document.createElement("form");
    form.method = "POST";
    form.action = "groups_pending.gne";

    var group_id = document.createElement("input");
    group_id.type = "hidden";
    group_id.name = "id";
    group_id.value = group;
    form.appendChild(group_id);

    var user_id = document.createElement("input");
    user_id.type = "hidden";
    user_id.name = "user";
    user_id.value = nsid;
    form.appendChild(user_id);

    var done = document.createElement("input");
    done.type = "hidden";
    done.name = "done";
    done.value = "1";
    form.appendChild(done);

    var action = document.createElement("input");
    action.type = "hidden";
    action.name = "action";
    action.value = "accept";
    form.appendChild(action);

    var link_section = document.getElementById("GoodStuff");
    link_section.appendChild(form);
    form.submit();

    console.log("Accepted user " + nsid);
}

function pending(nsid) {

    var buddy_icon = document.getElementById("hover_img" + nsid);
    return buddy_icon != null;
}

function decline_members() {
    console.log("Declining inactive members");

    for (var i = 0; i < declinees.length; i++) {
        var nsid = declinees[i];
        if (pending(nsid)) {
            decline_member(nsid);
            break;
        } else {
            console.log("Skipping user " + nsid);
        }
    }
}

function accept_members() {
    console.log("Accepting Londoners");

    for (var i = 0; i < londoners.length; i++) {
        var nsid = londoners[i];
        if (pending(nsid)) {
            accept_member(nsid);
            break;
        } else {
            console.log("Skipping user " + nsid);
        }
    }
}
