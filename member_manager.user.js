// ==UserScript==
// @name          Flickr Groups Pending Members Manager
// @description	  Accept or decline in batch
// @namespace     http://www.flickr.com/photos/boncey/
// @version       v3.6.1
// @include       http://*flickr.com/groups_pending.gne*
// ==/UserScript==

var group = "95559002@N00"; // LBL
//var group = "2141598@N24"; // Test
var declinees = [];
var londoners = ["61509798@N04", "91782148@N08", "69705067@N08", "23856424@N03", "37560935@N06", "62861007@N00", "58530379@N02", "80216325@N06", "72165857@N05", "82915032@N03", "78101802@N03", "11152269@N08", "31795264@N05", "59113499@N02", "77918590@N00", "89666863@N06", "8067061@N06", "12570393@N08", "81353985@N04", "69853134@N03", "87547098@N03", "53801474@N02", "65507838@N03", "68984876@N00", "61529781@N07", "85973270@N06", "85953524@N03", "84720251@N08", "84375476@N03", "38211490@N08", "80021818@N07", "79889609@N02", "76560057@N02", "65609732@N02", "23848669@N02", "78387880@N08", "40850111@N04", "66425467@N00", "67818055@N07", "62000688@N04", "35969432@N03", "75807052@N07", "73398334@N04", "43633094@N00", "73679190@N00", "45222192@N06", "71295543@N07", "75726653@N06", "73643672@N00", "26990181@N07", "14863471@N07", "67629861@N07", "63012980@N07", "78861082@N00", "25653491@N05", "76297324@N07", "76564305@N08", "78036087@N05", "74863493@N07", "27791880@N08", "26993091@N08", "32377139@N04", "71818409@N02", "56253655@N03", "69403295@N00", "64796081@N03", "63578298@N02", "55964059@N06", "59160704@N02", "70833291@N06", "54052583@N04", "50250276@N05", "59009338@N02", "32302030@N05", "85528113@N00", "59206402@N00", "65340926@N03", "43682425@N03", "9290505@N05", "11414785@N07", "8251265@N07", "48663574@N06", "8282993@N02", "57148700@N04", "12361651@N08", "35120110@N03", "62251503@N08", "53622516@N02", "59899652@N03", "68499912@N07", "66856125@N07", "35537779@N02", "67916895@N05", "44436749@N07", "70862862@N04", "24464795@N00", "61428381@N05", "22475987@N04", "65651263@N03", "41056143@N06", "33584642@N00", "83286413@N00", "32167849@N08", "25548816@N07", "49503206570@N01", "32584812@N07", "19836916@N00", "67935964@N05", "68211008@N04", "31324634@N06", "10363726@N08", "67754740@N05", "53329307@N05", "54143577@N06", "54426622@N08", "59462388@N00", "62644153@N08", "60822413@N02", "64243973@N03", "11536493@N05", "25074877@N07", "63439978@N07", "43030758@N03", "30654779@N00", "51814896@N05", "13814651@N00", "55842399@N05", "62654202@N07", "62830626@N06", "36376332@N07", "61558926@N07", "12430685@N03", "21163126@N05", "40511476@N05", "60727375@N02", "43477097@N06", "74067317@N00", "41014717@N07"];

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
