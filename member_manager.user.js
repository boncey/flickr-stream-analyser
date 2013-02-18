// ==UserScript==
// @name          Flickr Groups Pending Members Manager
// @description	  Accept or decline in batch
// @namespace     http://www.flickr.com/photos/boncey/
// @version       v3.6.1
// @include       http://*flickr.com/groups_pending.gne*
// ==/UserScript==

// http://www.flickr.com/groups_pending.gne?id=95559002@N00
var group = "95559002@N00";
var declinees = ["85174986@N00", "26192457@N05", "37415009@N05", "14423128@N00", "25670636@N02", "67108056@N05", "91823952@N00", "27719530@N05", "64220686@N06", "58199928@N00", "9540992@N02", "46450326@N08", "43727309@N02", "29926464@N06", "76781032@N04", "32748010@N08", "59939845@N06", "27793962@N00", "76291333@N03", "76136205@N06", "57506140@N02", "75942172@N04", "73534885@N03", "11222189@N03", "29877235@N06", "47302744@N06", "74283881@N06", "70837413@N05", "59055249@N06", "74831272@N08", "46238498@N07", "73132687@N06", "73046515@N06", "28517940@N05", "74341590@N04", "72679276@N08", "74155889@N02", "50201367@N07", "73110314@N08", "69463588@N05", "73078826@N08", "56209748@N04", "71709446@N04", "8815881@N06", "69285901@N07", "71321829@N03", "67986645@N04", "50308672@N05", "71177226@N04", "23667637@N07", "20113815@N05", "70360490@N08", "40724127@N03", "69751623@N08", "69918063@N05", "55391563@N08", "22603839@N06", "66438563@N04", "69318216@N05", "69270668@N03", "68767063@N04", "64588365@N08", "51765892@N08", "68607328@N02", "66548862@N04", "10719810@N02", "30314293@N04", "53605349@N07", "68848900@N02", "46099828@N02", "68735384@N05", "65584797@N03", "58977052@N06", "68598118@N04", "59842779@N03", "40581073@N03", "8978548@N02", "65986586@N08", "67758176@N03", "67703051@N03", "67394935@N06", "24016190@N04", "65776000@N04", "54006243@N07", "67225096@N07", "46740906@N08", "58984653@N04", "66967648@N02", "66451571@N06", "37018238@N04", "63075684@N07", "53235405@N08", "27079038@N08", "38072670@N07", "61125279@N08", "53467811@N05", "21863772@N03", "54177400@N08", "36236233@N06", "66014371@N04", "60251129@N03", "54684751@N04", "63717351@N04", "65877151@N03", "65555481@N07", "65616373@N06", "61051399@N04", "14127535@N00", "60615890@N06", "59455904@N04", "38100558@N06", "65265262@N02", "53578627@N02", "22623374@N05", "45552295@N00", "64377291@N04", "65056315@N06", "64974155@N02", "49043314@N06", "47014023@N08", "55165401@N04", "46314065@N06", "57046317@N04", "39447532@N05", "57276714@N06", "64159848@N02", "64611826@N05", "47846537@N02", "64522333@N02", "63832776@N02", "45217442@N05", "64350780@N03", "57788243@N05", "62796667@N05", "62615820@N02", "64200834@N07", "64169571@N03", "61681137@N02", "64007768@N02", "45196156@N07", "63502423@N05", "64012990@N08", "60888117@N05", "58937302@N05", "63990604@N08", "33983219@N02", "63722186@N06", "63718561@N04", "32595238@N04", "12157130@N04", "63246906@N07", "49693612@N08", "60401444@N07", "72828686@N00", "49397708@N03", "54592613@N08", "25023061@N04", "47317410@N05", "53378642@N08", "61617475@N02", "63349942@N08", "62954923@N03", "46311343@N04", "63045469@N06", "60363181@N08", "59708891@N04", "50325865@N02", "63128407@N04", "48501016@N05", "59030963@N08", "44645593@N04", "25890726@N04", "49219274@N02", "36382289@N06", "18827414@N05", "52516033@N03", "57409430@N02", "62116567@N02", "30576637@N00", "62820698@N07", "52372685@N02", "62841238@N06", "42036466@N06", "42843536@N05", "61526796@N06", "62541351@N05", "60562739@N02", "54178548@N06", "11032872@N00", "21893080@N03", "61605338@N05", "50945598@N07", "53253302@N02", "41478700@N03", "61122787@N06", "24105837@N06", "52033104@N03", "9184306@N06", "27133640@N00", "58629588@N03", "59337090@N02", "39585315@N02", "58268726@N03"]

window.addEventListener("load", function() { add_links() }, false);

function add_links() {

    var link_section = document.getElementById("GoodStuff");
    var link_table = document.evaluate("//*[@id='GoodStuff']/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

    console.log("Declining members");
    decline_members();
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
    //link_section.removeChild(form);

    console.log("Declined user " + nsid);
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
