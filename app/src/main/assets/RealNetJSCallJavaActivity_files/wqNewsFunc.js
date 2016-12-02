function disGoodBad() {
    document.getElementById("good").onclick = null, document.getElementById("good").ontouchstart = null, document.getElementById("good").ontouchend = null, document.getElementById("bad").onclick = null, document.getElementById("bad").ontouchstart = null, document.getElementById("bad").ontouchend = null
}
function changeImg() {
    var e = .95 * document.getElementById("item_content").offsetWidth, t = document.getElementsByTagName("img");
    for (length = t.length, i = 0; i < length; i++)img = t[i], oldWidth = img.width, oldWidth > e && (oldHeight = img.height, img.style.width = e + "px", img.style.height = oldHeight * e / oldWidth + "px"), img.style.visibility = "visible", "video" != img.getAttribute("tag")
}
function changeImgNew() {
    var e = .95 * document.getElementById("news_cont").offsetWidth, t = document.getElementsByTagName("img");
    for (length = t.length, i = 0; i < length; i++)img = t[i], oldWidth = img.width, oldWidth > e && (oldHeight = img.height, img.style.width = e + "px", img.style.height = oldHeight * e / oldWidth + "px"), img.style.visibility = "visible", "video" != img.getAttribute("tag")
}
function showAndroidToast(e) {
    android.showImage(e)
}
function checkAndroidUser(e, t) {
    android.checkUserStatus(e, t)
}
function ajaxCommentReal(userid, token, content, url, defaultAvatar) {
    var param = {userid: userid, token: token, content: content};
    ajaxrequest(url, "POST", !0, param, function (resp) {
        var tips = "";
        if ("" != resp) {
            var obj = eval("(" + resp + ")"), tab = document.getElementById("comment_tab"), newComment = document.createElement("tr");
            (void 0 == obj.avatar || "" == obj.avatar) && (obj.avatar = defaultAvatar), newComment.innerHTML = '<tr><td class="avatar"><img src="' + obj.avatar + '"/></td><td><table><tr><td class="nickname">' + obj.nickname + '</td></tr><tr><td class="comment_content">' + obj.content + '</td></tr></table></td><td class="comment_time">刚刚</td></tr>', tab.insertBefore(newComment, tab.childNodes[0]);
            var cmObj = document.getElementById("cm_text");
            newText = parseInt(cmObj.innerText) + 1, isNaN(newText) && (newText = 1), cmObj.innerText = newText, tips = "评论成功"
        } else tips = "评论失败，请稍后重试";
        android.showTips(tips)
    }, document)
}
function ajaxInterActive(e, t, n, o) {
    var i = {userid: e, token: t, action: n};
    ajaxrequest(o, "POST", !0, i, function (e) {
        var t = "";
        "ok" == e ? ("defav" == n ? textObj = document.getElementById("fav_text") : textObj = document.getElementById(n + "_text"), "good" == n || "bad" == n ? (newText = parseInt(textObj.innerText) + 1, isNaN(newText) && (newText = 1), textObj.innerText = newText, disGoodBad(), document.getElementById(n).className = "inter_ed") : "fav" == n ? (textObj.innerText = "已收藏", t = "收藏成功") : "defav" == n && (textObj.innerText = "收藏", t = "取消收藏成功")) : "exists" == e ? ("good" == n && (t = "已顶过！"), "bad" == n && (t = "已踩过！")) : t = "操作失败，请稍后再试", "" != t && android.showTips(t)
    }, document)
}
function getajaxHttp() {
    var e;
    try {
        e = new XMLHttpRequest
    } catch (t) {
        try {
            e = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (t) {
            try {
                e = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {
                return alert("您的浏览器不支持AJAX！"), !1
            }
        }
    }
    return e
}
function json2ReqPara(e) {
    var t = "";
    for (var n in e)t = t + "&" + n + "=" + e[n];
    return t = t.replace(/^\&/, "")
}
function ajaxrequest(e, t, n, o, i, m) {
    var a = getajaxHttp();
    a.onreadystatechange = function () {
        4 == a.readyState && i(a.responseText, m)
    }, a.open(t, e, n), ("post" == t || "POST" == t) && a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), o = json2ReqPara(o), a.send(o)
}
function changeDownload() {
    var e = document.getElementById("download");
    return "undefined" == typeof e || null == e ? !1 : (e.innerText = "已离线", e.ontouchstart = !1, void(e.ontouchend = !1))
}
function changeDownloadNew() {
    var e = document.getElementById("download");
    return "undefined" == typeof e || null == e ? !1 : (e.className = "", void(e.className = "download al-down"))
}
function changeUndownload() {
    var e = document.getElementById("download");
    return "undefined" == typeof e || null == e ? !1 : (e.className = "", void(e.className = "download un-down"))
}
function setHotComment(comstr) {
    var comments = eval("(" + comstr + ")"), length = comments.length;
    if (length) {
        var tabtitle = document.getElementById("hottitle");
        tabtitle.innerText = "热门评论";
        var divComment = document.getElementById("comment_div");
        divComment.innerHTML = "";
        var newHtml = '<div class="comment_head" id="hottitle">热门评论</div>';
        newHtml += '<div class="commnet_body"><table id="comment_tab" class="comment_tab">', newHtml += "<tbody>";
        for (var i = 0; length > i; i++)commentObj = comments[i], flag = parseInt(commentObj.flag), newHtml += '<tr  id="cmt_' + i + '" name="comment" data-arg="[\'' + commentObj.id + "','" + commentObj.user_id + "','" + commentObj.content + "','" + commentObj.nickname + "']\" >", newHtml += '<td class="avatar"><img src="' + commentObj.user_avatar + '"/></td>', newHtml += "<td><table>", newHtml += "<tr>", newHtml += '<td><div class="nickname">' + commentObj.nickname + "</div>", 1 == flag && (newHtml += '<div class="selectedcomment">精彩评论</div>'), newHtml += "</td>", newHtml += "</tr>", newHtml += "<tr>", newHtml += '<td class="comment_content">' + doEmojiReplace(commentObj.content) + "</td>", newHtml += "</tr>", newHtml += "</table></td>", newHtml += '<td class="comment_time">' + commentObj.time + "</td>", newHtml += "</tr>";
        newHtml += "</tbody>", newHtml += "</table></div>", divComment.innerHTML = newHtml
    }
}
function getEmojiImg(e) {
    return '<img class="emoji" src="' + emojiBaseUrl + emos[e] + '" />'
}
function doEmojiReplace(content) {
    for (var sIndex = 0, i = 0; content.indexOf("[", sIndex) >= 0;) {
        var lIndex = content.indexOf("[", sIndex), rIndex = content.indexOf("]", lIndex);
        if (!(lIndex >= 0 && rIndex >= 0))break;
        var tag = content.substring(lIndex + 1, rIndex);
        if (sIndex = rIndex + 1, void 0 != emos[tag] && (emojiImg = getEmojiImg(tag), content = content.replace(eval("/\\[" + tag + "\\]/ig"), emojiImg), i++ > 100))break
    }
    return content
}
function getElementsByClassName(e, t, n) {
    node = e && document.getElementById(e) || document, t = t || "*", n = n.split(" ");
    for (var o = n.length, i = 0, m = o; m > i; i++)n[i] = new RegExp("(^|\\s)" + n[i].replace(/\-/g, "\\-") + "(\\s|$)");
    for (var a = node.getElementsByTagName(t), d = [], i = 0, m = a.length, r = 0; m > i; i++) {
        for (var l = a[i]; n[r++].test(l.className);)if (r === o) {
            d[d.length] = l;
            break
        }
        r = 0
    }
    return d
}
var emojiBaseUrl = "", emojik = ["尴尬", "可爱", "生气", "害羞", "忧郁", "坏笑", "哭", "汗", "难过", "惊讶", "高兴", "招呼", "心动", "装酷", "飞吻", "惊恐", "大笑", "无语", "存钱", "恶魔", "书呆子", "喷嚏", "海盗", "嘲笑", "生病", "微笑", "调皮", "踩", "顶", "撇嘴", "愤怒", "眨眼", "开心", "大笑2", "呆萌2", "愤怒2", "惊吓2", "流泪2", "生气2", "微笑2", "猥琐2", "晕2", "装酷2", "无语2"], emojiv = ["emoji1.png", "emoji2.png", "emoji3.png", "emoji4.png", "emoji5.png", "emoji6.png", "emoji7.png", "emoji8.png", "emoji9.png", "emoji10.png", "emoji11.png", "emoji12.png", "emoji13.png", "emoji14.png", "emoji15.png", "emoji16.png", "emoji17.png", "emoji18.png", "emoji19.png", "emoji20.png", "emoji21.png", "emoji22.png", "emoji23.png", "emoji24.png", "emoji25.png", "emoji26.png", "emoji27.png", "emoji28.png", "emoji29.png", "emoji30.png", "emoji31.png", "emoji32.png", "emoji33.png", "Expression1.png", "Expression2.png", "Expression3.png", "Expression4.png", "Expression5.png", "Expression6.png", "Expression7.png", "Expression8.png", "Expression9.png", "Expression10.png", "Expression11.png"];
emos = [];
for (var i = 0; i < emojik.length; i++)emos[emojik[i]] = emojiv[i];